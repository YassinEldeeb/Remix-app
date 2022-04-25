import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  NavLink,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import { requireUserId } from '~/utils/session.server';
import { createTask, getTasks } from '~/models/task.server';
import { CreateTask } from '~/components/CreateTask';

type LoaderData = {
  tasks: Awaited<ReturnType<typeof getTasks>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const tasks = await getTasks({ userId });
  return json<LoaderData>({ tasks });
};

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const title = formData.get('title');
  const body = formData.get('body');

  if (typeof title !== 'string' || title.length === 0) {
    return json<ActionData>(
      { errors: { title: 'Title is required' } },
      { status: 400 }
    );
  }
  if (typeof body !== 'string' || body.length === 0) {
    return json<ActionData>(
      { errors: { body: 'Body is required' } },
      { status: 400 }
    );
  }
  const task = await createTask({ title, body, userId });

  return redirect(`/tasks/${task.id}`);
};

export default function TaskIndexPage() {
  const data = useLoaderData() as LoaderData;
  const actionData = useActionData() as ActionData;
  const submit = useSubmit();

  const handleChange = (event) => {
    submit(event.currentTarget, { replace: true });
  };

  return (
    <section>
      <CreateTask handleChange={handleChange} actionData={actionData} />
      {data.tasks.length === 0 ? (
        <p className="p-4">No Tasks yet</p>
      ) : (
        <ol>
          {data.tasks.map((task) => (
            <li key={task.id}>
              <NavLink
                className={({ isActive }) =>
                  `block border-b p-4 text-xl ${isActive ? 'bg-white' : ''}`
                }
                to={task.id}
              >
                📝 {task.title}
              </NavLink>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
