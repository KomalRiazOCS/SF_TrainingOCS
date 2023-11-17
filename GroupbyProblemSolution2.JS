const array = [
  { id: 1, name: "Bilal", city: "Lahore" },
  { id: 2, name: "Bilal", city: "Lahore" },
  { id: 3, name: "Hafsa", city: "Karachi" },
  { id: 4, name: "Rehan", city: "Lahore" },
  { id: 5, name: "Saqib", city: "Karachi" },
  { id: 6, name: "Farhan", city: "Islamabad" }
];

const groupByProperty = (array, key) => {
  const groupedObject = {};

  for (let i = 0; i < array.length; i++) {
    const entry = array[i];
    const groupByKey = entry[key];

    if (!groupedObject[groupByKey]) {
      groupedObject[groupByKey] = [];
    }

    groupedObject[groupByKey].push(entry);
  }

  return groupedObject;
};

console.log(groupByProperty(array, 'city'));
