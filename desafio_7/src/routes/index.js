import { Router } from "express";

//Declare routers:
const router = Router();

app.use("/users", usersViewRouter);
app.use("/api/jwt", jwtRouter);
app.use('/api/users', usersRouter);

export default router;