"use client";

import "./app.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

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
                    {({ signOut, user }) => (
                        <>
                            <div style={{ padding: "1rem" }}>
                                <p>Bienvenue, {user?.username}</p>
                                <button onClick={signOut}>
                                    Se déconnecter
                                </button>
                            </div>
                            {children}
                        </>
                    )}
                </Authenticator>
            </body>
        </html>
    );
}
