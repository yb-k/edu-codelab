export default () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max) > max / 2
      ? Math.floor(Math.random() * max)
      : undefined;
  }
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "홍길동",
        age: getRandomInt(100),
      });
    }, 500);
  });
};
