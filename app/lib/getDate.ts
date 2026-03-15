export const getDate = (value?: string, displayTime = false) => {
  if (!value) return "";

  const date = new Date(value);

  return date.toLocaleString("th-TH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: displayTime ? "2-digit" : undefined,
    minute: displayTime ? "2-digit" : undefined,
  });
};
