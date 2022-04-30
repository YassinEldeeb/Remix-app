import { Form } from '@remix-run/react';
import VerificationInput from 'react-verification-input';
import { Loader } from '../../shared/loader';

export const Verify = ({ actionData, transition }) => {
  console.log(actionData);
  return (
    <div>
      <li
        className={`ml-6 my-5 ${
          actionData?.step === 1
            ? 'p-5 border-2 border-gray-200 rounded-md'
            : ''
        }`}
      >
        {actionData?.step === 1 ? (
          <>
            {actionData?.totpFactor && (
              <>
                <div className="text-lg font-medium flex items-center mb-3">
                  <span className="flex absolute -left-4 justify-center items-center w-5 p-3.5 h-5 bg-indigo-500  rounded-full ring-8 ring-white text-base font-medium text-white">
                    2
                  </span>
                  <h2> Authentication verification</h2>
                </div>
                <p>
                  Scan the image below with the Multi-factor authentication app
                  on your phone. If you can't use a QR code, you can enter this
                  text code instead
                </p>
                <div className="rounded-lg shadow-lg bg-white my-5 w-52 h-52 p-5">
                  <img
                    src={actionData?.totpFactor?.totp.qr_code}
                    alt="QR code"
                    className="w-52"
                  />
                </div>
                <p>
                  After scanning the QR code image, the app will display a code
                  that you can enter below.
                </p>
                <Form method="post">
                  <div className="max-w-xs mt-5 mb-10">
                    <VerificationInput
                      autoFocus
                      placeholder=" "
                      removeDefaultStyles
                      classNames={{
                        container: 'container',
                        character: 'character',
                        characterInactive: 'character--inactive',
                        characterSelected: 'character--selected',
                      }}
                      inputProps={{
                        name: 'authenticationCode',
                      }}
                    />
                  </div>
                  <input
                    type="hidden"
                    name="authenticationChallengeId"
                    value={actionData?.totpChallenge?.id}
                  />
                  <button
                    className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    name="_action"
                    value="verify"
                    type="submit"
                  >
                    Verify{' '}
                    {transition.state === 'submitting' &&
                      transition.submission.formData.get('_action') ===
                        'verify' && <Loader width={4} height={4} />}
                  </button>
                </Form>
              </>
            )}

            {actionData?.smsFactor && (
              <div className="space-y-3">
                <div className="text-lg font-medium flex items-center mb-3">
                  <span className="flex absolute -left-4 justify-center items-center w-5 p-3.5 h-5 bg-indigo-500  rounded-full ring-8 ring-white text-base font-medium text-white">
                    2
                  </span>
                  <h2> Authentication verification</h2>
                </div>
                <p>
                  We will send authentication codes to your mobile phone during
                  sign in.
                </p>

                <Form method="post">
                  <fieldset>
                    <label
                      htmlFor="phoneNumber"
                      className="text-xs font-medium text-gray-700"
                    >
                      Phone number
                    </label>
                    <input
                      id="phoneNumber"
                      type="text"
                      name="phoneNumber"
                      placeholder="(+20) 1005321184"
                      className="focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 border border-gray-400 focus-visible:border-transparent mt-1 block max-w-sm rounded-md text-sm text-gray-700 placeholder:text-gray-500 p-1 my-3"
                    />
                  </fieldset>

                  <button
                    className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    name="_action"
                    value="phoneNumber"
                    type="submit"
                  >
                    Send authentication code{' '}
                    {transition.state === 'submitting' &&
                      transition.submission.formData.get('_action') ===
                        'phoneNumber' && <Loader width={4} height={4} />}
                  </button>
                </Form>

                <Form method="post">
                  <div className="max-w-xs mt-5 mb-10">
                    <VerificationInput
                      placeholder=" "
                      autoFocus
                      removeDefaultStyles
                      classNames={{
                        container: 'container',
                        character: 'character',
                        characterInactive: 'character--inactive',
                        characterSelected: 'character--selected',
                      }}
                      inputProps={{
                        name: 'authenticationCode',
                      }}
                    />
                  </div>
                  <input
                    type="hidden"
                    name="authenticationChallengeId"
                    value={actionData?.smsChallenge?.id}
                  />
                  <input
                    type="hidden"
                    name="isSMSVerification"
                    value={'true'}
                  />
                  <button
                    className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    name="_action"
                    value="verify"
                    type="submit"
                  >
                    Verify{' '}
                    {transition.state === 'submitting' &&
                      transition.submission.formData.get('_action') ===
                        'verify' && <Loader width={4} height={4} />}
                  </button>
                </Form>
              </div>
            )}
          </>
        ) : (
          <div className="text-lg font-medium flex items-center mb-3">
            {actionData?.step > 1 ? (
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
            ) : (
              <span className="flex absolute  -left-4 justify-center items-center w-5 p-3.5 h-5 bg-indigo-500  rounded-full ring-8 ring-white text-base font-medium text-white">
                2
              </span>
            )}

            <h2>Authentication verification</h2>
          </div>
        )}
      </li>
    </div>
  );
};
