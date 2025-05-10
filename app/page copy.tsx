// app/page.tsx ou App.tsx
"use client";

// import { Amplify } from "aws-amplify";
// import outputs from "@/amplify_outputs.json";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import AdminPublicTodos from "@/src/components/AdminPublicTodos";

import AdminTodo from "@/src/components/AdminTodo";
import UserTodo from "@/src/components/UserTodo";
import "@aws-amplify/ui-react/styles.css";

// Amplify.configure(outputs);

export default function App() {
    const { user, signOut } = useAuthenticator();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function checkGroup() {
            const session = await fetchAuthSession();
            const rawGroups =
                session.tokens?.accessToken?.payload["cognito:groups"];
            const groups = Array.isArray(rawGroups)
                ? (rawGroups as string[])
                : undefined;
            setIsAdmin(groups?.includes("ADMINS") || false);

            if (Array.isArray(groups) && groups.includes("ADMINS")) {
                setIsAdmin(true);
            }
        }

        checkGroup();
    }, []);

    return (
        <main>
            <h1>Welcome {user?.signInDetails?.loginId}</h1>
            {isAdmin ? <AdminTodo /> : <UserTodo />}
            <button onClick={signOut}>Sign out</button>
            <AdminPublicTodos />;
        </main>
    );
}
