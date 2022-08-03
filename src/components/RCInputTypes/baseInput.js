/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';

class BaseInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = value => {
    const { onChange } = this.props;
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
    return null;
  }
}

BaseInputComponent.defaultProps = {
  classes: {},
  disabled: false,
  onChange: () => {},
};

export default BaseInputComponent;
