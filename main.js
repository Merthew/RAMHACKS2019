const {Client} = require ('pg');
const client = new Client({
	user: 'FedResAdmin',
	host: 'reserve-my-object.cuouodrxgsm3.us-east-2.rds.amazonaws.com',
	database: 'reserve-my-object',
	password: 'Somepassforthis',
	port: 5432,
});

const connection =  client.connect(err => { //start postgres db connection
    if (err) {
        console.log('oops!\n', err.stack)}
    else {
        console.log('connection success!')}
});