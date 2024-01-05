const mongoose = require('mongoose');

const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('database connected successfully');
        })

        connection.on('error', (error) => {
            console.log('please make sure your database is running fine!' + error);
            process.exit();
        })

    } catch (error) {
        console.log('connection error' + error.message);
    }

}

module.exports = connect;