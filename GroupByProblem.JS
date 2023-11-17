const array = [
  { id: 1, name: "Bilal", city: "Lahore" },
  { id: 2, name: "Bilal", city: "Lahore" },
  { id: 3, name: "Hafsa", city: "Karachi" },
  { id: 4, name: "Rehan", city: "Lahore" },
  { id: 5, name: "Saqib", city: "Karachi" },
  { id: 6, name: "Farhan", city: "Islamabad" }
];

const groupByProperty = (array , key) =>
{
  return array.reduce((acc,entry) =>
  {
    let groupBykey = entry[key];
    if(!acc[groupBykey]){
      acc[groupBykey]=[];
    }

    acc[groupBykey].push(entry);
    return acc;
  } , {}
  )
};

console.log(groupByProperty(array,'city'));