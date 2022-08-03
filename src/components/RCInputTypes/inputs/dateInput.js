import React from 'react';
import { DatePicker } from 'antd';
import BaseInputComponent from '../baseInput';

class DateInput extends BaseInputComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      format: props.format,
    };
  }

  handleChange = (date, dateString) => {
    const { onChange } = this.props;

    this.setState(
      {
        value: date,
      },
      () => {
        if (onChange) {
          onChange(dateString);
        }
      }
    );
  };

  render() {
    const { classes, labelId, ...rest } = this.props;
    const { value, format } = this.state;

    return (
      <DatePicker
        {...rest}
        value={value}
        format={format}
        aria-labelledby={labelId}
        onChange={this.handleChange}
      />
    );
  }
}

DateInput.defaultProps = {
  showTime: false,
  format: 'YYYY-MM-DD',
  placeholder: '请选择日期',
  onChange: () => {},
};

export default DateInput;
