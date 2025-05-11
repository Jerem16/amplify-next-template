"use client";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

export default function ConnectionPage() {
    return (
        <Authenticator>
            {({ user, signOut }) => (
                <main className="p-4">
                    <h1 className="text-xl font-bold mb-4">
                        Page de connexion
                    </h1>
                    <p className="mb-2">Bienvenue, {user?.username}</p>
                    <button
                        onClick={signOut}
                        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Se déconnecter
                    </button>
                </main>
            )}
        </Authenticator>
    );
}
