// app/page.tsx ou App.tsx
"use client";

import "@aws-amplify/ui-react/styles.css";

import AdminTodoViewer from "@/src/components/AdminTodoViewer";
export default function Page() {
    return (
        <main>
            <h1>AdminTodo</h1>
            <AdminTodoViewer fileName="data.json" />
        </main>
    );
}
