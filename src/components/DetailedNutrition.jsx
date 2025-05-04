import React, { useState, useRef } from "react";
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DetailedNutrition = ({ nutrition = {} }) => {
    const [tooltipData, setTooltipData] = useState(null);
    const chartRef = useRef(null);
    
    // Extract nutrition data
    const nutrients = nutrition.nutrients || [];
    
    // Find core nutrition values
    const calories = nutrients.find(n => n.name === "Calories")?.amount || 0;
    const protein = nutrients.find(n => n.name === "Protein")?.amount || 0;
    const fat = nutrients.find(n => n.name === "Fat")?.amount || 0;
    const carbs = nutrients.find(n => n.name === "Carbohydrates")?.amount || 0;
    const healthScore = nutrition.healthScore || 0;

    // "Limit These" data - filter from nutrients
    const limitNutrients = ["Calories", "Fat", "Saturated Fat", "Carbohydrates", "Sugar", "Cholesterol", "Sodium"];
    const limits = limitNutrients.map(name => {
        const nutrient = nutrients.find(n => n.name === name);
        return {
            name,
            value: nutrient ? `${Math.round(nutrient.amount)}${nutrient.unit}` : "0",
            percent: nutrient ? Math.round(nutrient.percentOfDailyNeeds) : 0
        };
    });

    // "Get Enough Of These" data - filter from nutrients
    const enoughNutrients = ["Protein", "Vitamin K", "Vitamin C", "Manganese", "Fiber", "Vitamin B6", "Potassium"];
    const getEnough = enoughNutrients.map(name => {
        const nutrient = nutrients.find(n => n.name === name);
        return {
            name,
            value: nutrient ? `${Math.round(nutrient.amount)}${nutrient.unit}` : "0",
            percent: nutrient ? Math.round(nutrient.percentOfDailyNeeds) : 0
        };
    });

    // Get chart options for tooltip - simplified example distribution
    const getChartOptions = (name) => {
        // Create a simple distribution if we don't have actual data
        const ingredientDistribution = {
            Calories: [
                { label: "Main Ingredient", y: 40 },
                { label: "Secondary Ingredient", y: 30 },
                { label: "Other Ingredients", y: 30 },
            ],
            Fat: [
                { label: "Main Fat Source", y: 50 },
                { label: "Other Sources", y: 50 },
            ],
            Protein: [
                { label: "Main Protein Source", y: 60 },
                { label: "Other Sources", y: 40 },
            ],
        };

        return {
            animationEnabled: false,
            backgroundColor: "transparent",
            height: 200,
            title: {
                text: `Distribution of ${name}`,
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                padding: 10
            },
            data: [{
                type: "doughnut",
                showInLegend: false,
                indexLabel: "{label}: {y}%",
                indexLabelFontSize: 12,
                indexLabelFontColor: "#555",
                indexLabelPlacement: "outside",
                dataPoints: ingredientDistribution[name] || []
            }],
            toolTip: {
                enabled: true,
                content: "{label}: {y}%",
            }
        };
    };

    return (
        <section className="rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Nutritional Information</h3>
            
            {/* Quickview Section */}
            <div className="mb-6 p-4 bg-gray-100 rounded">
                <div className="font-bold mb-2">Quickview</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div>{Math.round(calories)} Calories</div>
                    <div>{Math.round(protein)}g Protein</div>
                    <div>{Math.round(fat)}g Total Fat</div>
                    <div>{Math.round(carbs)}g Carbs</div>
                    <div>{healthScore || 0}% Health Score</div>
                </div>
            </div>

            {/* "Limit These" Section */}
            <div className="mb-6">
                <h4 className="font-bold text-lg mb-2 text-[#e57373]">Limit These</h4>
                {limits.map((item, index) => (
                    <div key={index} className="mb-2">
                        <div className="flex items-start mb-1">
                            <div className="w-32 text-sm">{item.name}</div>
                            <div className="w-16 text-sm">{item.value}</div>
                            <div className="flex-1">
                                <div 
                                    className="relative"
                                    onMouseOver={(e) => {
                                        setTooltipData({
                                            name: item.name,
                                            x: e.clientX,
                                            y: e.clientY,
                                        });
                                    }}
                                    onMouseOut={() => setTooltipData(null)}
                                >
                                    <div
                                        className="h-4 bg-[#e57373]" 
                                        style={{ width: `${Math.min(item.percent, 100)}%` }}
                                    ></div>
                                    <span className="absolute right-0 top-0 text-xs text-[#e57373]">{item.percent}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* "Get Enough Of These" Section */}
            <div className="mb-6">
                <h4 className="font-bold text-lg mb-2 text-[#64b5f6]">Get Enough Of These</h4>
                {getEnough.map((item, index) => (
                    <div key={index} className="mb-2">
                        <div className="flex items-start mb-1">
                            <div className="w-32 text-sm">{item.name}</div>
                            <div className="w-16 text-sm">{item.value}</div>
                            <div className="flex-1">
                                <div 
                                    className="relative"
                                    onMouseOver={(e) => {
                                        setTooltipData({
                                            name: item.name,
                                            x: e.clientX,
                                            y: e.clientY,
                                        });
                                    }}
                                    onMouseOut={() => setTooltipData(null)}
                                >
                                    <div
                                        className="h-4 bg-[#64b5f6]" 
                                        style={{ width: `${Math.min(item.percent, 100)}%` }}
                                    ></div>
                                    <span className="absolute right-0 top-0 text-xs text-[#64b5f6]">{item.percent}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tooltip with CanvasJS Chart */}
            {tooltipData && (
                <div
                    className="fixed bg-white shadow-lg p-4 rounded-lg border"
                    style={{
                        left: `${tooltipData.x}px`,
                        top: `${tooltipData.y}px`,
                        zIndex: 1000,
                        width: "250px",
                    }}
                >
                    <CanvasJSChart 
                        options={getChartOptions(tooltipData.name)} 
                        onRef={ref => (chartRef.current = ref)}
                    />
                </div>
            )}
            
            {/* Legend */}
            <div className="flex items-center text-xs mt-4">
                <div className="w-3 h-3 bg-[#e57373] mr-1"></div>
                <div className="w-3 h-3 bg-[#64b5f6] mx-1"></div>
                <span>covered percent of daily need</span>
            </div>
        </section>
    );
};

export default DetailedNutrition;