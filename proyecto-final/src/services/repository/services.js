import UsersDao from "../db/dao/users.dao.js"

import UsersRepository from "./users.repository.js";

const usersDao = new UsersDao();

export const usersService = new UsersRepository(usersDao);