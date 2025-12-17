import { Router } from "express";
import { TaskController } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const controller = new TaskController();

router.use(authMiddleware);

router.post("/", controller.createTask);
router.get("/", controller.getMyTask);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;