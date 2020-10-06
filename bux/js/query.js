window.query = {
  shuffle: {
    obj: (array) => {
numbers = Object.keys(array)
    .map((key) => ({key, value: array[key]}))
    .sort((a, b) => b.key.localeCompare(a.key))
    .reduce((acc, e) => {
      acc[e.key] = e.value;
      return acc;
    }, {});
console.log(JSON.stringify(numbers));
    },
    arr: (a) => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  }
}