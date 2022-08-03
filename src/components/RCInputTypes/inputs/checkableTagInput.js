import React from 'react';
import { Tag } from 'antd';
import BaseInputComponent from '../baseInput';

const { CheckableTag } = Tag;

class CheckableTagInput extends BaseInputComponent {
  handleTagChange = (tag, checked) => {
    const { value } = this.state;
    const selected = checked ? [...value, tag] : value.filter(t => t !== tag);
    this.handleChange(selected);
  };

  render() {
    const { value } = this.state;
    const { options } = this.props;

    return (
      <>
        {options.map(tag => (
          <CheckableTag
            key={tag.key}
            checked={value.indexOf(tag.key) > -1}
            onChange={checked => this.handleTagChange(tag.key, checked)}
          >
            {tag.text}
          </CheckableTag>
        ))}
      </>
    );
  }
}

CheckableTagInput.defaultProps = {
  options: [],
  onClose: () => {},
  // onChange: () => {},
};

export default CheckableTagInput;
