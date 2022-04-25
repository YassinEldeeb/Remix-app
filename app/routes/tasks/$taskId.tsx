import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData, useSubmit } from '@remix-run/react';
import invariant from 'tiny-invariant';
import type { Task } from '~/models/task.server';
import { deleteTask } from '~/models/task.server';
import { getTask } from '~/models/task.server';
import { requireUserId } from '~/utils/session.server';
import { DeleteTask } from '~/components/DeleteTask';

type LoaderData = {
  task: Task;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);

  invariant(params.taskId, 'taskId not found');

  const task = await getTask({ userId, id: params.taskId });
  if (!task) {
    throw new Response('Not Found', { status: 404 });
  }
  return json<LoaderData>({ task });
};

export const action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  let { _action } = Object.fromEntries(formData);

  switch (_action) {
    case 'delete':
      const userId = await requireUserId(request);
      invariant(params.taskId, 'taskId not found');
      await deleteTask({ userId, id: params.taskId });
      return redirect('/tasks');
  }
};

export default function TaskDetailsPage() {
  const data = useLoaderData() as LoaderData;
  const submit = useSubmit();

  function handleChange(event) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <>
      <h3 className="text-2xl font-bold">{data.task.title}</h3>
      <p className="py-6">{data.task.body}</p>
      <hr className="my-4" />
      <DeleteTask handleChange={handleChange} />
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Task not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
