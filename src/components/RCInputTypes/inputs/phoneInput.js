import React from 'react';
import { Input } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { PhoneNumberUtil, PhoneNumberFormat as PNF } from 'google-libphonenumber';
import IntlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/js/utils';
import 'intl-tel-input/build/css/intlTelInput.min.css';
import BaseInputComponent from '../baseInput';

const formatNumber = (number, countryCode, format = PNF.INTERNATIONAL) => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const numberObj = phoneUtil.parseAndKeepRawInput(number, countryCode);
    if (phoneUtil.isPossibleNumber(numberObj)) {
      return phoneUtil.format(numberObj, format);
    }

    return number;
  } catch (e) {
    return number;
  }
};

class PhoneInput extends BaseInputComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.iti = null;
  }

  componentDidMount() {
    const { preferredCountries = ['cn', 'us', 'ca', 'gb', 'au'], dropdownContainer } = this.props;
    const { input } = this.inputRef;
    this.iti = IntlTelInput(input, {
      // dropdownContainer: document.body,
      dropdownContainer,
      preferredCountries,
    });

    input.addEventListener('countrychange', this.handleCountryChange);

    Array.prototype.forEach.call(document.querySelectorAll('.ant-modal-wrap'), el => {
      el.addEventListener('scroll', this.handleScroll);
    });
    this.handleCountryChange();
  }

  componentWillUnmount() {
    this.iti.destroy();
    this.inputRef.input.removeEventListener('countrychange', this.handleCountryChange);
    Array.prototype.forEach.call(document.querySelectorAll('.ant-modal-wrap'), el => {
      el.removeEventListener('scroll', this.handleScroll);
    });
  }

  saveInputRef = input => {
    this.inputRef = input;
  };

  handleChange = () => {
    const { onChange } = this.props;
    const number = this.iti.getNumber();
    const country = this.iti.getSelectedCountryData().iso2.toUpperCase();
    const phone = formatNumber(number, country);

    this.setState(
      {
        value: phone,
      },
      () => {
        if (onChange) {
          onChange(phone);
        }
      }
    );
  };

  handleBlur = () => {
    const { value } = this.state;
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(value);
    }
  };

  handleCountryChange = () => {
    const country = this.iti.getSelectedCountryData().iso2;
    this.iti.setCountry(country);
    this.handleChange();
  };

  @Debounce(400)
  handleScroll = () => {
    const e = document.createEvent('Event');
    e.initEvent('scroll', true, true);
    window.dispatchEvent(e);
  };

  render() {
    const { classes, labelId, required, preferredCountries, ...rest } = this.props;
    const { value } = this.state;

    return (
      <Input
        {...rest}
        value={value}
        aria-labelledby={labelId}
        className={classes.input}
        required={required ? 'required' : undefined}
        ref={this.saveInputRef}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
    );
  }
}

PhoneInput.defaultProps = {
  id: '',
  name: '',
  classes: {},
  maxLength: 20,
  placeholder: '',
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
};

export default PhoneInput;
