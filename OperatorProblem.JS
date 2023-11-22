function arrayToExpression(arr) {    
    if(Array.isArray(arr))
    {
        
        const operator = arr[0];
        if (!(validOperators.includes(operator))) { //Incase, the operator is invalid
          throw new Error("Invalid Input!! Must enter a valid operator");

        }
        const operands = [];

        for (let i = 1; i < arr.length; i++) 
        {
            operands.push(arrayToExpression(arr[i]));
        }

        if (operator === "NOT") 
        {
            if(operands.length!=1) //Incase, NOT have more than one operand
            {
                throw new Error("Invalid expression!! NOT operator can't take more than one operand");               
            }           
            return "( NOT " + operands + ")";            
        }            
        else 
            return "(" + operands.join(" " + operator + " ") + ")";
    }
    else{
        return arr;
    }    
}

const arr = ["OR", ["<", "a", "b"], ["AND", ["==", "c", "d"], ["!=", "e", "f"]]];
const validOperators = ["AND", "OR", "NOT", "<", ">",">=","<=", "!=", "==", "+", "-", "/", "*"];
 
const result = arrayToExpression(arr);
console.log(result); //"a<b OR (c==d AND e!=f)"
