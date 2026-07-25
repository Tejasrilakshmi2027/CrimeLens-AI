export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const isValidPincode = (pincode: string): boolean => {
  const pincodeRegex = /^\d{6}$/;
  return pincodeRegex.test(pincode);
};

export const isValidBadgeNumber = (badgeNumber: string): boolean => {
  const badgeRegex = /^[A-Z]{2}\d{6}$/;
  return badgeRegex.test(badgeNumber);
};

export const isValidCaseNumber = (caseNumber: string): boolean => {
  const caseRegex = /^\d{4}\/\d{4}$/;
  return caseRegex.test(caseNumber);
};

export const isValidCrimeNumber = (crimeNumber: string): boolean => {
  const crimeRegex = /^CR\d{8}$/;
  return crimeRegex.test(crimeNumber);
};

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
};

export const isValidDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};
