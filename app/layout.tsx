import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description:
    'Invoice and customer management dashboard built with Next.js, TypeScript, and Postgres.',
  metadataBase: new URL('https://nextjs-invoice-dashboard-eta.vercel.app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
