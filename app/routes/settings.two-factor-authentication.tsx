import { json } from '@remix-run/node';
import type { ActionFunction } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { enrollTotp } from '~/models/user.server';
import { requireUser } from '~/utils/session.server';
import { workos } from '~/utils/workos.server';
import VerificationInput from 'react-verification-input';
import { Loader } from '~/components/Loader';
import { useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

export const action: ActionFunction = async ({ request }) => {
  const user = await requireUser(request);
  let formData = await request.formData();
  let { _action, ...values } = Object.fromEntries(formData);

  console.log(formData);
  switch (_action) {
    case 'configure':
      // Create factor
      const totpFactor = await workos.mfa.enrollFactor({
        type: 'totp',
        issuer: 'Foo Corp',
        user: user.email,
      });
      // Persist MFA factor Id
      await enrollTotp(user.id, totpFactor.id);
      // Create a new challenge
      const challenge = await workos.mfa.challengeFactor({
        authenticationFactorId: totpFactor.id,
      });

      return { totpFactor, challenge };
    // verify the challenge
    case 'verify':
      const { code, authenticationChallengeId } = values;

      if (code.toString().length !== 6) {
        return json(
          { errors: { title: 'Code must be 6 digits' } },
          { status: 400 }
        );
      }

      const response = await workos.mfa.verifyFactor({
        authenticationChallengeId: `${authenticationChallengeId}`,
        code: `${code}`,
      });

      console.log(response);
      return response;
  }
  return null;
};
// error handling

const authenticationFactors = [
  {
    id: 'totp',
    title: 'authenticator app',
    icon: (
      <svg
        className="w-5 h-5"
        fill="white"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description: (
      <p>
        Use an application on your phone to get Multi-factor authentication
        codes when prompted. We recommend using cloud-based TOTP apps such as:
        1Password, Authy, LastPass Authenticator, or Microsoft Authenticator.
      </p>
    ),
  },
  {
    id: 'sms',
    title: 'SMS',
    icon: (
      <svg
        className="w-5 h-5"
        fill="white"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    description: (
      <p>
        We will send you an SMS with a Multi-factor authentication code when
        prompted.
      </p>
    ),
  },
];

const MultiFactorAuthentication = () => {
  const actionData = useActionData();
  const transition = useTransition();
  const [formStep, setFormStep] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font">Multi-factor authentication</h1>
      <div className="my-5 p-5 rounded-md border-2 border-gray-200">
        <div className="text-lg font-medium flex items-center space-x-2 mb-3">
          <p className="text-base font-medium text-white rounded-full w-5 p-3.5 h-5 bg-blue-500 flex items-center justify-center">
            1
          </p>
          <h2>Choose authentication factor</h2>
        </div>
        <p className="mb-5">
          Multi-factor authentication (2FA) is an extra layer of security used
          when logging into websites or apps.
        </p>
        <Form method="post" className="mt-3 space-y-3 mb-4">
          <></>
          {authenticationFactors.map((factor) => (
            <div key={factor.id} className="flex space-x-3  items-start">
              <input
                type="radio"
                key={factor.id}
                className=" mt-2.5 h-4 w-4 border border-transparent bg-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring text-blue-600 focus-visible:ring-blue-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2"
                id={factor.id}
                name="authFactorType"
              />
              <label htmlFor={factor.id}>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-blue-500 rounded-full p-2">
                    {factor.icon}
                  </div>
                  <p className="text-lg">Set up using {factor.title}</p>
                </div>
                <p>{factor.description}</p>
              </label>
            </div>
          ))}
          <button
            className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            name="_action"
            value="configure"
            type="submit"
          >
            Configure authentication factor{' '}
            {transition.state === 'submitting' && (
              <Loader width={4} height={4} />
            )}
          </button>
        </Form>
      </div>

      <div className=" space-y-3 my-5 p-5 rounded-md border-2 border-gray-200">
        <div className="text-lg font-medium flex items-center space-x-2 mb-3">
          <p className="text-base font-medium text-white rounded-full w-5 p-3.5 h-5 bg-blue-500 flex items-center justify-center">
            2
          </p>
          <h2> Authentication verification</h2>
        </div>
        <div className="">
          <p>
            Scan the image below with the Multi-factor authentication app on
            your phone. If you can't use a QR code, you can enter this text code
            instead
          </p>
          <div className="rounded-lg shadow-lg bg-white w-52 h-52 p-5">
            <img
              src={actionData?.totpFactor?.totp.qr_code}
              alt="QR code"
              className="w-52"
            />
          </div>
          <p>Enter the code from the application</p>
          <p>
            After scanning the QR code image, the app will display a code that
            you can enter below.
          </p>
          <Form method="post">
            <VerificationInput
              inputProps={{
                name: 'code',
              }}
            />
            <input type="text" placeholder="6-digit code" />
            <input
              type="hidden"
              name="authenticationChallengeId"
              value={actionData?.challenge.id}
            />
            <button
              className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              name="_action"
              value="verify"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
        {/* <p className="p-5 rounded-md bg-red-300">Multi-factor code verification failed. Please try again.</p> */}
      </div>
    </div>
  );
};

export default MultiFactorAuthentication;
