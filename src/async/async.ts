

function save(callback: (message: string) => (message: string) => (message: string) => string) {
  setTimeout(() => {
    const call = callback('Data');
    setTimeout(() => {
      const call2 = call('Data1');
      setTimeout(() => {
        const call3 = call2('Data2');
        console.log(call3);
        return call3;
      }, 3000);
    }, 1500);
  }, 500);
}

function main() {
  save(function (message: string) {
    console.log('Message 0', message);
    return function (message1: string) {
      console.log('MESSAGE 1', message1, message);
      return function (message2: string) {
        console.log('MESSAGE 2', message2, message1, message);
        return message2 + ' Six';
      }
    }
  });
}

main();