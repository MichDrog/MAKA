/*:
*@plugindesc Create and manipulate variables that hold more than one value (aka object type variables)
*@author MAKAIROSI
*
*@param empty
*@desc empty
*@default empty
*
*@help
*================================================================================
*===========================OBJECT VARIABLES=====================================
*================================================================================
*
*Have you ever grew tired of having to create new variables for each custom
*attribute you want a single character to have? Now you can put them all into
*one variable, that can support up to 26 different properties!
*
*================================================================================
*===========================TEXT CODE============================================
*================================================================================
*
*Whenever you want to show the value of a property of a variable, type
*\VOBJ[x:y] into the text.
*
*x = Variable ID
*y = Property number (1 to 26)
*
*Example: \VOBJ[1:2] will show the value of the second property
*of Variable 1.
*
*--------------------------------------------------------------------------------
*IMPORTANT! Properties that don't have a value will return "undefined". 
*--------------------------------------------------------------------------------
*
*================================================================================
*===========================SCRIPT CALLS=========================================
*================================================================================
*
*MAKA.ObjVar.setupVar(x);
*
*Enables a variable to hold properties.
*
*x = The ID of the Variable you want to turn into a variable with properties
*(aka object type variable)
*
*--------------------------------------------------------------------------------
*
*MAKA.ObjVar.setProp(x, y, z);
*
*Sets a new value to a property of a variable.
*
*x = The ID of the variable whose property's value you want to change
*y = The property of the variable whose value you want to change
*z = The value you want to set to the property of the variable.
*
*--------------------------------------------------------------------------------
*IMPORTANT! Always remember to setup the variable whose properties
*you want to set, otherwise it won't be able to hold them.
*
*IMPORTANT! The properties of the variables are named after lowercase
*letters of the English alphabet. To call such a value inside a script
*you need to type $gameVariables.value(x).y; where 'x' is the ID and
*'y' is the property in its corresponding lowercase letter. 1=a,2=b etc.
*--------------------------------------------------------------------------------
*
*Example:
*MAKA.ObjVar.setupVar(1); 
*->Variable 1 was turned into an object
*
*MAKA.ObjVar.setProp(1, 1, 4); 
*->Property 'a' now has the value 4
*
*MAKA.ObjVar.setProp(1, 2, $gameVariables.value(1).a); 
*->Property 'b' now has the value of property 'a'
*
*MAKA.ObjVar.setProp(1, 3, true);
*->Property 'c' now has the true boolean expression
*
*MAKA.ObjVar.setProp(1, 4, "Mark");
*->Property 'd' now has the string value "Mark"
*
*Open text window and type: 
*\VOBJ[1:1]
*\VOBJ[1:2]
*\VOBJ[1:3]
*\VOBJ[1:4]
*
*This will result in the following text:
*4
*4
*true
*Mark
*
*================================================================================
*===========================CREDITS==============================================
*================================================================================
*
*This plugin would not be possible without the help of Caethyril and the
*amazing rpgmaker community.
*
*================================================================================
*/
//plugin starts here

var MAKA = MAKA || {};
MAKA.ObjVar = MAKA.ObjVar || {};

(function(){
  

  MAKA.ObjVar.param = PluginManager.parameters("MAKAIROSI_objectVariables");   

    MAKA.ObjVar.setupVar = function(x){

      x = Number(x);

      $gameVariables.setValue(x, {});//create an empty object variable whose ID is the ID defined in the function parameters 

};



MAKA.ObjVar.setProp = function(x, y, z) {
    x = Number(x); //variable ID
    y = Number(y); //property number (1 to 26) = (a to z)

    if (x<1 || y<1 || y>26){

      alert("Warning, the script call 'set.property' is trying to create a property number or variable ID that doesn't exist!");
      alert("Nothing was created.");

    } else {

    //z = Number(z); //value given

    y = String.fromCharCode(64 + y%26); //property number becomes character [a to z]
    
    y = y.toLowerCase(); //get 'a' instead of 'A'
    
    $gameVariables.value(x)["" + y + ""] = z;
//This is the part that i can't get to work
/*
    if (typeof $gameVariables.value(x)["" + y + ""] === "undefined"){
       alert("Oops! Something went wrong with the value " + z + " you gave to variable " + x + ", property " + y +"");
       alert("The property is now set as 'undefined'");
    };
*/
    }; 
  };
  
  
  (function(alias) {
    'use strict';
    
      Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = alias.call(this, text);
        text = text.replace(/\x1bVOBJ\[(\d+):(\d+)\]/gi, function() {
          var x = parseInt(arguments[1]);
          var y = parseInt(arguments[2]);
    
          y = String.fromCharCode(64 + y%26).toLowerCase();
    
    return $gameVariables.value(x)[""+y+""];
    
    
        }.bind(this));
    
        return text;
      };
    })(Window_Base.prototype.convertEscapeCharacters);
  })(MAKA.ObjVar);
