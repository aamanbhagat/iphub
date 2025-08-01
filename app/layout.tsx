import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'What\'s My IP? | Fast IPv4 & IPv6 Address Lookup',
  description: 'Instantly discover your public IPv4 and IPv6 addresses with this super-fast, lightweight tool. Get your IP addresses and location information in seconds.',
  keywords: 'IP address, IPv4, IPv6, what is my IP, IP lookup, public IP, internet address',
  authors: [{ name: 'IP Lookup Tool' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'What\'s My IP? | Fast IPv4 & IPv6 Address Lookup',
    description: 'Instantly discover your public IPv4 and IPv6 addresses with this super-fast, lightweight tool.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://ipapi.co" />
        <link rel="preconnect" href="https://api.ipify.org" />
        <link rel="preconnect" href="https://api64.ipify.org" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}