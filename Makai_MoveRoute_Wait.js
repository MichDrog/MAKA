/*:
*@plugindesc v1.0 Change the waiting time of a move route 'wait' command
*@author Makai Rosi
*
*@help
*============================================================================
*                                 INTRODUCTION                              
*============================================================================
*
*As far as i've searched, there's not an easy way to alter the waiting time
*of a 'wait' command inside a move route, via script calls. So i decided to
*make up a simple plugin. I made it without altering any other functions,
*so i doubt there's going to be any compatibility issues.
* 
*============================================================================
*                                     USAGE                               
*============================================================================
*
*Setup a move route just like you would, and add this script call in the 
*beginning of the list:
* 
*maka.mrw.changeWait(this,pos,min,max);
*
* this = simply type 'this' (no quotes). It will get the event object.
* pos = The position of the 'wait' command in the list, which you want changed.
* (starting with 0) 
* min = the MINimum time you want the wait value to become
* max = the MAXimum time you want the wait value to become
*
*If you want the wait to become a specific number, just don't use 'max'.
*----------------------------------------------------------------------------
*
*Examples:
*
*Say you have a move route list with the following commands:
* 
* Turn left
* Turn right
* wait 60
* Turn left
* 
*Right now, the 'wait' command occupies the 2nd place (starting with 0).
*By adding our script call it will occupy the 3rd place.
*Now let's say we want it to become a random number between 100 and 200.
*
*The move route list will now become:
* 
* maka.mrw.changeWait(this,3,100,200)
* Turn left
* Turn right
* wait 60
* Turn left
*
*You can use this command as many times as you want inside the same move
*route list, it just has to be BEFORE the wait command you want changed.
*Also look out in case the wait command's place changes! 
* 
*You can also set min and max through variables, for example:
* 
* maka.mrw.changeWait(this,3,$gameVariables.value(1),$gameVariables.value(2))
*
*In this example, variables 1 and 2 hold the values of minimum and maximum. 
* 
*If you encounter any bugs, find me on the rpgmakerweb forums as 'MiD' or 
*on steam as 'Makairosi'. 
* 
*============================================================================
*                                 LICENSE
*============================================================================
* 
* You can edit and alter this plugin to fit your needs. You can also copy
* my code for your own plugins.
* Just credit me as the original author (if you edit this) or contributor
* (if you create a new plugin using this).
* 
*============================================================================
*                                 CHANGELOG                                   
*============================================================================
*v1.0: Created the original plugin
*/
//plugin starts here

var maka = maka || {};
maka.mrw = maka.mrw || {};

(function(){ 

    maka.mrw.randomize = function (x, y) {
        return Math.floor((Math.random() * (y - x + 1)) + x);
    };

    maka.mrw.changeWait = function (x, pos, min, max) {
        if (min < 1) min = 1;
        if (!max) max = min;
        if (min > max) min = max;
        var value = this.randomize(min, max);
        if (x._moveRoute.list[pos]) {
            if (x._moveRoute.list[pos].code == 15) x._moveRoute.list[pos].parameters[0] = value;
        };
    };

})(maka.mrw);
