import './globals.css'; 

export const metadata = {
  title: 'Doc-Nest',
  description: 'Your secure file manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        {/* Everything here will show on EVERY page (e.g., a top navigation bar) */}
        
        {/* This is where your page.tsx content gets injected */}
        <main className='min-h-screen w-full'>{children}</main>
        
      </body>
    </html>
  );
}