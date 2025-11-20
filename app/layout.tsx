import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Provider } from './(components)/provider';

const mainFont = Poppins({
  weight: ['300', '400', '500', '600', '700'],
});

const theme = createTheme({
  fontFamily: `${mainFont.style.fontFamily}, sans-serif`,
  headings: { fontFamily: `${mainFont.style.fontFamily}, sans-serif` },
});

export const metadata: Metadata = {
  title: 'Server Sent Event for Notification',
  description: 'Build with golang and next js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
      </head>
      <body>
        <MantineProvider defaultColorScheme='light' theme={theme}>
          <Provider>
            <Notifications position='top-right' />
            {children}
          </Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
