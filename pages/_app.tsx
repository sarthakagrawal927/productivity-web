import React from 'react';
import { SessionProvider } from 'next-auth/react';

// Type definitions for clarity
interface AppProps {
  Component: React.ComponentType;
  pageProps: {
    session: Session | undefined;
    [key: string]: any;
  };
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}