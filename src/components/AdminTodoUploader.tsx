"use client";

import React, { useEffect, useState } from "react";
import { uploadData } from "aws-amplify/storage";
import { fetchAuthSession } from "aws-amplify/auth";

export default function AdminTodoUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Vérifie si l'utilisateur est dans le groupe ADMINS
    useEffect(() => {
        const checkAdminGroup = async () => {
            try {
                const session = await fetchAuthSession();
                const rawGroups =
                    session.tokens?.accessToken?.payload["cognito:groups"];
                const groups = Array.isArray(rawGroups)
                    ? (rawGroups as string[])
                    : undefined;
                setIsAdmin(groups?.includes("ADMINS") || false);
            } catch (err) {
                console.error(
                    "Erreur lors de la vérification du groupe :",
                    err
                );
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminGroup();
    }, []);

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

    if (loading) {
        return <p>Vérification des autorisations...</p>;
    }

    if (!isAdmin) {
        return (
            <p>Accès refusé. Cette section est réservée aux administrateurs.</p>
        );
    }

    return (
        <div>
            <h2>Uploader un AdminTodo</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
}
