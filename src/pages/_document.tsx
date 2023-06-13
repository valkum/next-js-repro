import dns from 'node:dns';

import {Head, Html, Main, NextScript} from 'next/document';

// Workaround for https://github.com/nodejs/node/issues/41625
dns.setDefaultResultOrder('ipv4first');

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />

        <link href="/favicon/favicon.svg" rel="icon" />
        <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon/favicon-48x48.png" rel="icon" sizes="48x48" type="image/png" />
        <link href="/favicon/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/favicon/site.webmanifest" rel="manifest" />
        <link color="#000000" href="/favicon/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#000000" name="msapplication-TileColor" />
        <meta content="#000000" name="theme-color" />

        {/* google translate breaks react:
          - https://github.com/facebook/react/issues/11538
          - https://bugs.chromium.org/p/chromium/issues/detail?id=872770 */}
        <meta content="notranslate" name="google" />

        {/* https://nextjs.org/docs/basic-features/font-optimization */}
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet" />
      </Head>
      <body className="bg-zinc-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
