//"a<b OR (c==d AND e!=f)"
const arr = ["OR", ["<", "a", "b"], ["AND", ["==", "c", "d"], ["!=", "e", "f"]]];
  

function arrayToExpression(arr) {
    if (typeof arr === 'string') 
    {
        return arr;
    } 
    else 
    {
        const operator = arr[0];
        const operands = [];

        for (let i = 1; i < arr.length; i++) 
        {
            operands.push(arrayToExpression(arr[i]));
        }

        if (operator === "OR") 
            return operands.join(" OR ");            
        else if (operator === "AND") 
            return "(" + operands.join(" AND ") + ")";
        else 
            return operands.join(" " + operator + " ");

    }
}
    
const result = convertToExpression(arr);
console.log(result);