import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {
    try {
        await db.sync({force: true});
        console.log('Database has been cleared');
        exit();
    } catch (error) {
        console.log(`There was an error clearing the database: ${error}`);
        exit(1);
    }
}

if(process.argv[2] === '--clear') {
    clearDB();
}