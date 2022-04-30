import { Form } from '@remix-run/react';
import VerificationInput from 'react-verification-input';
import { Loader } from '../shared/loader';

export const SMSForm = ({ actionData, transition }) => {
  return (
    <div>
      <Form method="post">
        SMS Verification code
        <div className="max-w-xs mt-5 mb-10 p-5 rounded-md shadow-md bg-gray-200">
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
          value={actionData?.smsChallengeId}
        />
        <input type="hidden" name="userId" value={actionData?.userId} />
        <button
          className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          name="_action"
          value="verify"
          type="submit"
        >
          Verify{' '}
          {transition.state === 'submitting' &&
            transition.submission.formData.get('_action') === 'verify' && (
              <Loader width={4} height={4} />
            )}
        </button>
      </Form>
    </div>
  );
};
