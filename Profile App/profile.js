
//Required modules
const https = require("https");
const http = require("http");
//Print Error Messages
function printError(error) {
    console.error(error.message);
}

//Function to print message to consose
function printMessage(username, badgeCount, topic, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in ${topic}`;
    console.log(message);
}

function get(username, topic) {
    try {
        //Connect to the API URL (https://teamtreehouse.com/username.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`,
            response => {
                if (response.statusCode === 200) {
                    let body = "";
                    //Read the data
                    response.on('data',
                        data => {
                            body += data.toString();
                        });

                    response.on('end',
                        () => {
                            try {
                                //Parse the data
                                const profile = JSON.parse(body);
                                //console.dir(profile);
                                printMessage(username, profile.badges.length, topic, profile.points[topic]);
                                //Print the data
                            } catch (e) {
                                const message = `Couldn't parse the JSON ${e.message}`;
                                const errorMessage = new error(message);
                                printError(errorMessage);
                            }
                        });
                } else {
                    const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                    const statusCodeError = new Error(message);
                    printError(statusCodeError);

                }
            });
        request.on('error', printError);
    }
    catch (e) {
        printError(e);
    }
}

module.exports.get = get