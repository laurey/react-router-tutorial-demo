import React from 'react';
import { Tag, Input, Icon, Tooltip } from 'antd';
import BaseInputComponent from '../baseInput';

class EditableTagInput extends BaseInputComponent {
  constructor(props) {
    super(props);

    this.state = {
      tags: props.value || [],
      inputValue: props.inputValue || '',
      inputVisible: props.inputVisible || false,
    };
  }

  handleClose = removedTag => {
    const { onChange } = this.props;
    const { tags: selected } = this.state;
    const tags = selected.filter(tag => tag !== removedTag);
    this.setState({ tags }, () => {
      if (onChange) {
        onChange(tags);
      }
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { onChange } = this.props;
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState(
      {
        tags,
        inputValue: '',
        inputVisible: false,
      },
      () => {
        if (onChange) {
          onChange(tags);
        }
      }
    );
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleChange = (tag, checked) => {
    const { onChange } = this.props;
    const { value } = this.state;
    const selected = checked ? [...value, tag] : value.filter(t => t !== tag);
    this.setState({ value: selected }, () => {
      if (onChange) {
        onChange(selected);
      }
    });
  };

  render() {
    const { tags, inputVisible, inputValue } = this.state;

    return (
      <>
        {tags.map(tag => {
          const isLongTag = tag.length > 15;
          const tagTxt = isLongTag ? `${tag.slice(0, 15)}...` : tag;
          const tagItem = (
            <Tag
              closable
              key={tag}
              className="editable-tag-view"
              onClose={() => this.handleClose(tag)}
            >
              {tagTxt}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagItem}
            </Tooltip>
          ) : (
            tagItem
          );
        })}
        {inputVisible ? (
          <Input
            type="text"
            size="small"
            value={inputValue}
            style={{ width: 80 }}
            ref={this.saveInputRef}
            onBlur={this.handleInputConfirm}
            onChange={this.handleInputChange}
            onPressEnter={this.handleInputConfirm}
          />
        ) : (
          <Tag
            style={{ background: '#fff', borderStyle: 'dashed' }}
            className="add-tag-btn"
            onClick={this.showInput}
          >
            <Icon type="plus" /> Add
          </Tag>
        )}
      </>
    );
  }
}

EditableTagInput.defaultProps = {
  options: [],
  onClose: () => {},
  onChange: () => {},
};

export default EditableTagInput;
