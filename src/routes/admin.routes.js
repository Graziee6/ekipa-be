import express from "express";
import {
  AddUser,
  GetAll,
  GetDep,
  Login,
} from "../controllers/admin.controller.js";
import authToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", AddUser);
router.post("/login", Login);
router.get("/getDep", authToken, GetDep);
router.get("/getAll", authToken, GetAll);

export default router;
