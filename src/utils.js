export const randomName = () =>
  Math.random()
    .toString(36)
    .substring(2, 15);
