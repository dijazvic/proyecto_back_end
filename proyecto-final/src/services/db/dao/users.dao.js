import {userModel} from "../models/users.model.js";

export default class UsersDao {
    constructor() {
        console.log("Working courses with Database persistence in mongodb");
    }

    getAll = async () =>{
        let user = await userModel.find().lean().populate('users');
        return user;
    }
    getById = async(id) =>{
        let user = await userModel.findOne({_id:id}).populate('users');
        return user;
    }
    saveUser =async user =>{
        let result = await userModel.create(user);
        return result;
    }
    updateCourse = async (id,user) =>{
        delete user._id; 
        let result = await userModel.updateOne({_id:id},{$set:user})
        return result;
    }
}