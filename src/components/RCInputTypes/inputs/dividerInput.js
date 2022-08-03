import React from 'react';
import { Divider } from 'antd';
import BaseInputComponent from '../baseInput';

class DividerInput extends BaseInputComponent {
  render() {
    const { classes, labelId, ...rest } = this.props;

    return <Divider {...rest} aria-labelledby={labelId} className={classes.divider} />;
  }
}

DividerInput.defaultProps = {
  dashed: false,
  type: 'horizontal',
  orientation: 'center',
  classes: {},
};

export default DividerInput;
