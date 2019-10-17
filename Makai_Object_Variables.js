/*:
*@plugindesc Create and manipulate variables that hold more than one value (aka object type variables)
*@author Makai Rosi
*
*@param Store Variable Names
*@type boolean
*@on YES
*@off NO
*@desc Are you planning on calling variables by name?
*YES - true     NO - false
*@default true
*
*@help
*============================================================================
*                                 INTRODUCTION                              
*============================================================================
*
*Have you ever grown tired of having to create new variables for each custom
*attribute you want a single character to have? Now you can put them all into
*one variable, and call them by their names!
*
*============================================================================
*                                  PARAMETER                                 
*============================================================================
*
*Store Variable Names: 
*
*This means that the name that you gave the variable will be stored in an
*array so that you can call it by name in the text code. The reason it's
*optional is because the names of the variables turned into objects will
*have to be unique to be called by name. On the other hand, if you leave
*this on and keep on calling them by their IDs, the only problem is that
*you will end up with a useless array filled with names and IDs.
*
*I personally prefer to have this on, since it's easier to remember 
*mark:height and suzan:job than 116:height and 349:job.
*
*============================================================================
*                                  TEXT CODE                                 
*============================================================================
*
*\VOBJ[x:y]
*
*x = Variable ID or variable_name (the one you gave it!)
*(If you want to use names, remember to turn the parameter on!)
*
*y = the_property's_name
*
*Examples: 
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*\VOBJ[1:2] will show the value of Variable 1, property "2".
*
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*\VOBJ[mark:2] will show the value of the Variable you have named 
*              "mark"(without the quotes), property "2".
*
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*\VOBJ[1:height] will show the value of Variable 1, property "height".
*
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*\VOBJ[mark:height] will show the value of the Variable named 
*                   "mark"(without the quotes), property "height".
*
*----------------------------------------------------------------------------
*IMPORTANT! Properties that don't have a value will return "undefined". 
*----------------------------------------------------------------------------
*
*============================================================================
*                                 SCRIPT CALL                               
*============================================================================
*
*maka.objVar.setProp(x, y, z);
*
*Sets a new value to a property of a variable.
*
*For -X-
*x = The ID of the variable whose property's value you want to set or 
*    change. If the parameter is ON, the name and ID of the variable will 
*    be stored for future use.
*
*For -Y-
*y = The property of the variable whose value you want to set or change. 
*    If the property doesn't exist, it will be created. Remember, when
*    typing a name for the property it always has to be in quotes!
*
*For -Z-
*z = The value you want to set to the property of the variable. The value
*    can be anything (number, string, boolean, etc.), even the value of a
*    property of another object variable.
*
*----------------------------------------------------------------------------
*
*Examples:
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*maka.objVar.setProp(1, 1, 4); 
*-
*->Property 'a' now holds the value 4
*->You can show it by typing \VOBJ[1:1]
*
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*(Parameter ON, Variable Named "Mark" by the user:)
*
*maka.objVar.setProp(1, 2, $gameVariables.value(1).a); 
*-
*->Property 'b' now holds the value of property 'a'
*->You can show it by typing \VOBJ[Mark:1]
*
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*maka.objVar.setProp(1, "three", true);
*-
*->Property 'three' now holds the true boolean expression
*->You can show it by typing \VOBJ[1:three]
*
*=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
*(Parameter ON, Variable Named "Suzan" by the user:)
*
*maka.objVar.setProp(1, "job", "blacksmith");
*-
*->Property 'job' now holds the string "blacksmith"
*->You can show it by typing \VOBJ[Suzan:job]
*
*============================================================================
*                                  CREDITS                                   
*============================================================================
*
*This plugin would not be possible without the help of Caethyril and the
*amazing rpgmaker community.
*
*============================================================================
*/
//plugin starts here

var maka = maka || {};
maka.objVar = maka.objVar || {};

(function(){ 

  maka.parameters = PluginManager.parameters('Makai_Object_Variables');
  maka.param = maka.param || {};
  
  maka.param.storeName = eval(String(maka.parameters['Store Variable Names']));
  
  var variableNames = variableNames || [];
  
  maka.objVar.setProp = function(x, y, z) {
  
      x = Number(x); //variable ID
      y; //name number of property
      z; //value to be given
      
      if (x<1 || x>9999){ //check if the id given is valid
  
        alert("Warning, the script call 'setProp' is trying to create an object out of a variable ID that doesn't exist!");
        alert("Remember, Variable IDs in RMMV can only by integers from 1 to 9999");
        alert("Nothing was created.");
  
      } else {
  
       if((typeof $gameVariables.value(x) === 'object') == false){

           $gameVariables.setValue(x, {}); 

       }; //If the variable isn't an object, create it
       
       if (maka.param.storeName == true){
                
                if(variableNames.length>0){

                    var i;
                    for (i=0; i<variableNames.length; i++){

                        if(Number(variableNames[i]) == Number(x)){
                            
                            i--;
                            var removedFromArray = variableNames.splice(i,2);
                            removedFromArray = undefined;
                            break;

                        };
                    
                    };
                
                }; 
                
                variableNames.push(""+$dataSystem.variables[x]+"", x); //Generate a new entry in the array! Name, Id

           };

      $gameVariables.value(x)["" + y + ""] = z;

       };
  };
  
  function findVariableId(string){

    var IdFound;
    var i;
            for (i=0; i < variableNames.length; i++) {
                
                if(variableNames[i] == string){

                i++;
                IdFound = Number(variableNames[i]);
                break;

              };    

            };
            
    return IdFound;

  };

  function calculX(x){

      if (!isNaN(x) == true){
      
          x = parseInt(x);
      
        } else {

          x=""+x+"";
          x = Number(findVariableId(x));

        };
      
      return x;

  };
        

  (function(makai) {

    'use strict';
    
      Window_Base.prototype.convertEscapeCharacters = function(text) {

        text = makai.call(this, text);
        text = text.replace(/\x1bVOBJ\[(.*?):(.*?)\]/gi, function() {

          var x = calculX(arguments[1]);
          var y = arguments[2];

            return $gameVariables.value(x)[""+y+""];

        }.bind(this));
    
        return text;

    }; 

  })(Window_Base.prototype.convertEscapeCharacters);

})(maka.objVar);
