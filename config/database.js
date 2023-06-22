const mongoose = require('mongoose');
const uri = "mongodb+srv://iamowaisazam:owaisazam123@nodejs.sqetxko.mongodb.net/?retryWrites=true&w=majority";



const connectDB = async () => {

    try {
        const connect  = await mongoose.connect(uri);
        console.log(connect.connect.name);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB