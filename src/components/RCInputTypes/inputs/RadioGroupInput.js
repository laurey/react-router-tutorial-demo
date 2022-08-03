import React from 'react';
import { Radio } from 'antd';
import BaseInputComponent from '../baseInput';

const { Group: RadioGroup } = Radio;

class RadioOptionsInput extends BaseInputComponent {
  handleChange = e => {
    const { onChange } = this.props;
    const { value } = e.target;

    this.setState(
      {
        value,
      },
      () => {
        if (onChange) {
          onChange(value);
        }
      }
    );
  };

  render() {
    const { value } = this.state;
    const { classes, required, labelId, ...rest } = this.props;

    return (
      <RadioGroup
        {...rest}
        value={value}
        aria-labelledby={labelId}
        className={classes.radio}
        required={required ? 'required' : undefined}
        onChange={this.handleChange}
      />
    );
  }
}

RadioOptionsInput.defaultProps = {
  name: '',
  classes: {},
  options: [],
  onBlur: () => {},
  onChange: () => {},
};

export default RadioOptionsInput;
