import mongoose from 'mongoose';

let db;

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = mongoose.connection;
        db.on('connected', () => {
            console.log('MongoDb connected');
        });
        db.on('error', (err) => {
            console.log('MongoDb connection error, Please make sure db is up and running' + err);
            process.exit();
        });
    } catch (error) {
        console.log('Something went wrong in connecting to DB : ', error);
    }
}

export { db };
