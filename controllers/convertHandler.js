/*
*
*
*       Complete the handler logic below
*       
*       
*/
const unitsAllowed = ["gal", "L", "lbs", "kg", "mi", "km"];
const unitsAllowedSpellOut = ["gallon(s)", "liter(s)", "pound(s)", "kilogram(s)", "mile(s)", "kilometer(s)"];
const math = require("mathjs");

function ConvertHandler() {

  this.getNum = function(input) {
    const regex = /[a-zA-Z]+/;
    var inputDecoded = encodeURIComponent(input).replace(/\%20/g, "+");
    var result = inputDecoded.slice(0, inputDecoded.search(regex)).trim();
    return result=="" ? 1 : parseFloat(math.evaluate(result));
  };
  
  this.getUnit = function(input) {
    const regex = /[a-zA-Z]+/;
    var result = input.slice(input.search(regex)).trim();
    if (unitsAllowed.includes(result))
      return result;
    return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {    
    var result;
    var temp = unitsAllowed.indexOf(initUnit);
    if (temp != -1){
      if (temp % 2 == 0) {
        result = unitsAllowed[temp+ 1];
      } else result = unitsAllowed[temp - 1];
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    if (unitsAllowed.indexOf(unit) != -1)
      result = unitsAllowedSpellOut[unitsAllowed.indexOf(unit)];    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    switch(initUnit){
      case "gal" : 
        result = initNum*galToL;
        break;
      case "L" :
        result = initNum/galToL;
        break;
      case "lbs" : 
        result = initNum*lbsToKg;
        break;
      case "kg" :
        result = initNum/lbsToKg;
      case "mi" : 
        result = initNum*miToKm;
        break;
      case "km" :
        result = initNum/miToKm;     
    }
    return result ? result.toFixed(5) : null;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
