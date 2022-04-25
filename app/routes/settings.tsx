import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  // return auth factors for users
  return null;
};

const Settings = () => {
  const data = useLoaderData();

  return (
    <div>
      <h1 className="text-3xl font-medium">Settings</h1>
      <div className="my-5">
        <h2 className="text-2xl mb-1">Multi-factor authentication</h2>
        <p className="mb-5">
          Multi-factor authentication (MFA) is an extra layer of security used
          when logging into websites or apps.
        </p>
        <ul></ul>
        <Link
          to="/settings/two-factor-authentication"
          className="inline-flex items-center px-4 py-3 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Configure MFA
        </Link>
      </div>
    </div>
  );
};

export default Settings;
