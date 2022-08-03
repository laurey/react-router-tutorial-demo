import React from 'react';
import { Checkbox } from 'antd';
import BaseInputComponent from '../baseInput';

const { Group: CheckboxGroup } = Checkbox;

class CheckboxOptionsInput extends BaseInputComponent {
  constructor(props) {
    super(props);

    const value = props.value || [];
    this.state = {
      value,
    };
  }

  // componentDidMount() {
  //   const { value } = this.state;
  //   if (value) {
  //     this.handleChange(value);
  //   }
  // }

  render() {
    const { value } = this.state;
    const { classes, labelId, ...rest } = this.props;

    return (
      <CheckboxGroup
        {...rest}
        value={value}
        className={classes.checkbox}
        onChange={this.handleChange}
      />
    );
  }
}

CheckboxOptionsInput.defaultProps = {
  name: '',
  classes: {},
  options: [],
  onBlur: () => {},
  onChange: () => {},
};

export default CheckboxOptionsInput;
