import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PriceBreakdown = () => {
    const chartOptions = {
        backgroundColor: "rgba(0,0,0,0)",
        creditHref: "",
        creditText: "",
        height: 380,
        toolTip: {
            contentFormatter: function(e) {
                const dataPoint = e.entries[0].dataPoint;
                return `${dataPoint.price} for ${dataPoint.amount}<br>${dataPoint.indexLabel}<br><img src="${dataPoint.image}" width="100" height="100">`;
            }
        },
        data: [{
            type: "doughnut",
            dataPoints: [
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/brussels-sprouts.jpg",
                    amount: "3 pounds",
                    price: "$9.04",
                    y: 904,
                    indexLabel: "trimmed fresh brussels sprouts" 
                },
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/oil-coconut.jpg",
                    amount: "2 tablespoons",
                    price: "44 cents",
                    y: 44,
                    indexLabel: "canola oil" 
                },
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/maple-syrup.png",
                    amount: "¼ cups",
                    price: "$2.05",
                    y: 205,
                    indexLabel: "maple syrup" 
                },
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/light-brown-sugar.jpg",
                    amount: "¼ cups",
                    price: "18 cents",
                    y: 18,
                    indexLabel: "light brown sugar" 
                },
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/pancetta.png",
                    amount: "8 ounces",
                    price: "$9.07",
                    y: 907,
                    indexLabel: "gf df pancetta" 
                },
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/shallots.jpg",
                    amount: "1 medium",
                    price: "14 cents",
                    y: 14,
                    indexLabel: "diced shallot" 
                },
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/pecans.jpg",
                    amount: "2 handfuls",
                    price: "6 cents",
                    y: 6,
                    indexLabel: "raw pecan bits" 
                },
                { 
                    image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg",
                    amount: "some",
                    price: "$1.0",
                    y: 100,
                    indexLabel: "olive oil" 
                }
            ]
        }]
    };

    return (
        <section className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Price Breakdown</h2>
            <div className="flex flex-col md:flex-row">
                {/* Chart container */}
                <div style={{ height: 380, width: '100%', maxWidth: 480 }} className="mb-6 md:mb-0">
                    <CanvasJSChart options={chartOptions} />
                </div>
                
                {/* Price breakdown table */}
                <div className="ml-0 md:ml-4 font-sm" style={{ minWidth: 320, marginTop: 24 }}>
                    <div className="mb-2 font-bold">Cost per Serving: $3.69</div>
                    
                    <div className="flex justify-between">
                        <div className="w-3/5">
                            <p className="font-bold mb-2">Ingredient</p>
                            <p>3 pounds trimmed fresh brussels sprouts</p>
                            <p>2 tablespoons canola oil</p>
                            <p>¼ cups maple syrup</p>
                            <p>¼ cups light brown sugar</p>
                            <p>8 ounces gf df pancetta</p>
                            <p>1 medium diced shallot</p>
                            <p>2 handfuls raw pecan bits</p>
                            <p>some olive oil</p>
                        </div>
                        
                        <div className="w-2/5 text-right">
                            <p className="font-bold mb-2">Price</p>
                            <p>$9.04</p>
                            <p>$0.44</p>
                            <p>$2.05</p>
                            <p>$0.18</p>
                            <p>$9.07</p>
                            <p>$0.14</p>
                            <p>$0.06</p>
                            <p>$1.00</p>
                            <div className="border-t-2 border-double border-black mt-2 pt-1 font-bold">$22.15</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceBreakdown;