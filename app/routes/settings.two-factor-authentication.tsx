import { json } from '@remix-run/node';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  enrollSMS,
  enrollTotp,
  getUserAuthFactors,
} from '~/models/user.server';
import { requireUser, requireUserId } from '~/utils/session.server';
import { workos } from '~/utils/workos.server';
import {
  SelectFactor,
  Verify,
  Activated,
} from '~/components/settings/mfa/setup';
import { Alert } from '~/components/shared';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const userAuthFactors = await getUserAuthFactors(userId);
  return userAuthFactors;
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request);
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case 'selectFactor':
      if (!values.authFactorType) {
        return json(
          { errors: { message: 'This field is required' } },
          { status: 400 }
        );
      }
      if (values.authFactorType === 'totp') {
        try {
          const totpFactor = await workos.mfa.enrollFactor({
            type: 'totp',
            issuer: user.email,
            user: user.email,
          });

          const totpChallenge = await workos.mfa.challengeFactor({
            authenticationFactorId: totpFactor.id,
          });

          return { totpFactor, totpChallenge, step: 1 };
        } catch (error) {
          return json({ errors: { message: error } }, { status: 400 });
        }
      }

      if (values.authFactorType === 'sms') {
        setTimeout(() => {}, 3000);
        return { smsFactor: true, step: 1 };
      }

    case 'phoneNumber':
      if (!values.phoneNumber) {
        return json(
          { errors: { message: 'You need to provide a phone number' } },
          { status: 400 }
        );
      }

      try {
        const smsFactor = await workos.mfa.enrollFactor({
          type: 'sms',
          phoneNumber: `${values.phoneNumber}`,
        });

        const smsChallenge = await workos.mfa.challengeFactor({
          authenticationFactorId: smsFactor.id,
        });
        return { smsFactor, smsChallenge, step: 1 };
      } catch (error) {
        console.log('OOOOPS', error);
        return json({ errors: { message: error } }, { status: 400 });
      }

    case 'verify':
      const {
        authenticationCode,
        authenticationChallengeId,
        isSMSVerification,
      } = values;

      if (authenticationCode.toString().length !== 6) {
        return json(
          { errors: { title: 'Code must be 6 digits' } },
          { status: 400 }
        );
      }

      try {
        const response = await workos.mfa.verifyFactor({
          authenticationChallengeId: `${authenticationChallengeId}`,
          code: `${authenticationCode}`,
        });

        if (response.valid) {
          if (isSMSVerification === 'true') {
            await enrollSMS(
              user.id,
              response.challenge.authentication_factor_id
            );
          } else {
            await enrollTotp(
              user.id,
              response.challenge.authentication_factor_id
            );
          }
        }
        return { response, step: 2 };
      } catch (error) {
        return json({ errors: { message: error } }, { status: 400 });
      }
  }
  return null;
};

const MultiFactorAuthentication = () => {
  const data = useLoaderData();

  return (
    <section className="my-10">
      {data?.totpFactorId ? (
        <Alert
          message="Changing your two-factor authentication device will invalidate your
            current one"
        />
      ) : null}
      <h1 className="text-2xl font">Set up two-factor authentication (2FA)</h1>
      <ol className="my-8 relative border-l-2 border-gray-200">
        <SelectFactor />
        <Verify />
        <Activated />
      </ol>
    </section>
  );
};

export default MultiFactorAuthentication;
