import { Form, Link } from '@remix-run/react';

export const LoginForm = ({ actionData, redirectTo, searchParams }) => {
  return (
    <Form method="post" className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            required
            autoFocus={true}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
            className="focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 border border-gray-400 focus-visible:border-transparent mt-1 block w-full rounded-md text-sm text-gray-700 placeholder:text-gray-500 p-3"
          />
          {actionData?.errors?.email && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.errors.email}
            </div>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
            className="focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75 border border-gray-400 focus-visible:border-transparent mt-1 block w-full rounded-md text-sm text-gray-700 placeholder:text-gray-500 p-3"
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>
      </div>

      <input type="hidden" name="redirectTo" value={redirectTo} />
      <button
        name="_action"
        value="login"
        type="submit"
        className="w-full rounded bg-indigo-500  py-2 px-4 text-white hover:bg-indigo-600 focus:bg-indigo-400"
      >
        Log in
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            className="text-indigo-500 underline"
            to={{
              pathname: '/signup',
              search: searchParams.toString(),
            }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </Form>
  );
};
