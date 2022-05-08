import { Form, useActionData, useTransition } from '@remix-run/react';
import { Button } from '../shared';
import { VerificationInput } from './verification-input';

export const SMSForm = () => {
  const actionData = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      SMS Verification code
      <div className="mt-5 mb-10">
        <VerificationInput />
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
  );
};
