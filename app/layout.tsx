"use client";

import "./app.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
import Header from "@/src/components/Header/Header";
Amplify.configure(outputs);

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Authenticator>
                    <Header />
                    {children}
                </Authenticator>
            </body>
        </html>
    );
}
