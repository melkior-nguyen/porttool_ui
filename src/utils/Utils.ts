export function formatDate(date: any, hasHour?: boolean) {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (hasHour) {
    let hour = d.getHours().toString();
    let minute = d.getMinutes().toString();
    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;
    return `${[year, month, day].join("-").trim()} ${[hour, minute]
      .join(":")
      .trim()}`;
  } else {
    return [year, month, day].join("-").trim();
  }
}
