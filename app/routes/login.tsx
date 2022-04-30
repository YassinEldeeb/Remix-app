import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  useActionData,
  useSearchParams,
  useTransition,
} from '@remix-run/react';
import { createUserSession, getUserId } from '~/utils/session.server';
import { verifyLogin } from '~/models/user.server';
import { safeRedirect, validateEmail } from '~/utils';
import { workos } from '~/utils/workos.server';
import { LoginForm } from '~/components/login-form';
import { TOTPForm } from '~/components/mfa/totp-form';
import { SMSForm } from '~/components/mfa/sms-form';
import { FormSwitcher } from '~/components/mfa/form-switcher';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return null;
};
interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/');
  const remember = formData.get('remember');
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case 'login':
      const email = formData.get('email');

      if (!validateEmail(email)) {
        return json<ActionData>(
          { errors: { email: 'Email is invalid' } },
          { status: 400 }
        );
      }

      const password = formData.get('password');

      if (typeof password !== 'string') {
        return json<ActionData>(
          { errors: { password: 'Password is required' } },
          { status: 400 }
        );
      }

      if (password.length < 8) {
        return json<ActionData>(
          { errors: { password: 'Password is too short' } },
          { status: 400 }
        );
      }

      const user = await verifyLogin(email, password);
      if (!user) {
        return json<ActionData>(
          { errors: { email: 'Invalid email or password' } },
          { status: 400 }
        );
      }

      // user doesn't have 2FA enabled
      if (!user.totpFactorId && !user.smsFactorId) {
        return createUserSession({
          request,
          userId: user.id,
          remember: remember === 'on' ? true : false,
          redirectTo,
        });
      }

      // User has TOTP
      if (user.totpFactorId && !user.smsFactorId) {
        const totpChallenge = await workos.mfa.challengeFactor({
          authenticationFactorId: `${user.totpFactorId}`,
        });

        return {
          userId: user.id,
          totpChallengeId: user.totpFactorId && totpChallenge.id,
          secondFactor: true,
          totp: true,
        };
      }

      // user has SMS
      if (!user.totpFactorId && user.smsFactorId) {
        const smsChallenge = await workos.mfa.challengeFactor({
          authenticationFactorId: `${user.smsFactorId}`,
        });

        return {
          userId: user.id,
          smsChallengeId: user.smsFactorId && smsChallenge.id,
          secondFactor: true,
          sms: true,
        };
      }

      // user has both
      if (user.totpFactorId && user.smsFactorId) {
        const totpChallenge = await workos.mfa.challengeFactor({
          authenticationFactorId: `${user.totpFactorId}`,
        });

        return {
          userId: user.id,
          bothAuthFactors: true,
          secondFactor: true,
          totpChallengeId: totpChallenge.id,
          totpFactorId: user.totpFactorId,
          smsFactorId: user.smsFactorId,
        };
      }

    case 'SMS':
      const { smsFactorId } = values;
      const smsChallenge = await workos.mfa.challengeFactor({
        authenticationFactorId: `${smsFactorId}`,
      });

      return {
        bothAuthFactors: true,
        smsChallengeId: smsChallenge.id,
        secondFactor: true,
      };

    case 'verify':
      const { authenticationCode, authenticationChallengeId, userId } = values;

      console.log({ authenticationCode, authenticationChallengeId, userId });
      const response = await workos.mfa.verifyFactor({
        authenticationChallengeId: `${authenticationChallengeId}`,
        code: `${authenticationCode}`,
      });

      if (!response.valid) {
        return json(
          {
            errors: {
              authCode: `Something went wrong. Please try again`,
            },
            secondFactor: true,
          },
          { status: 400 }
        );
      }

      return createUserSession({
        request,
        userId: `${userId}`,
        remember: remember === 'on' ? true : false,
        redirectTo,
      });
  }
};

export const meta: MetaFunction = () => {
  return {
    title: 'Login',
  };
};

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  const actionData = useActionData();
  const transition = useTransition();

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8 my-20">
        <h1 className="text-4xl text-center text-gray-800 font-medium mb-10">
          Log in
        </h1>
        {!actionData?.secondFactor && (
          <LoginForm
            actionData={actionData}
            redirectTo={redirectTo}
            searchParams={searchParams}
          />
        )}
        {actionData?.secondFactor && actionData?.totp && (
          <TOTPForm actionData={actionData} transition={transition} />
        )}
        {actionData?.secondFactor && actionData?.sms && (
          <SMSForm actionData={actionData} transition={transition} />
        )}
        {actionData?.secondFactor && actionData?.bothAuthFactors && (
          <FormSwitcher actionData={actionData} transition={transition} />
        )}
      </div>
    </div>
  );
}
