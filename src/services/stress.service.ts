import fs from "fs";
import path from "path";
import { Image, Stress, Thumbnail } from "../types/interfaces";

const stressFilePath = path.join(__dirname, "..", "datas", "stresses.json");
const imageFilePath = path.join(__dirname, "..", "datas", "images.json");
const thumbnailFilePath = path.join(
  __dirname,
  "..",
  "datas",
  "thumbnails.json"
);

export const getStressByUserId = async (userId: string): Promise<Stress[]> => {
  // read JSON data from file
  const stressesJson = await fs.promises.readFile(stressFilePath, "utf8");
  if (stressesJson) {
    const _stresses: Stress[] = JSON.parse(stressesJson);
    const userStresses = _stresses.filter((stress) => stress.userId === userId);
    return userStresses;
  }
  return [];
};

export const getStressById = async (id: string): Promise<Stress | null> => {
  // read JSON data from file
  const stressesJson = await fs.promises.readFile(stressFilePath, "utf8");
  if (stressesJson) {
    const _stresses: Stress[] = JSON.parse(stressesJson);
    const _stress = _stresses.find((stress) => stress.id === id);
    return _stress;
  }
  return null;
};

export const createStress = async (stress: Stress): Promise<boolean> => {
  const stressesJson = await fs.promises.readFile(stressFilePath, "utf8");
  if (stressesJson) {
    const _stresses: Stress[] = JSON.parse(stressesJson);
    _stresses.push(stress);
    await fs.promises.writeFile(stressFilePath, JSON.stringify(_stresses));
    return true;
  }
  await fs.promises.writeFile(stressFilePath, JSON.stringify([stress]));
  return true;
};

export const createImages = async (images: Image[]): Promise<Image[]> => {
  const imagesJson = await fs.promises.readFile(imageFilePath, "utf8");
  if (imagesJson) {
    let _images: Image[] = JSON.parse(imagesJson);
    _images = _images.concat(images);
    await fs.promises.writeFile(imageFilePath, JSON.stringify(_images));
    return images;
  }
  await fs.promises.writeFile(imageFilePath, JSON.stringify(images));
  return images;
};

export const createThumbnails = async (
  thumbnails: Thumbnail[]
): Promise<Thumbnail[]> => {
  const thumbnailsJson = await fs.promises.readFile(thumbnailFilePath, "utf8");
  if (thumbnailsJson) {
    let _thumbnails: Thumbnail[] = JSON.parse(thumbnailsJson);
    _thumbnails = _thumbnails.concat(thumbnails);
    await fs.promises.writeFile(thumbnailFilePath, JSON.stringify(_thumbnails));
    return thumbnails;
  }
  await fs.promises.writeFile(thumbnailFilePath, JSON.stringify(thumbnails));
  return thumbnails;
};
