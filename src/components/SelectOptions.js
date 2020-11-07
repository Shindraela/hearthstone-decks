import React from 'react';
import Select from 'react-select';

const SelectOptions = props => (
  <Select
    defaultValue={props.options[0]}
    label="Single select"
    options={props.options}
    onChange={props.onChange}
  />
);

export default SelectOptions;
