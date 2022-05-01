import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import toast, { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/navbar';
import styles from './styles/app.css';
import { getSession, getUser } from './utils/session.server';
import type { ToastMessage } from './utils/session.server';
import React from 'react';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'WorkOS + Remix',
  viewport: 'width=device-width,initial-scale=1',
});

type LoaderData = {
  toastMessage: ToastMessage | null;
  user?: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const toastMessage = session.get('toastMessage') as ToastMessage;
  const user = await getUser(request);

  if (!toastMessage) {
    return json<LoaderData>({
      toastMessage: null,
      user,
    });
  }

  if (!toastMessage.type) {
    throw new Error('Message should have a type');
  }

  return json<LoaderData>({
    toastMessage: !toastMessage ? null : toastMessage,
    user,
  });
};

export default function App() {
  const { toastMessage } = useLoaderData<LoaderData>();

  React.useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const { message, type } = toastMessage;

    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        throw new Error(`${type} is not handled`);
    }
  }, [toastMessage]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <Navbar />
          <main className="p-6 max-w-2xl mx-auto">
            <Outlet />
            <Toaster />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
