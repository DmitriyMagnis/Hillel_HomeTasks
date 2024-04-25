const company = {
  sales: [
    { name: 'John', salary: 1000 },
    { name: 'John2', salary: 1500 },
  ],
  development: {
    web2: {
      web3: {
        dep: [
          { name: 'John', salary: 1000 },
          { name: 'John', salary: 1500 },
        ],
      },
      dep: [
        { name: 'John', salary: 1000 },
        { name: 'John', salary: 1500 },
      ],
    },
    web: [
      { name: 'John', salary: 1000 },
      { name: 'John', salary: 1500 },
    ],
    internals: [
      { name: 'John', salary: 1000 },
      { name: 'John', salary: 1500 },
    ],
  },
};

const calcSalaries = obj => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    let salariesSum = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const department = obj[key];
        salariesSum += calcSalaries(department);
      }
    }
    return salariesSum;
  }
  if (Array.isArray(obj)) {
    const salariesSum = obj.reduce((sum, { salary }) => sum + salary, 0);
    return salariesSum;
  }
  return 0;
};

console.log(calcSalaries(company));
