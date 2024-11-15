import dayjs from "dayjs";

export const getDateTimeFormat = (date: string) => {
  if (!date) return "N/A";
  return dayjs(date).format("MMMM DD, YYYY HH:mm A");
};
