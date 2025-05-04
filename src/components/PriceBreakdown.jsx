import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PriceBreakdown = ({ ingredients = [], price = 0 }) => {
    // Convert ingredients to chart data points
    const dataPoints = ingredients.map(ingredient => {
        // Estimate price if not provided (using fake data since API doesn't provide per-ingredient price)
        const estimatedPrice = Math.round(Math.random() * 200 + 50); // Random value between 50-250 cents
        
        return {
            image: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image || 'ingredient.png'}`,
            amount: `${ingredient.measures?.us?.amount || ''} ${ingredient.measures?.us?.unitShort || ''}`,
            price: `$${(estimatedPrice / 100).toFixed(2)}`,
            y: estimatedPrice,
            indexLabel: ingredient.name || "Ingredient"
        };
    });

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
            dataPoints: dataPoints
        }]
    };

    // Calculate total price
    const totalPrice = dataPoints.reduce((sum, item) => sum + item.y, 0) / 100;
    const pricePerServing = (price / 100) || (totalPrice / 6);

    return (
        <section className="rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Price Breakdown</h2>
            <div className="flex flex-col md:flex-row">
                {/* Chart container */}
                <div style={{ height: 380, width: '100%', maxWidth: 480 }} className="mb-6 md:mb-0">
                    <CanvasJSChart options={chartOptions} />
                </div>
                
                {/* Price breakdown table */}
                <div className="ml-0 md:ml-4 font-sm" style={{ minWidth: 320, marginTop: 24 }}>
                    <div className="mb-2 font-bold">Cost per Serving: ${pricePerServing.toFixed(2)}</div>
                    
                    <div className="flex justify-between">
                        <div className="w-3/5">
                            <p className="font-bold mb-2">Ingredient</p>
                            {ingredients.map((ingredient, index) => (
                                <p key={index}>{ingredient.original || ingredient.name}</p>
                            ))}
                        </div>
                        
                        <div className="w-2/5 text-right">
                            <p className="font-bold mb-2">Price</p>
                            {dataPoints.map((point, index) => (
                                <p key={index}>{point.price}</p>
                            ))}
                            <div className="border-t-2 border-double border-black mt-2 pt-1 font-bold">${totalPrice.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceBreakdown;