const Validation = {
  category: (text, categories) => {
    let validate = /^([a-zA-Z_-]+)$/.test(text) && text !== "all";
    if (!validate) {
      return false;
    }

    // Verify that the category name hasnt already been taken.
    validate =
      categories
        .map(e => e.category.toLowerCase())
        .filter(e => e === text.toLowerCase()).length > 0;
    return !validate; // if true, then an existing category with same name exists.
  },

  title: text => {
    return /^([a-zA-Z _-]+)$/.test(text);
  },

  description: text => {
    return text !== null && text !== undefined && text.trim().length > 0;
  },

  link: text => {
    return text.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    ) === null
      ? false
      : true;
  }
};

export default Validation;
