export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () =>{
        return this.dao.getAll();
    }
    getById = (id) => {
        return this.dao.getBy(id);
    }
    saveUser = (user) =>{
        return this.dao.save(user);
    }
    updateUser = (id,user) =>{
        return this.dao.updateuser(id,user);
    }
};