import { Request, Response, NextFunction } from "express";
import {
  createImages,
  createStress,
  createThumbnails,
  getStressById,
  getStressByUserId,
} from "../services/stress.service";
import { Image, Stress, Thumbnail, UserLogged } from "../types/interfaces";
import { v4 as uuidV4 } from "uuid";
import { ERROR_TYPEs } from "../utils/constants";
import sharp from "sharp";
import path from "path";

export const stress_getStressByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const _stress = await getStressByUserId(userId);
    return res.send({ data: _stress });
  } catch (error) {
    next(error);
  }
};

export const stress_createStress = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { stressLevelId } = req.body as { stressLevelId: number };
    const { user } = JSON.parse(
      req.headers.user as string
    ) as unknown as UserLogged;

    const stress: Stress = {
      createdAt: new Date(),
      id: uuidV4(),
      stressLevelId: stressLevelId,
      userId: user.id,
    };

    const _stressCreated = await createStress(stress);
    return res.send({ data: stress });
  } catch (error) {
    next(error);
  }
};

export const stress_uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { stressId } = req.params;
    const _stress = await getStressById(stressId);
    if (!_stress) {
      return res.status(404).send({
        data: null,
        error: {
          status: ERROR_TYPEs.NOT_FOUND.code,
          name: ERROR_TYPEs.NOT_FOUND.name,
          message: ERROR_TYPEs.NOT_FOUND.message,
          detail: {},
        },
      });
    }
    const files = req.files;
    if (!files || !Array.isArray(files)) {
      return res.status(ERROR_TYPEs.BAD_REQUEST.code).send({
        data: null,
        error: {
          status: ERROR_TYPEs.BAD_REQUEST.code,
          name: ERROR_TYPEs.BAD_REQUEST.name,
          message: "Required images",
          detail: {},
        },
      });
    }
    const _images = files.map((file) => {
      return {
        name: file.filename,
        id: uuidV4(),
        createdAt: new Date(),
        originalPath: file.path,
        stressId,
      } as Image;
    });

    const _imageCreated = await createImages(_images);
    console.log(_imageCreated);

    //this image size config can be loaded from database or app config
    const thumbnailConfigs = [
      {
        size: "200x200",
        heigh: 200,
        width: 200,
        type: "mobile",
      },
      {
        size: "200x400",
        heigh: 200,
        width: 400,
        type: "pc",
      },
    ];

    const thumbnails = _imageCreated.reduce(
      (list: Thumbnail[], curr: Image) => {
        thumbnailConfigs.forEach(async (thumb) => {
          const targetPath = path.join(
            ".",
            "uploads",
            `${thumb.size}-${curr.name}`
          );

          const outputFormat = targetPath.endsWith(".png") ? "png" : "jpeg";
          console.log({ targetPath, outputFormat });

          const pipeline = sharp(path.join(".", "uploads", curr.name)).resize(
            thumb.width,
            thumb.heigh
          );
          // set the output format and quality of the resized image
          pipeline.toFormat(outputFormat, { quality: 90 });
          // write the resized image to a new file

          pipeline.toFile(targetPath);
          list.push({
            height: thumb.heigh,
            id: uuidV4(),
            imageId: curr.id,
            name: curr.name,
            path: targetPath,
            size: thumb.size,
            type: thumb.type,
            width: thumb.width,
          } as Thumbnail);
        });
        return list;
      },
      [] as Thumbnail[]
    );
    await createThumbnails(thumbnails);
    return res.send({ data: _imageCreated });
  } catch (error) {
    next(error);
  }
};
