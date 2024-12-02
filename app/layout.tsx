// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "10px", background: "#333", color: "#fff" }}>
          <nav style={{ display: "flex", gap: "20px" }}>
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
