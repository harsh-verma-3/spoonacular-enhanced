import React, { useState, useRef, useEffect } from "react";
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DetailedNutrition = () => {
    const [tooltipData, setTooltipData] = useState(null);
    const chartRef = useRef(null);

    // "Limit These" data
    const limits = [
        { name: "Calories", value: "528k", percent: 26 },
        { name: "Fat", value: "34g", percent: 53 },
        { name: "Saturated Fat", value: "10g", percent: 69 },
        { name: "Carbohydrates", value: "48g", percent: 16 },
        { name: "Sugar", value: "31g", percent: 35 },
        { name: "Cholesterol", value: "24mg", percent: 8 },
        { name: "Sodium", value: "507mg", percent: 22 },
    ];

    // "Get Enough Of These" data
    const getEnough = [
        { name: "Protein", value: "12g", percent: 25 },
        { name: "Vitamin K", value: "409µg", percent: 390 },
        { name: "Vitamin C", value: "193mg", percent: 234 },
        { name: "Manganese", value: "1mg", percent: 56 },
        { name: "Fiber", value: "8g", percent: 35 },
        // ...rest of the data
    ];

    // Get chart options for tooltip
    const getChartOptions = (name) => {
        const ingredientDistribution = {
            Calories: [
                { label: "Brussels Sprouts", y: 40 },
                { label: "Pancetta", y: 30 },
                { label: "Maple Syrup", y: 20 },
                { label: "Brown Sugar", y: 10 },
            ],
            Fat: [
                { label: "Pancetta", y: 50 },
                { label: "Canola Oil", y: 20 },
                { label: "Pecans", y: 15 },
                { label: "Olive Oil", y: 15 },
            ],
            Protein: [
                { label: "Brussels Sprouts", y: 60 },
                { label: "Pancetta", y: 30 },
                { label: "Pecans", y: 10 },
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
        <section className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Nutritional Information</h3>
            
            {/* Quickview Section */}
            <div className="mb-6 p-4 bg-gray-100 rounded">
                <div className="font-bold mb-2">Quickview</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div>528 Calories</div>
                    <div>12g Protein</div>
                    <div>34g Total Fat</div>
                    <div>48g Carbs</div>
                    <div>23% Health Score</div>
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
                                        style={{ width: `${item.percent}%` }}
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