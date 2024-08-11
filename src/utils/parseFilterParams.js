const parseName = (name) => {
  const isString = typeof name === 'string';
  if (!isString) {
    return;
  }
  return name;
};

const parseType = (type) => {
  if (typeof type !== 'string') return;

  const allowedTypes = ['work', 'home', 'personal'];
  if (allowedTypes.includes(type)) {
    return type;
  }
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') {
    return;
  }
  if (isFavourite === 'true') {
    return true;
  }
  if (isFavourite === 'false') {
    return false;
  }
  return;
};

export const parseFilterParams = (query) => {
  const { name, type, isFavourite } = query;

  const parsedName = parseName(name);
  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    name: parsedName,
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
