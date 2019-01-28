const fs = require('fs-extra');
const path = require("path");

console.log("Incrementing build number...");
fs.readFile(path.join(__dirname, '/..', 'package.json'),function(err,content){
    const package = JSON.parse(content);
    let version = package.version.split('.');
    let v = {
      major : version[0],
      minor : version[1],
      patch : version[2]
    } 
    v.patch = parseFloat(v.patch) + 1;
    package.version = `${v.major}.${v.minor}.${v.patch}`;
    fs.writeFile(path.join(__dirname, '/..', 'package.json'),JSON.stringify(package, null, 4),function(err){
        if(err) throw err;
        console.log("Current build number: " + package.version);
    })
});