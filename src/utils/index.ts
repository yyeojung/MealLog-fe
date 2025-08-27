export const addComma = (value: number | string) => {
  if (value === null || value === undefined) {
    return "";
  }

  if (isNaN(Number(value))) {
    return value;
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
