// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const profile = require('./profile');


const data = process.argv.slice(2); //reads inputs from console
const topic = data[0];
const users = data.slice(1);
users.forEach(user=> profile.get(user, topic));
//const users = ["chalkers", "alenaholligan","shaiblaustien","davemcfarland"];

//This
//users.forEach(getProfile);

//Equles to:
//users.forEach(username =>
//    getProfile(username));

