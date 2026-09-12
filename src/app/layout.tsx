import type { Metadata } from 'next';
import { Barlow, Bebas_Neue, DM_Serif_Display } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vijesha Films — Real Stories. Honest Cinema.',
  description: 'Vijesha Films is an independent production company committed to bold storytelling and authentic human experiences.',
  icons: {
    icon: '/assets/vijesha-films-logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${bebasNeue.variable} ${dmSerifDisplay.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
