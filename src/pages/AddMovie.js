import React from "react";
import DynamicForm from "../components/DynamicForm";

const AddMovie = () => {
    const fields = [
        { name: "title", label: "Title", type: "text" },
        { name: "year", label: "Release Year", type: "number" },
        { name: "genre", label: "Genre", type: "select", options: ["Action", "Drama", "Comedy"] },
        { name: "description", label: "Description", type: "textarea" }
    ];

    const handleSubmit = (data) => {
        console.log("Submitted:", data);
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add a New Movie</h1>
            <DynamicForm fields={fields} columns={2} onSubmit={handleSubmit} />
        </div>
    );
};

export default AddMovie;