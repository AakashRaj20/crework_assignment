import { Router } from "express";
import { signupUser, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);


// protected routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh").post(verifyJwt, refreshAccessToken);

export default router;
