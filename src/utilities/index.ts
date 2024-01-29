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
