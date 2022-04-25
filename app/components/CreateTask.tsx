import * as Dialog from '@radix-ui/react-dialog';
import { Form } from '@remix-run/react';
import { Cross1Icon } from '@radix-ui/react-icons';

export const CreateTask = ({ handleChange, actionData }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>New Task +</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <Dialog.Content className="focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 bg-white fixed z-50 w-[95vw] max-w-md rounded-lg p-4 md:w-full top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Dialog.Title className="text-sm font-medium text-gray-900">
            Create Task
          </Dialog.Title>

          <Dialog.Description className="mt-2 text-sm font-normal text-gray-700">
            Create a new task
          </Dialog.Description>

          <Form
            method="post"
            onSubmit={handleChange}
            className="mt-2 space-y-2"
          >
            <fieldset>
              <label
                htmlFor="title"
                className="text-xs font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                name="title"
                aria-invalid={actionData?.errors?.title ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.title ? 'title-error' : undefined
                }
                className="focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 border border-gray-400 focus-visible:border-transparent mt-1 block w-full rounded-md text-sm text-gray-700 placeholder:text-gray-500 p-3 "
              />
            </fieldset>
            {actionData?.errors?.title && (
              <div className="pt-1 text-red-700" id="title-error">
                {actionData.errors.title}
              </div>
            )}
            <fieldset>
              <label
                htmlFor="body"
                className="text-xs font-medium text-gray-700"
              >
                Body
              </label>
              <input
                id="body"
                type="text"
                name="body"
                placeholder="Task details"
                aria-invalid={actionData?.errors?.body ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.body ? 'body-error' : undefined
                }
                className="focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 border border-gray-400 focus-visible:border-transparent mt-1 block w-full rounded-md text-sm text-gray-700 placeholder:text-gray-500 p-3"
              />
            </fieldset>
            {actionData?.errors?.body && (
              <div className="pt-1 text-red-700" id="body-error">
                {actionData.errors.body}
              </div>
            )}
            <button
              type="submit"
              name="_action"
              value="create"
              className="inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 border border-transparent focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            >
              Save
            </button>
          </Form>
          <Dialog.Close className="absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <Cross1Icon />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
