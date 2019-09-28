const Validation = {
  category: text => {
    return /^([a-zA-Z_-]+)$/.test(text) && text !== "all";
  },

  title: text => {
    return /^([a-zA-Z _-]+)$/.test(text);
  },

  description: text => {
    return text !== null && text !== undefined && text.trim().length > 0;
  }
};

export default Validation;
