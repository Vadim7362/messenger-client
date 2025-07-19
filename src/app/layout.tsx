import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-white text-black min-h-screen">
        <main className="max-w-xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
