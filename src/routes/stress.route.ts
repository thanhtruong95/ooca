import { Router } from "express";
import {
  stress_createStress,
  stress_getStressByUser,
  stress_uploadImage,
} from "../controllers/stress.controller";
import multer from "multer";
import { auth } from "../middleware/auth";
import { validateDto } from "../middleware/validateDTO";
import { createStressSchema } from "../utils/schemas";
const uploadImages = multer({
  // limits: {
  //   fileSize: 1000000,
  // },
  // fileFilter(req, file, cb) {
  //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //     throw Error("Please upload a valid image file");
  //   }
  // },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const router = Router();

router.post(
  "/:stressId/upload",
  uploadImages.array("image", 10),
  stress_uploadImage
);

router.get("/", stress_getStressByUser);

router.post("/", auth(), validateDto(createStressSchema), stress_createStress);

export default router;
