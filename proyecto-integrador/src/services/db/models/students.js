import mongoose from 'mongoose';

const userCollection = 'usuarios';


// definimos el schema 
const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: String, 
    courses: []
})


// Definimos el modelo
export const userModel = mongoose.model(userCollection, userSchema);