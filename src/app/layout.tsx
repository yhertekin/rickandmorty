import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";
import "@/styles/style.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rick And Morty",
    description: "Rick And Morty",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ReduxProvider>{children}</ReduxProvider>
            </body>
        </html>
    );
}
