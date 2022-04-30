import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getUserAuthFactors } from '~/models/user.server';
import { requireUserId } from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const userAuthFactors = await getUserAuthFactors(userId);
  return userAuthFactors;
};

export const action: ActionFunction = async ({ request }) => {
  return redirect('/settings/two-factor-authentication');
};

export default function Settings() {
  const data = useLoaderData();

  return (
    <div>
      <h1 className="text-3xl font-medium">Settings</h1>
      <div className="my-5">
        <h3 className="text-2xl leading-6 font-medium text-gray-900 mb-3">
          Two-factor authentication
        </h3>
        <p className="mb-3">
          Two-factor authentication (2FA) is an extra layer of security used
          when logging into websites or apps.
        </p>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Two-factor methods
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="items-center py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Authenticator app
                </dt>
                <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Form method="post">
                    <span className="mr-5 text-gray-500">
                      {data?.totpFactorId ? 'Configured' : 'Not configured'}
                    </span>

                    <button
                      type="submit"
                      className="px-4 py-3 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {data?.totpFactorId ? 'Edit' : 'Add'}
                    </button>
                  </Form>
                </dd>
              </div>
              <div className="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm  font-medium text-gray-500">SMS</dt>
                <dd className="mt-1 text-right text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <Form method="post">
                    <span className="mr-5 text-gray-500">
                      {data?.smsFactorId ? 'Configured' : 'Not configured'}
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-3 border border-transparent shadow-sm text-sm leading-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {data?.smsFactorId ? 'Edit' : 'Add'}
                    </button>
                  </Form>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
