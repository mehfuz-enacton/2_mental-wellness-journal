export const formatDateDDMMYYYY = (dateStr: string) => {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
