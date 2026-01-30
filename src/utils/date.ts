export const getToday = () =>
  new Date().toISOString().split("T")[0];

export const getCurrentWeek = () => {
  const today = new Date();
  const day = today.getDay() || 7; // Sunday = 7
  today.setDate(today.getDate() - day + 1);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label: d.toLocaleDateString("en-IN", { weekday: "short" }),
      date: d.toISOString().split("T")[0],
      isToday: d.toISOString().split("T")[0] === getToday(),
    };
  });
};
