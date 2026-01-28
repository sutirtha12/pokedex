import "~/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import ThemeRegistry from "./ThemeRegistry";

export const metadata: Metadata = {
  title: "Pokedex App",
  description: "Advanced Pokedex built with T3 Stack and MUI",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
