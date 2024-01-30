export const calculateAge = (birthdayStr: string) => {
  const birthday = new Date(birthdayStr);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}

export const isNotFutureDate = (dateString: string) => {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Set the time part of both dates to 00:00:00 for accurate comparison
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Check if input date is not greater than today
  return inputDate <= today;
};

export const isValidISODateString = (dateString: string) => {
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JavaScript Date months are 0-indexed
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    // Check if the date is valid by comparing with the original parts
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
  }
  return false;
};

export const ssnRegex = /^(?!000|666|9\d\d)\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const stateRegex = /^[A-Z]{2}$/;
export const zipRegex = /^\d{5}(-\d{4})?$/;
