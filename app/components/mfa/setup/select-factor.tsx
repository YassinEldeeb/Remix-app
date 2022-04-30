import * as RadioGroup from '@radix-ui/react-radio-group';
import { Loader } from '../../shared/loader';
import { Form } from '@remix-run/react';

export const SelectFactor = ({ actionData, transition }) => {
  return (
    <div>
      <li
        className={` ml-6 ${
          !actionData?.step ? 'p-5 border-2 border-gray-200 rounded-md' : ''
        }`}
      >
        {actionData?.step >= 1 ? (
          <div className="text-lg font-medium flex items-center">
            <span className="flex absolute bg-indigo-500 -left-4 justify-center items-center w-7 h-7 rounded-full">
              <svg
                className="w-4 h-4 stroke-white"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <h2>Choose an authentication factor</h2>
          </div>
        ) : (
          <>
            <div className="text-lg font-medium flex items-center">
              <span className="flex absolute top-0 -left-4 justify-center items-center w-5 p-3.5 h-5 bg-indigo-500  rounded-full ring-8 ring-white text-base font-medium text-white">
                1
              </span>
              <h2>Choose an authentication factor</h2>
            </div>
            <p className="mb-5 mt-3">
              Two-factor authentication (2FA) is an extra layer of security used
              when logging into websites or apps.
            </p>
            <Form method="post" className="mt-3 space-y-3 mb-4">
              <RadioGroup.Root
                name="authFactorType"
                defaultValue="totp"
                aria-label="Select authentication factor type"
              >
                <div className="flex space-x-3 items-start mb-5">
                  <div>
                    <RadioGroup.Item
                      className="block h-4 w-4 mt-2.5 bg-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 checked:bg-red-500"
                      value="totp"
                      id="totp"
                    >
                      <RadioGroup.Indicator className="relative flex items-center justify-center">
                        <div className="bg-indigo-600 w-2 h-2 rounded-full"></div>
                      </RadioGroup.Indicator>
                    </RadioGroup.Item>
                  </div>
                  <label htmlFor="totp">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-indigo-500 rounded-full p-2">
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
                      </div>
                      <p className="text-lg">Set up using an app</p>
                    </div>
                    <p>
                      Use an application on your phone to get an authentication
                      code when prompted. We recommend using cloud-based TOTP
                      apps such as:{' '}
                      <a
                        className="text-indigo-500 hover:underline"
                        href="https://1passwword.com"
                      >
                        1Password
                      </a>{' '}
                      ,{' '}
                      <a
                        className="text-indigo-500 hover:underline"
                        href="https://authy.com/"
                      >
                        Authy
                      </a>
                      ,{' '}
                      <a
                        className="text-indigo-500 hover:underline"
                        href="https://www.lastpass.com/"
                      >
                        LastPass
                      </a>
                      , or{' '}
                      <a
                        className="text-indigo-500 hover:underline"
                        href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
                      >
                        Microsoft Authenticator.
                      </a>
                    </p>
                  </label>
                </div>
                <div className="flex space-x-3 items-start">
                  <RadioGroup.Item
                    className="h-4 w-4 mt-2.5 bg-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 checked:bg-red-500"
                    value="sms"
                    id="sms"
                  >
                    <RadioGroup.Indicator className="relative flex items-center justify-center ">
                      <div className="bg-indigo-600 w-2 h-2 rounded-full"></div>
                    </RadioGroup.Indicator>
                  </RadioGroup.Item>
                  <label htmlFor="sms">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-indigo-500 rounded-full p-2">
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
                      </div>
                      <p className="text-lg">Set up using SMS</p>
                    </div>
                    <p>
                      We will send you an SMS with an authentication code when
                      prompted.
                    </p>
                  </label>
                </div>
              </RadioGroup.Root>
              <p className="text-red-500">{actionData?.errors?.message}</p>
              <button
                className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                name="_action"
                value="selectFactor"
                type="submit"
              >
                Continue{' '}
                {transition.state === 'submitting' &&
                  transition.submission.formData.get('_action') ===
                    'selectFactor' && <Loader width={4} height={4} />}
              </button>
            </Form>
          </>
        )}
      </li>
    </div>
  );
};
