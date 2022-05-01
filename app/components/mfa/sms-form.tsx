import { Form } from '@remix-run/react';
import VerificationInput from 'react-verification-input';
import { Button } from '../shared';

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
        <Button
          isLoading={
            transition.state === 'submitting' &&
            transition.submission.formData.get('_action') === 'verify'
          }
          name="_action"
          value="verify"
          type="submit"
        >
          Verify
        </Button>
      </Form>
    </div>
  );
};
