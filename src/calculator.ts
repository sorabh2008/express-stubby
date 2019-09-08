export default class Calculator {
  constructor() {}

  public add(values: any[]) {
    let sum = 0;
    values.forEach(val => {
      try {
        sum += val;
      } catch (e) {
        // do nothing
      }
    });
    return sum;
  }
}
