const stringParser = (template = '', params = {}) => {
  const characters = template.split('');

  let buffer = '';
  let parsedTemplate = '';
  let collecting = false;

  for (let i = 0; i < characters.length; i += 1) {
    const currentChar = characters[i];

    if (!collecting && currentChar !== '{' && currentChar !== '}') {
      parsedTemplate += currentChar;
      continue;
    }

    if (currentChar === '{') {
      collecting = true;
    }

    if (currentChar !== '{' && currentChar !== '}') {
      buffer += currentChar;
    }

    if (currentChar === '}') {
      let value = '';
      if (typeof params[buffer] !== 'undefined') {
        value = params[buffer];
      }

      parsedTemplate += value;

      collecting = false;
      buffer = '';
    }
  }

  return parsedTemplate;
};

export default stringParser;
