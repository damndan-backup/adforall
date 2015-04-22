#SPLASH AD MANAGEMENT SERVICE
=============================

## Javascript & Nodejs
======================
Splash is written in Javascript for both the front and the backend. 
While its flexibility makes prototyping easier and faster, Javascript
requires a new coding paradigm very different from those of some other 
server-side scripting languages such a Python and Ruby. Here're a few
things to note before start programming in Javascript.

  * Everything is an Object
  In Javascript, there're no such thing as classes. Instead, everything is 
  regarded as an object. Object declaration is quite simple:

  '''javascript
  var emptyObject = {};
  var anotherObject = {
      propertyA: 5,
      propertyB: 'some string',
      functionA: function () {
          return this.propertyA;
      },
  };
  '''

  You can also dynamically add & delete attributes from an object

  '''javascript
  // Dynamically add new attribute to an emptyObject
  emptyObject['newAttr'] = 6;
  console.log(emptyObject); // prints out { newAttr: 6 }
  '''

  You can also extend an object by calling:

  '''javascript
  var inheritedObject = anotherObject.extend({
      newAttr: 1,
      newFunc: function () {
          // some func
      },
  });
  '''

  * Functions serve as constructors
  Javascript does not follow OOP paradigm. But there're ways to achieve 
  structured object oriented-ness in Javascript

  '''javascript
  function Girl(name) { // Constructor
      var privateVariable = '650-xxx-xxxx'; // phone numbers are private
      this.publicVariable = 'email'; //emails are public
      this.name = name;
      this.publicMethod = function () {
          //do something
      };
  };

  Girl.sex = 'female' // adding an attr to the Girl constructor adds a static 
  property

  Girl.prototype.sayName = function () {
      console.log('Hi my name is '.concat(this.name));
  };

  var nicole = new Girl('nicole'); // nicole is an instance of a girl
  nicole.sayName(); // prints out Hi my name is nicole
  '''

  * this keyword
  Note that javascript's this keyword always refers to the objects that called
  the given function / codeblock that it is contained in.

  For example,
  '''javascript

  '''

  * Asynchronous Code Execution
  Nodejs makes an extensive use of Javascript's asynchronous coding paradigm.
  Functions in javascript are primitive types, and can be passed around as 
  parameters / be stored in variables. This allows:

    '''javascript
    var callback = function (param1, param2) {
        return param1 + param2;
    };

    var mainFunc = function (param1, cb) {
        return param1 + cb(param1, param1);
    };

    console.log(mainFunc(2, callback)); // prints out 6
    '''

  * Use camelCase for variable & function declaration
  This is pretty straight forward.

  * Truthy and Falsey, == and ===, != and !==

## MongoDB
==========

## Testing
==========

## Code Structure
=================
Splash is built on expressjs stack. Since expressjs does not offer scaffolding
or a structured project formatting, Splash maintains its own code structure.
Note that this may not be the best fit for this project. 

## Models
=========

## Controllers & Routing
========================


