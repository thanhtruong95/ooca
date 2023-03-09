import { Router } from "express";
import { user_login } from "../controllers/user.controller";
const router = Router();

router.post("/login", user_login);

export default router;
