export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const toLocalISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getMonthCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Convert Sunday(0) → 6, Monday(1) → 0
  const startOffset = (firstDay.getDay() + 6) % 7;
    const todayISO = toLocalISODate(new Date());

  const days = [];

  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }

  for (let d = 1; d <= lastDate; d++) {
    const date = new Date(year, month, d);
    const iso = toLocalISODate(date)

    days.push({
      day: d,
      date: iso,
      isToday: iso === todayISO
    });
  }

  return days;
};
