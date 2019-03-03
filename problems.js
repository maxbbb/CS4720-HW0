/**
╔╦╗┌─┐┌┐ ┬┬  ┌─┐  ╔╦╗┌─┐┬  ┬┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐┌┐┌┌┬┐  ╦═╗┌─┐┌─┐┌─┐┌┬┐
║║║│ │├┴┐││  ├┤    ║║├┤ └┐┌┘├┤ │  │ │├─┘│││├┤ │││ │   ╠╦╝├┤ ├─┤│   │ 
╩ ╩└─┘└─┘┴┴─┘└─┘  ═╩╝└─┘ └┘ └─┘┴─┘└─┘┴  ┴ ┴└─┘┘└┘ ┴   ╩╚═└─┘┴ ┴└─┘ ┴ 
╔═╗┬─┐┌─┐ ┬┌─┐┌─┐┌┬┐  ╔═╗  ╔╗ ┬ ┬┌─┐  ╦ ╦┬ ┬┌┐┌┌┬┐                   
╠═╝├┬┘│ │ │├┤ │   │   ║ ║  ╠╩╗│ ││ ┬  ╠═╣│ ││││ │                    
╩  ┴└─└─┘└┘└─┘└─┘ ┴   ╚═╝  ╚═╝└─┘└─┘  ╩ ╩└─┘┘└┘ ┴    
                
* The program below contains 7 bugs. Follow the instructions in the 
 * setup your environment. Once you have completed setting up your
 * environment. Fix all 7 bugs in the program below. 
 * 
 * You will need to remember the line numbers that you changed
 * Because this is what you will submit. 
 * 
 * This program is not design to be optimal it is designed to 
 * demonstrate the concepts from lecture
 * 
 * Remember to install the request module
 * npm install request@2.x.x
 * 
 */

var APP = {
  version: "0.0.1",
  author: "Kane Thomas kmt8vn",
  url: "http://www.cs.virginia.edu/~dgg6b/encoded.html"
};

class Networking {
  /**
   *
   * @param {*} url specifys the url to retreive the object
   * returns the object that was fetched.
   *
   */
  constructor() {
    APP.Networking = this;
  }
}

class Cloner extends Networking {
  /**
   *
   * @param {*} encodedObject
   * convernts the based 64 object to
   */
  constructor(responseText) {
    //Hint the line below is missing something :)
    super(); // add super
    this.obj = JSON.parse(Buffer.from(responseText, "base64").toString()); // this.responseText => responseText
  }

  deepClone(obj) {
    let clone = {};
    let prop = null;
    for (prop in obj) {
      // tripple equals
      if (typeof obj[prop] === "object") {
        // null is of type object
        if (obj[prop] === null) {
          clone[prop] = null;
        } else {
          clone[prop] = this.deepClone(obj[prop]); // obj => obj[prop], deepClone => this.deepClone
        }
      } else if (typeof obj[prop] === null) {
        clone[prop] = obj[prop] = null;
      } else {
        clone[prop] = obj[prop]; // obj => obj[prop]
      }
    }
    return clone;
  }

  // need to pass object in here
  sameNames(obj) {
    // tripple equals
    return obj.name === this.obj.friends.name;
  }

  // not sure if you were looking to check against the object itself or against the cloned obj
  // if the former than this would be the correct function

  // sameNames() {
  //   return this.obj.name === this.obj.friends.name;
  // }
}

const request = require("request");
request(APP.url, { json: true }, (err, res, body) => {
  if (err) {
    return console.log(err);
  }
  cloningClass = new Cloner(body);
  cloned = cloningClass.deepClone(cloningClass.obj); // pass in cloning class obj
  console.log(cloningClass.sameNames(cloned)); // pass in cloned object
  console.log(JSON.stringify(cloned));
});

/** Your programs output should look like this. 
 * 
 * false 
 * {
    grit: '9.0', 
    name: '', 
    friends: {
        name: 0, 
        age: '22', 
    },
    family: null,
}
 * 
 */
