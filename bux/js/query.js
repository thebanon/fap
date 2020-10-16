window.query = {
  shuffle: {
    obj: (numbers) => {
      
      numbers = query.shuffle.arr(Object.values(numbers));
      console.log(numbers);

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