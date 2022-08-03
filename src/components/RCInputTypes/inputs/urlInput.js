import React from 'react';
import { Input, Select } from 'antd';
import BaseInputComponent from '../baseInput';

const { Option } = Select;

class UrlInput extends BaseInputComponent {
  constructor(props) {
    super(props);

    let protocol = 'http://';
    let domain = '.com';
    let value = '';
    if (typeof props.value === 'string') {
      const url = new URL(props.value);
      const { hostname, href } = url;
      protocol = `${url.protocol}//`;
      domain = hostname.slice(hostname.lastIndexOf('.'));
      value = href.slice(protocol.length);
    }

    this.state = {
      value,
      domain,
      protocol,
    };
  }

  handleChange = e => {
    const { onChange } = this.props;
    const { value } = e.target;

    this.setState(
      {
        value,
      },
      () => {
        const { protocol, value: hostname } = this.state;
        if (onChange) {
          onChange(`${protocol}${hostname}`);
        }
      }
    );
  };

  handleSelectChange = (value, key) => {
    const { onChange } = this.props;

    this.setState(
      {
        [key]: value,
      },
      () => {
        const { protocol, value: hostname } = this.state;
        if (onChange) {
          onChange(`${protocol}${hostname}`);
        }
      }
    );
  };

  handlePressEnter = e => {
    const { onPressEnter } = this.props;
    const { value } = e.target;

    this.setState(
      {
        value,
      },
      () => {
        const { protocol, value: hostname } = this.state;
        if (onPressEnter) {
          onPressEnter(`${protocol}${hostname}`);
        }
      }
    );
  };

  handleBlur = () => {
    const { onBlur } = this.props;
    const { protocol, value: hostname } = this.state;
    if (onBlur) {
      onBlur(`${protocol}${hostname}`);
    }
  };

  render() {
    const { classes, labelId, required, value: url, ...rest } = this.props;

    const { value, protocol } = this.state;
    const selectBefore = (
      <Select
        value={protocol}
        disabled={rest.disabled}
        defaultValue="http://"
        style={{ width: 90 }}
        onChange={val => this.handleSelectChange(val, 'protocol')}
      >
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
    );

    return (
      <Input
        {...rest}
        type="url"
        value={value}
        aria-labelledby={labelId}
        className={classes.input}
        addonBefore={selectBefore}
        required={required ? 'required' : undefined}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onPressEnter={this.handlePressEnter}
      />
    );
  }
}

UrlInput.defaultProps = {
  id: '',
  name: '',
  classes: {},
  placeholder: '',
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onPressEnter: () => {},
};

export default UrlInput;
