export default class Calculator {
  constructor() {}

  public add(values: any[]) {
    let sum = 0;
    values.forEach(val => {
      try {
        if (!Number.isNaN(val)) {
          sum += Number.parseInt(val);
        }
      } catch (e) {
        // do nothing
      }
    });
    return sum;
  }
}
