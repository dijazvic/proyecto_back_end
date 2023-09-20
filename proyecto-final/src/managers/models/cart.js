import mongoose from 'mongoose';

const collectionName = 'cart';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};


const cartSchema = new mongoose.Schema({
    name: stringTypeSchemaNonUniqueRequired,
    lastName: stringTypeSchemaNonUniqueRequired,
    age: stringTypeSchemaNonUniqueRequired,
       
});

/**
 * Middleware para agregar dentro del método 'find' un llamado a una función, en este 
 * caso llamamos al metodo populate.
 */
cartSchema.pre('findOne', function() {
    this.populate("courses.course");
});
const cartModel = mongoose.model(collectionName, cartSchema);
export default cartModel;