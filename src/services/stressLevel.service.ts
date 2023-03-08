import fs from "fs";
import path from "path";
import { StressLevel, User } from "../types/interfaces";

const stressLevelFilePath = path.join(__dirname, "..", "datas", "stressLevels.json");

export const getStressLevels = async (): Promise<StressLevel[]> => {
  // read JSON data from file
  const stressLevelsJson = await fs.promises.readFile(
    stressLevelFilePath,
    "utf8"
  );
  if (stressLevelsJson) {
    const _stressLevels: StressLevel[] = JSON.parse(stressLevelsJson);
    return _stressLevels;
  }
  return [];
};
