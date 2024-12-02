// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/alldata">All Crime</Link>
            <Link href="/vehicledata">Vehicle Crime</Link>
            <Link href="/propertydata">Property Crime</Link>
          </nav>
        </header>
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
