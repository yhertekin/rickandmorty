import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";
import "@/styles/style.scss";
import InitializeReduxState from "@/redux/InitializeReduxState";
import Header from "@/components/Header";
import localFont from "next/font/local";

const myFont = localFont({ src: "./../fonts/WubbaLubbaDubDub.ttf" });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rick And Morty",
    description: "Rick And Morty",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={myFont.className}>
                <ReduxProvider>
                    <Header />
                    <InitializeReduxState>{children}</InitializeReduxState>
                </ReduxProvider>
            </body>
        </html>
    );
}
