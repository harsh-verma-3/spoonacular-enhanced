import React, { useState } from "react";

const Equipment = () => {
    const [view, setView] = useState("grid");

    const equipment = [
        { name: "Baking paper", image: "baking-paper.jpg" },
        { name: "Baking sheet", image: "baking-sheet.jpg" },
        { name: "Oven", image: "oven.jpg" },
        { name: "Frying pan", image: "frying-pan.jpg" },
    ];

    return (
        <section className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Equipment</h3>
                
                {/* Updated toggle to match Ingredients component */}
                <div className="border rounded px-1 inline-flex">
                    <label className={`cursor-pointer px-3 py-1 ${view === "grid" ? "bg-blue-100 text-gray-800" : ""}`}>
                        <input
                            type="radio"
                            name="view"
                            className="hidden"
                            checked={view === "grid"}
                            onChange={() => setView("grid")}
                        />
                        Grid
                    </label>
                    <label className={`cursor-pointer px-3 py-1 ${view === "list" ? "bg-blue-100 text-gray-800" : ""}`}>
                        <input
                            type="radio"
                            name="view"
                            className="hidden"
                            checked={view === "list"}
                            onChange={() => setView("list")}
                        />
                        List
                    </label>
                </div>
            </div>
            
            <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
                {equipment.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <img
                            src={`https://spoonacular.com/cdn/equipment_100x100/${item.image}`}
                            alt={item.name}
                            className="w-16 h-16 rounded"
                        />
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Equipment;