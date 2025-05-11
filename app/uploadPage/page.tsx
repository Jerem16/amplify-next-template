"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AdminTodoUploader from "@/src/components/AdminTodoUploader";

export default function UploadPage() {
    return (
        <Authenticator>
            {({ user, signOut }) => (
                <main className="p-4">
                    <h1 className="text-xl font-bold mb-4">
                        Uploader un fichier AdminTodo
                    </h1>
                    <p className="mb-2">Bienvenue, {user?.username}</p>
                    <button
                        onClick={signOut}
                        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Se déconnecter
                    </button>
                    <AdminTodoUploader />
                </main>
            )}
        </Authenticator>
    );
}
