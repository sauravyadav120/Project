import { useQueryClient } from "@tanstack/react-query";
import bcrypt from "bcryptjs";
export const giveHashPassword = (password) => {
 const hash =  bcrypt.hash(password,10)
  return hash;
};
// utils.js
export const formatDate = (startDate, endDate) => {
  const start = new Date(startDate);

  if (!endDate || endDate === "") {
    const current = new Date();
    const startYear = start.getFullYear();
    const startMonth = start.toLocaleString('default', { month: 'long' });
    const endYear = current.getFullYear();
    const endMonth = current.toLocaleString('default', { month: 'long' });

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${startMonth} ${startYear}`;
      } else {
        return `${startMonth} - ${endMonth} ${startYear}`;
      }
    } else {
      return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
  } else {
    const end = new Date(endDate);

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const startMonth = start.toLocaleString('default', { month: 'long' });
    const endMonth = end.toLocaleString('default', { month: 'long' });

    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${startMonth} ${startYear}`;
      } else {
        return `${startMonth} - ${endMonth} ${startYear}`;
      }
    } else {
      return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    }
  }
};



export const formatDuration = (yearsMonths) => {
  if(yearsMonths?.split("-")[1]?.includes("NaN")) {
    const niceFormat = yearsMonths.split("-")[0]
    return `${niceFormat} - Present`; // You can customize the formatting here if needed
  }
  return yearsMonths
};

export const calculateDuration = (startDate) => {
  const start = new Date(startDate);
  const current = new Date();

  const years = current.getFullYear() - start.getFullYear();
  const months = current.getMonth() - start.getMonth();

  if (months < 0) {
    return `${years - 1} years, ${months + 12} months`;
  } else {
    return `${years} years, ${months} months`;
  }
};


