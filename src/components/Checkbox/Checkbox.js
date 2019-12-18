import React from 'react';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange, value }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} value={value} />
);

export default Checkbox;