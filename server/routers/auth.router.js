import Router from "express";
import UserService from "../services/user.service.js";
import authService from "../services/auth.service.js";
const authRouter = new Router();

authRouter.post("/token", (req, res) => {
  const { email, password } = req.body;

  const user = new UserService().findUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "invalid password" });
  }
  const { uid, scopes } = user;

  authService.createCustomToken(uid, { scopes }).then((customToken) => {
    res.json({ customToken });
  });
});

export default authRouter;
