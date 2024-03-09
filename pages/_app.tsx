// import { SessionProvider } from "next-auth/react"
// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
// }) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

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