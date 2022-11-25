const buildQuery = (values) => {
  const mappedValues = Object.keys(values).map((key) => {
    if (values[key]) {
      return `${key}=${values[key]}`;
    }
  });

  return mappedValues[0] ? `?${mappedValues.join("&")}` : "";
};

export default buildQuery;
