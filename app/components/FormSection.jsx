"use client"
import React from 'react'
const FormSection = ({ title, data, setData }) => {
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const updatedData = [...data];
      updatedData[index][name] = value;
      setData(updatedData);
    };
  
    const handleAddSection = () => {
      setData([...data, {}]);
    };
  
    const handleRemoveSection = (index) => {
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    };
  
    return (
      <div>
        <h2>{title}</h2>
        {data.map((entry, index) => (
          <div key={index}>
            {Object.keys(entry).map((key) => (
              <div key={key} className='flex flex-col text-sm'>
                <label className='text-textLabel'>{key}:</label>
                <input
                  type="text"
                  name={key}
                  value={entry[key]}
                  className='inputFormStyle'
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            ))}
            <button type="button" onClick={() => handleRemoveSection(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddSection}>
          Add {title.slice(0, -1)}
        </button>
      </div>
    );
  };
  

export default FormSection