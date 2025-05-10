"use client";

import React, { useState } from "react";
import { uploadData } from "aws-amplify/storage";

export default function AdminTodoUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Aucun fichier sélectionné.");
            return;
        }

        try {
            await uploadData({
                path: `admin-todos/${file.name}`,
                data: file,
                options: {
                    bucket: "adminTodoStorage",
                },
            }).result;

            setMessage(`Fichier "${file.name}" uploadé avec succès !`);
            setFile(null);
        } catch (error) {
            console.error("Erreur d'upload :", error);
            setMessage("Erreur pendant l'upload.");
        }
    };

    return (
        <div>
            <h2>Uploader un AdminTodo</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
}
