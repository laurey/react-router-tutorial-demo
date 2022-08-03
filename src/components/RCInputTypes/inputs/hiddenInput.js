import React from 'react';
import { Input } from 'antd';
import BaseInputComponent from '../baseInput';

class HiddenInput extends BaseInputComponent {
  render() {
    const { classes, labelId, ...rest } = this.props;
    return <Input {...rest} type="hidden" />;
  }
}

HiddenInput.defaultProps = {
  id: '',
  name: '',
  disabled: false,
};

export default HiddenInput;
