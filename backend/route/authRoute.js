import {Router} from "express"
import { register, login } from "../controller/authController.js"

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

export { router };