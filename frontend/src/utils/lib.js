export function getReadableDate(dt) {
  if (!dt) return null;

  const date = new Date(dt);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
