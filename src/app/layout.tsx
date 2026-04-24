import "../styles/index.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Aeroverse Academy | Master Digital Skills That Pay',
  description: 'Aeroverse Academy provides tutor-led, practical training in high-demand digital skills for Nigerians. Bridge the gap between learning and earning.',
  keywords: 'Digital Skills, Coding, UI/UX Design, Data Analysis, Nigeria Tech Education, Remote Work Skills, Aeroverse Academy',
  openGraph: {
    title: 'Aeroverse Academy | Master Digital Skills That Pay',
    description: 'Bridge the gap between learning and earning with tutor-led training.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen font-sans selection:bg-primary selection:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}