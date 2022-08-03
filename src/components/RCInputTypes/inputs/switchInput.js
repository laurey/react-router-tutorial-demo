import React from 'react';
import { Switch } from 'antd';
import BaseInputComponent from '../baseInput';

class SwitchInput extends BaseInputComponent {
  constructor(props) {
    super(props);

    this.state = {
      size: props.size || 'default',
      checked: props.defaultChecked || props.value,
    };
  }

  handleChange = checked => {
    const { onChange } = this.props;

    this.setState(
      {
        checked,
      },
      () => {
        if (onChange) {
          onChange(checked);
        }
      }
    );
  };

  render() {
    const { classes, labelId, ...rest } = this.props;
    const { size, checked } = this.state;

    return (
      <Switch
        {...rest}
        size={size}
        checked={checked}
        defaultChecked={checked}
        aria-labelledby={labelId}
        onChange={this.handleChange}
      />
    );
  }
}

SwitchInput.defaultProps = {
  id: '',
  name: '',
  classes: {},
  size: 'default',
  defaultChecked: false,
  onChange: () => {},
};

export default SwitchInput;
