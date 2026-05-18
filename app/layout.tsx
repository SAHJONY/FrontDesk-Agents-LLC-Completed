import '../styles/globals.css';

export const metadata = {
  title: 'Frontdesk Agents | Nexus Prime',
  description: 'The World\'s Most Advanced AI Agentic Receptionist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
