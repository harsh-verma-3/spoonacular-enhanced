import React from "react";

const Instructions = () => {
    const steps = [
        "Preheat your oven to 400°F (200°C).",
        "Toss the Brussels sprouts with olive oil, salt, and pepper.",
        "Spread the Brussels sprouts on a baking sheet and roast for 20 minutes.",
        "In a skillet, cook the pancetta until crispy.",
        "Add the pecans and honey to the skillet and stir to coat.",
        "Combine the roasted Brussels sprouts with the pancetta and pecans. Serve warm.",
    ];

    return (
        <section className="bg-white rounded-lg shadow p-6 mb-6">
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