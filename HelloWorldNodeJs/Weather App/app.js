const profile = require('./weather');
let query = process.argv.slice(2, process.argv.length - 1).join(' ');
query += `,${process.argv[process.argv.length - 1]}`;
if (!isNaN(process.argv[2]))
    query = "zip=" + query;
else
    query = "q=" + query;
query += `&units=metric`;
profile.get(query);