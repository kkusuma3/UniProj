import React, { Component } from 'react';

import CreatableSelect from 'react-select/lib/Creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

export default class CreatableInputOnly extends Component<*, State> {
  state = {
    inputValue: '',
    value: [],
  };

  handleChange = (value: any, actionMeta: any) => {
    this.setState({ value });
    this.props.handleChange(value);
  };

  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (!value.map(d => d.value).includes(inputValue)) {
          this.setState({
            inputValue: '',
            value: [...value, createOption(inputValue)],
          });
          this.props.handleChange([...value, createOption(inputValue)]);
        }
        event.preventDefault();
    }
  };

  isOptionUnique(prop) {
    const { option, options, valueKey, labelKey } = prop;
    return !options.find(opt => option[valueKey] === opt[valueKey])
  }

  render() {
    const { inputValue, value } = this.state;
    return (
      <CreatableSelect
        className="select"
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        isOptionUnique={this.isOptionUnique}
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder={this.props.placeholder}
        value={value}
      />
    );
  }
}
