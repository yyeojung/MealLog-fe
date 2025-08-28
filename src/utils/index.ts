export const addComma = (value: number | string) => {
  if (value === null || value === undefined) {
    return "";
  }

  if (isNaN(Number(value))) {
    return value;
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calculateAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};
