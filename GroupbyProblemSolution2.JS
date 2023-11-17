const array = [
    { id: 1, name: "Bilal", city: "Lahore" },
    { id: 2, name: "Bilal", city: "Lahore" },
    { id: 3, name: "Hafsa", city: "Karachi" },
    { id: 4, name: "Rehan", city: "Lahore" },
    { id: 5, name: "Saqib", city: "Karachi" },
    { id: 6, name: "Farhan", city: "Islamabad" }
  ];
 
 const groupByProperty = (array, key) => {
   const groupedMap = new Map();
 
   array.forEach((entry) => {
     const groupByKey = entry[key];
     
     if (!groupedMap.has(groupByKey)) {
       groupedMap.set(groupByKey, []);
     }
 
     let tempMap=groupedMap.get(groupByKey);
     tempMap.push(entry);
   });
 
   const groupedObject= {};
   groupedMap.forEach((value, key) => {
     groupedObject[key] = value;
   });
 
   return groupedObject;
 };
 
 console.log(groupByProperty(array, 'city'));