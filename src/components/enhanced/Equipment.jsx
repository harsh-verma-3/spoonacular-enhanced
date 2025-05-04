import React from 'react';

const Equipment = ({ equipment }) => {
  // Safely handle null/undefined equipment data
  const safeEquipment = Array.isArray(equipment) ? equipment : [];
  
  // Remove duplicate equipment items and normalize the data format
  const uniqueEquipment = safeEquipment
    .filter((item, index, self) => 
      item && item.id && index === self.findIndex(e => e && e.id === item.id)
    )
    .map(item => ({
      id: item.id,
      name: item.localizedName || item.name,
      // Handle both full URLs and image filenames
      image: item.image?.includes('http') 
        ? item.image 
        : `https://spoonacular.com/cdn/equipment_100x100/${item.image || `${item.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}`
    }));

  return (
    <div className="equipment-section">
      {uniqueEquipment.length === 0 ? (
        <p className="no-equipment">No equipment information available for this recipe.</p>
      ) : (
        <div className="equipment-grid">
          {uniqueEquipment.map((item, index) => (
            <div key={index} className="equipment-item">
              <div className="equipment-image-container">
                <img 
                  src={item.image}
                  alt={item.name} 
                  className="equipment-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=${encodeURIComponent(item.name.charAt(0))}`;
                  }}
                />
              </div>
              <span className="equipment-name">{item.name}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="equipment-tips">
        <h4>Equipment Tips:</h4>
        <ul>
          <li>Make sure all equipment is clean and dry before use.</li>
          <li>Preheat your oven, stovetop, or grill as directed in the recipe.</li>
          <li>Use properly sized equipment for best results.</li>
          <li>Sharp knives make prep work easier and safer.</li>
        </ul>
      </div>
    </div>
  );
};

export default Equipment;