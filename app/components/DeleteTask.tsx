import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { Form } from '@remix-run/react';

export const DeleteTask = ({ handleChange }) => {
  return (
    <Form method="post" onChange={handleChange}>
      <AlertDialog.Root>
        <AlertDialog.AlertDialogTrigger>Delete</AlertDialog.AlertDialogTrigger>
        <AlertDialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <AlertDialog.Content className="focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 bg-white fixed z-50 w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <AlertDialog.Title className="text-sm font-medium text-gray-900">
            Are you absolutely sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm font-normal text-gray-700">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <AlertDialog.Cancel className="inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 dark:border-transparent focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              Cancel
            </AlertDialog.Cancel>
            <button
              name="_action"
              value="delete"
              className="focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75
           border border-transparent inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium bg-purple-600 text-white hover:bg-purple-700"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Form>
  );
};
