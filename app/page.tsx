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

import AdminTodoViewer from "@/src/components/AdminTodoViewer";

export default function Page() {
    return (
        <main>
            <h1>AdminTodo</h1>
            <AdminTodoViewer fileName="example.txt" />
        </main>
    );
}
