const sleep = async (msec: number) => {
  return new Promise(function (resolve: (value: unknown) => void) {
    setTimeout(function () {
      resolve("");
    }, msec);
  });
};

export { sleep };
