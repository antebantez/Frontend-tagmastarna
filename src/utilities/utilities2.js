const buildQuery2 = (values) => {
  const mappedValues2 = Object.keys(values).map((key) => {
    if (values[key]) {
      return `${key}=${values[key]}`;
    }
  });

  return mappedValues2[0] ? `?${mappedValues2.join("&")}` : "";
};

export default buildQuery2;
