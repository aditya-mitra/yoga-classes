export function getReadableDate(dt) {
  if (!dt) return null;

  const date = new Date(dt);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export function getReadableTime(dt) {
  if (!dt) return null;

  return dt.split('.')[0];
}
