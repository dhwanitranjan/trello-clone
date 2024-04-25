export const dateNTimeFormatter = (dateNTime: string) => {
  if (dateNTime === "") return;

  const date = new Date(dateNTime);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = Number(hours) >= 12 ? "PM" : "AM";

  return {
    date: `${day}/${month}/${year}`,
    time: `${Number(hours) % 12}:${minutes}${ampm}`,
  };
};
