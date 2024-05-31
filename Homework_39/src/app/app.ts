interface IA {
  name: string;
}
const func = (a: IA) => {
  console.log(a);
  console.log('as');
};

export { func };
