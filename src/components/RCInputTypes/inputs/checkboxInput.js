import React from 'react';
import { Checkbox } from 'antd';
import BaseInputComponent from '../baseInput';

class CheckboxInput extends BaseInputComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      checked: props.value || props.defaultChecked,
    };
  }

  componentDidMount() {
    const { value } = this.state;
    if (value) {
      this.handleChange();
    }
  }

  handleChange = e => {
    const { checked } = this.state;
    const { onChange } = this.props;

    if (e) {
      this.setState(
        {
          value: !checked,
          checked: !checked,
        },
        () => {
          const { checked: isChecked } = this.state;
          onChange(isChecked);
        }
      );
    } else {
      onChange(checked);
    }
  };

  render() {
    const { checked, value } = this.state;
    const { classes, labelId, text, ...rest } = this.props;

    return (
      <Checkbox
        {...rest}
        value={value}
        checked={checked}
        defaultChecked={checked}
        aria-labelledby={labelId}
        className={classes.checkbox}
        onChange={this.handleChange}
      >
        {text}
      </Checkbox>
    );
  }
}

CheckboxInput.defaultProps = {
  name: '',
  text: '',
  classes: {},
  defaultChecked: false,
  onBlur: () => {},
  onChange: () => {},
};

export default CheckboxInput;
