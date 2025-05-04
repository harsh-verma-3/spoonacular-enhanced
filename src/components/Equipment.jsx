import React, { useState } from "react";

const Equipment = ({ equipment = [] }) => {
    const [view, setView] = useState("grid");

    // Filter out duplicates by name
    const uniqueEquipment = equipment.reduce((acc, item) => {
        const exists = acc.find(eq => eq.name === item.name);
        if (!exists && item.name) {
            acc.push(item);
        }
        return acc;
    }, []);

    return (
        <section className=" rounded-lg  p-6 mb-6">
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
            
            {uniqueEquipment.length === 0 ? (
                <p className="text-gray-500">No equipment information available</p>
            ) : (
                <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
                    {uniqueEquipment.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <img
                                src={item.image?.includes('http') 
                                    ? item.image 
                                    : `https://spoonacular.com/cdn/equipment_100x100/${item.image || `${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}`}
                                alt={item.name}
                                className="w-16 h-16 rounded"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/100?text=No+Image";
                                }}
                            />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Equipment;