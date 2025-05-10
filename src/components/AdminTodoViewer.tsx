"use client";

import React, { useEffect, useState } from "react";
import { downloadData } from "aws-amplify/storage";

async function fetchAdminTodoFile(fileName: string): Promise<string | null> {
    try {
        const result = await downloadData({
            path: `admin-todos/${fileName}`,
            options: {
                bucket: "adminTodoStorage",
            },
        }).result;

        return await result?.body?.text();
    } catch (err) {
        console.error("Error downloading file:", err);
        return null;
    }
}

export default function AdminTodoViewer({ fileName }: { fileName: string }) {
    const [content, setContent] = useState<string | null>(null);

    useEffect(() => {
        fetchAdminTodoFile(fileName).then(setContent);
    }, [fileName]);

    return (
        <div>
            <h2>AdminTodo File Content</h2>
            {content ? <pre>{content}</pre> : <p>Loading...</p>}
        </div>
    );
}
