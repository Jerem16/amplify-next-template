"use client";

// import "./app.css";

import { Amplify } from "aws-amplify";
// import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
import Header from "@/src/components/Header/Header";
Amplify.configure(outputs);
import "./globals.css";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main className="min-h-screen bg-gray-100 p-8">{children}</main>
            </body>
        </html>
    );
}
