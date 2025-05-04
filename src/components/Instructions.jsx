import React from "react";

const Instructions = ({ instructions = [] }) => {
    // Extract steps from instructions
    const steps = instructions[0]?.steps?.map(step => step.step) || [
        "No instructions available for this recipe."
    ];

    return (
        <section className="rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Instructions</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </section>
    );
};

export default Instructions;