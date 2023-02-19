var mongoOptions = {
    server: {
        poolSize: Number(process.env.MONGO_POOLSIZE) || 5
    }
}
mongoose.connect(DATABASE_URL + "?authMechanism=SCRAM-SHA-1", mongoOptions);

// mongoose.createConnection(uri, { maxPoolSize: 10 });
// const uri = 'mongodb://127.0.0.1:27017/test?maxPoolSize=10';

// const options = {
//     autoIndex: false, // Don't build indexes
//     maxPoolSize: 10, // Maintain up to 10 socket connections
//     serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//     socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     family: 4 // Use IPv4, skip trying IPv6
//   };

// mongoose.connect(process.env.MONGO_URL, options)
var mongoOptions = {
    server: {
        poolSize: Number(process.env.MONGO_POOLSIZE) || 5
    }
}
mongoose.connect(DATABASE_URL + "?authMechanism=SCRAM-SHA-1", mongoOptions);