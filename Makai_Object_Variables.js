/*:
*@plugindesc v1.3b Create and manipulate variables that hold more than one value (aka object type variables)
*@author Makai Rosi
*
*
*@param Case Sensitivity
*@type boolean
*@on YES
*@off NO
*@desc Do you want names to be case-sensitive?
*YES - true     NO - false
*@default true
*
*@param Name_holding_Variable
*@type integer
*@desc Set to 0 to disable
*Sets a variable that stores the variable names so you can use them 
*@default 0
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
*                                  PARAMETERS                                 
*============================================================================
*
*           Case Sensitivity:
*
*By default, every string is case-sensitive. By turning this parameter off
*you can add "HEIGHT" as a property and call it as "HeIgHT". Note that if
*you also have the first parameter on, the name of the variable will be
*stored with all its letters turned to lowercase.
*
*I personally prefer to have this off, since i usually name my variables
*weirdly (like "MAXjoy") and i'm not going to remember those. So with this
*i can just type mark:maxjoy and not care about their proper names.
*
*           Name_holding_Variable:
* 
* If you want to use the variables' names instead of their ids when 
* calling their values in the text, set this variable to anything above 
* 0. Name that variable something so that you remember not to touch it!
* Probably name it "DONT USE" and be done with it :P
* 
*I personally prefer to have this on, since it's easier to remember
*mark:height and suzan:job than 116:height and 349:job.
* 
*============================================================================
*                                  TEXT CODE                                 
*============================================================================
*
*           \VOBJ[id:property]
*
*id = Variable ID or variable_name (the one you gave it!)
*(If you want to use names, remember to set the name holding variable 
 * appropriately!)
*
*property = the property's name
*
*Examples:
* 
*\VOBJ[1:2] will show the value of Variable 1, property "2".
*
*\VOBJ[mark:2] will show the value of the Variable you have named 
*              "mark"(without the quotes), property "2".
*
*\VOBJ[1:height] will show the value of Variable 1, property "height".
*
*\VOBJ[mark:height] will show the value of the Variable named 
*                   "mark"(without the quotes), property "height".
*
*----------------------------------------------------------------------------
*IMPORTANT! Properties that don't have a value will return "undefined". 
*----------------------------------------------------------------------------
*
*============================================================================
*                                PLUGIN COMMANDS                               
*============================================================================
*1. NewVarProp: VariableID PropertyName Value
*
*   Does exactly what maka.objVar.setProp(x, y, z) does.
*
*   Example: Plugin Command->NewVarProp: 16 height 4
*   This will set the value of variable 16, property "height" to 4.
*
*2. StoreVarProp: VariableID/Name PropertyName StorageVariableID
*
*   Stores the value of a variable's property in an another variable.
*
*   Example: Plugin Command->StoreVarProp: 16 height 13
*   This will take the value of variable 16, property "height" and put it in
*   variable 13.
*
*If you did both of these plugin commands, if you type \v[13] in a show text
*box it will show "4".
*
*NOTE: In contrast to the script calls, plugin commands don't need quotes.
*============================================================================
*                                 SCRIPT CALLS                               
*============================================================================
*
*              maka.objVar.setProp(id, property, value);
*
*Sets a new value to a property of a variable.
*
*id = The ID of the variable whose property's value you want to set or
*    change. If the Store Variable Names parameter is ON, the name and 
*    ID of the variable will be stored for future use.
*
*property = The property of the variable whose value you want to set or change.
*    If the property doesn't exist, it will be created. Remember, when
*    typing a name for the property it always has to be in quotes!
*
*value = The value you want to set to the property of the variable. The value
*    can be anything (number, string, boolean, etc.), even the value of a
*    property of another object variable.
*
*              maka.objVar.getProp(x, y);
*
*Gets the value of the property of a variable.
*
*id = The ID of the variable whose property's value you want to get.
*    If the Store Variable Names parameter is ON, the name of the
*    variable can be used instead.
*
*property = The property of the variable whose value you want to get.
*    Remember, the property's name it always has to be in quotes!
*
 *              maka.objVar.changeProp(operation, value, id, property);
 * 
 * operation = the mathematical operation you are going to use.
 *
 * operations supported:
 * 'add' = addition
 * 'sub' = subtraction
 * 'mul' = multiplication
 * 'div' = division (result is rounded)
 * 'mod' = modulo
 *
 * value = the value to be placed after the operation.
 *
 * for example if you want to increase the property by 1,
 * then the operation is 'add' and the value is 1.
 *
 * id = the id of the variable that holds the property
 *
 * property = the name of the property held
 * 
 * For example if you wanted to add 1 to the property 'salt' of
 * variable 32, you would use:
 * 
 * maka.objVar.changeProp('add', 1, 32, 'salt');
 * 
 * And if you wanted to subtract 2 from the same property:
 * 
 * maka.objVar.changeProp('sub', 2, 32, 'salt');
 * 
 * 
*NOTE: To reset a variable back to a "normal" one, simply assign a
*      new value to it via "control variables" or the script call
*      $gameVariables.setValue() of RMMV.
*
*IMPORTANT! If you reset an object variable back to a "normal" variable,
*           all its properties and their values will be deleted!
*           
*----ARRAYS----Read on if you want an array property
* 
* X is always the the Id of the variable that holds the property
* 
* Variable Names don't count here (we're talking about arrays)
* 
* There's no way to simply show an array in text. Unless you first 
* store the desired value in a different variable or property.
* 
*              maka.objVar.setProp(x, y, 'createNewArray'):
*
*With this, the new property will be set up as an array.
* 
*              maka.objVar.pushProp(x, y, z):
* 
*If 'y' is an array, z will be 'pushed' into it.
* 
*              maka.objVar.getProp(x, y)[i]:
*
*If 'y' is an array, this will return the value at its 'i' place.
* 
*              maka.objVar.getPropLength(x, y):
* 
*If 'y' is an array, this will return the length of the array.
* 
*----------------------------------------------------------------------------
*
*Examples:
*
*maka.objVar.setProp(1, 1, 4); 
*-
*->Property 'a' now holds the value 4
*->You can show it by typing \VOBJ[1:1]
*
*
*(name holding variable set to a valid id, Variable Named "Mark" by the user:)
*
*maka.objVar.setProp(1, 2, $gameVariables.value(1).a); 
*-
*->Property 'b' now holds the value of property 'a'
*->You can show it by typing \VOBJ[Mark:1]
*
*
*maka.objVar.setProp(1, "three", true);
*-
*->Property 'three' now holds the true boolean expression
*->You can show it by typing \VOBJ[1:three]
*
*
*(name holding variable set to a valid id, Variable Named "Suzan" by the user:)
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
*                                 CHANGELOG                                   
*============================================================================
*v1.3b: Bugfixes
*v1.2: Added array properties and fixed the name storing error!
*v1.1: Added Plugin Commands!
*v1.0: Created the original plugin
*/
//plugin starts here

