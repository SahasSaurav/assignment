import {Router} from "express"
import { getAllUsers} from "../controller/userController.js"
import {requireAuth} from '../middleware/authMiddleware.js'

const router = Router();

router.route("/").get(requireAuth,getAllUsers);

export { router };