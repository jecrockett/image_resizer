import React from 'react';

const Form = () => {
  return (
    <div>
      <select id="dimension">
        <option value="width">Width</option>
        <option value="height">Height</option>
      </select>
      <input id="pixels" type='text' placeholder='Enter dimension'/>
    </div>
  );
};

module.exports = Form;
