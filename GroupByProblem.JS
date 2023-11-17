const array = [
    { id: 1, name: "Bilal", city: "Lahore" },
    { id: 2, name: "Bilal", city: "Lahore" },
    { id: 3, name: "Hafsa", city: "Karachi" },
    { id: 4, name: "Rehan", city: "Lahore" },
    { id: 5, name: "Saqib", city: "Karachi" },
    { id: 6, name: "Farhan", city: "Islamabad" }
  ];
  
  function extractCity(obj) {
    return obj.city;
  }
  function extractName(obj) {
    return obj.name;
  }
  function extractId(obj) {
    return obj.id;
  }
  
  function groupByProperty(array,key) {
    let result; 
    if(key=='city')
    {
        result = Object.groupBy(array, extractCity);
    }
    else if(key=='name')
    {
        result = Object.groupBy(array, extractName);
    }
    else
    {
        result = Object.groupBy(array, extractId);
    }
    
    return result;
  }
  
  console.log(groupByProperty(array,'city'));