var maka = maka || {};
maka.objVar = maka.objVar || {};

(function(){ 

  maka.parameters = PluginManager.parameters('Makai_Object_Variables');
  maka.param = maka.param || {};
  
  maka.param.caseSensi = eval(String(maka.parameters['Case Sensitivity']));
  maka.param.storeVar = Number(maka.parameters['Name_holding_Variable']);

  var variableNames = variableNames || [];
  
//======================================SCRIPT CALLS=====================================================//

  maka.objVar.getProp = function(x, y) {

    y = caseSensi(y); //property

    if(maka.param.storeVar<=0){
    x = Number(x); //id

    } else { 

      x = caseSensi(x);
      x = Number(calculX(x));

    };
return $gameVariables.value(x)[""+y+""];
  };
//-----------------------------------------------------------------------------------------------------//
    maka.objVar.setProp = function (x, y, z) {

        if (maka.param.storeVar > 0) {
            if (typeof $gameVariables.value(maka.param.storeVar) === 'object') {
                variableNames = $gameVariables.value(maka.param.storeVar);
            };
        };

      x = Number(x); //variable ID
      y; //name number of property
      z; //value to be given
      
      var alreadyExists = false;
      var nameToStore = ""+$dataSystem.variables[x]+"";
      nameToStore = caseSensi(nameToStore);
      y = caseSensi(y);
      
      
      if (x<1 || x>9999){ //check if the id given is valid
  
        alert("Warning, the script call 'setProp' is trying to create an object out of a variable ID that doesn't exist!");
        alert("Remember, Variable IDs in RMMV can only by integers from 1 to 9999");
        alert("Nothing was created.");
  
      } else {
  
       if((typeof $gameVariables.value(x) === 'object') == false){

           $gameVariables.setValue(x, {}); 

       }; //If the variable isn't an object, create it
       
          if (maka.param.storeVar > 0){

           if (variableNames.length>0){

                    var i;
               for (i = 0; i < variableNames.length; i++){

                   if (Number(variableNames[i]) == Number(x)){
                            
                            i--;
                            
                       variableNames[i].replace("" + variableNames[i]+"", ""+nameToStore+"");
                            alreadyExists = true;
                            
                            break;

                        };
                    
                    };
                
                }; 
           

if(alreadyExists == false){
    variableNames.push(nameToStore, x); //Generate a new entry in the array! Name, Id
    
};
              };
          if (z != 'createNewArray') {
              $gameVariables.value(x)["" + y + ""] = z;
          } else {
              $gameVariables.value(x)["" + y + ""] = [];
          };

        };
        if (maka.param.storeVar > 0) {
            $gameVariables.setValue((maka.param.storeVar), variableNames);
        };
    };
//-----------------------------------------------------------------------------------------------------//
    maka.objVar.pushProp = function (x, y, z) {
        y = caseSensi(y);
        $gameVariables.value(x)["" + y + ""].push(z);
        
    };

//-----------------------------------------------------------------------------------------------------//
    maka.objVar.changeProp = function (operation, value, id, property) {

        switch (operation) {

            case 'add': this.setProp(id, property, this.getProp(id, property) + value); break;
            case 'sub': this.setProp(id, property, this.getProp(id, property) - value); break; 
            case 'div': this.setProp(id, property, Math.round(this.getProp(id, property) / value)); break; 
            case 'mul': this.setProp(id, property, this.getProp(id, property) * value); break;
            case 'mod': this.setProp(id, property, this.getProp(id, property) % value); break;
        };

    };


//-----------------------------------------------------------------------------------------------------//
    maka.objVar.getPropLength = function (x, y) {
        y = caseSensi(y);
        return $gameVariables.value(x)["" + y + ""].length;

    };

  //======================================SOME FUNCTIONS=====================================================//

    function findVariableId(string) {
        if (maka.param.storeVar > 0) {
            if (typeof $gameVariables.value(maka.param.storeVar) === 'object') {
                variableNames = $gameVariables.value(maka.param.storeVar);
            };
        };
   string = caseSensi(string);

    var IdFound;
    var i;
        for (i = 0; i < variableNames.length; i++) {
                
          if (variableNames[i] == string){

                i++;
              IdFound = Number(variableNames[i]);
                break;

              };    

            };
            
    return IdFound;

  };

//-----------------------------------------------------------------------------------------------------//

  function calculX(x){

      if (!isNaN(x) == true){
      
          x = parseInt(x);
      
        } else {

          x=""+x+"";
          x = Number(findVariableId(x));

        };
      
      return x;

  };

//-----------------------------------------------------------------------------------------------------//

        function caseSensi(funcParam){

          if (maka.param.caseSensi == false){
                   
                   if (!isNaN(funcParam) == false){
                        
                   funcParam = funcParam.toLowerCase();
                       
                   };
                   
        };
             return funcParam;
        };

//======================================TEXT REPLACER=====================================================//

  (function(makai) {

    'use strict';
    
      Window_Base.prototype.convertEscapeCharacters = function(text) {

        text = makai.call(this, text);
        text = text.replace(/\x1bVOBJ\[(.*?):(.*?)\]/gi, function() {

          var x = arguments[1];
          x = caseSensi(x);
          x = calculX(x);
          var y = arguments[2];
          y = caseSensi(y);

            return $gameVariables.value(x)[""+y+""];

        }.bind(this));
    
        return text;

    }; 

  })(Window_Base.prototype.convertEscapeCharacters);

//======================================PLUGIN COMMANDS=====================================================//

var makaPluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args){
makaPluginCommand.call(this, command, args);

if (command === 'NewVarProp:'){
if (args[2] == Number(args[2]))args[2] = Number(args[2]);
maka.objVar.setProp(args[0], args[1], args[2]);
};

if (command === 'StoreVarProp:'){
  $gameVariables.setValue(args[2], maka.objVar.getProp(args[0], args[1]));
  };
};


})(maka.objVar);
