import React, { useState } from "react";

const DynamicForm = ({ fields, columns = 1, onSubmit }) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const renderField = (field) => {
        switch (field.type) {
            case "text":
            case "number":
            case "date":
                return (
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                );
            case "select":
                return (
                    <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    >
                        <option value="">--Select--</option>
                        {field.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );
            case "textarea":
                return (
                    <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                );
            default:
                return null;
        }
    };

    const rows = [];
    for (let i = 0; i < fields.length; i += columns) {
        const rowFields = fields.slice(i, i + columns);
        rows.push(
            <div key={i} className="flex gap-4 mb-4">
                {rowFields.map((field) => (
                    <div key={field.name} className="flex-1">
                        <label className="block mb-1 font-semibold">{field.label}</label>
                        {renderField(field)}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            {rows}
            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Submit
            </button>
        </form>
    );
};

export default DynamicForm;