import AdminTodoViewer from "@/src/components/AdminTodoViewer";

export default function Page() {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Admin Todo
            </h1>
            <AdminTodoViewer fileName="data.json" />
        </div>
    );
}
