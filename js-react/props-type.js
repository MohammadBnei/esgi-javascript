


   function type_check_v1(variable, typeToTest) {
    if (typeof typeToTest !== "string") return false;
    if (typeof toTest !== "object") {
      return typeof toTest === typeToTest;
    } else {
      if (typeToTest === "null" && toTest === null) return true;
      if (typeToTest === "array" && Array.isArray(toTest)) return true;
      if (typeToTest === "object" && !Array.isArray(toTest) && toTest !== null)
        return true;
    }
    return false;
  }
  

  function type_check_v2(variable, typeToTest) {
    // Si la config n'est pas un objet on renvoi a type_check_v1
    if (!type_check_v1(typeToTest, "object")) {
      return type_check_v1(variable, typeToTest);
    }
  
    if (typeToTest.hasOwnProperty("type")) {
      if (
        !type_check_v1(variable, typeToTest.type) ||
        !type_check_v1(typeToTest.type, "string")
      ) {
        // bad type
        return false;
      }
    }
    if (typeToTest.hasOwnProperty("value")) {
      if (
        toTest !== typeToTest.value ||
        !type_check_v1(typeToTest.value, "string")
      ) {
        // bad value
        return false;
      }
    }
    if (typeToTest.hasOwnProperty("enum")) {
      if (!type_check_v1(typeToTest.enum, "array")) return false;
      let i = 0,
        valid = false;
      while (i < typeToTest.enum.length && !valid) {
        valid = toTest === typeToTest.enum[i];
        i++;
      }
      return valid;
    }
    return true;
  }


    
   export function type_check(variable, typeToTest) {
    // Si la config n'est pas un objet on renvoi a type_check_v1
    if (!type_check_v1(typeToTest, "object")) {
      return type_check_v1(variable, typeToTest);
    }
    if (typeToTest.hasOwnProperty("props")) {
        if (type_check_v1(typeToTest.props, "array")) {
            bool = true;
            return bool;

        }
        else if (type_check_v1(typeToTest.props, "object")) {


        }
        else {
            // props n'est ni objet ni tableau donc return false
            return false;
        }
   }  
}
    export default {  };