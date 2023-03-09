import fs from "fs";
import path from "path";
import { User } from "../types/interfaces";

const userFilePath = path.join(__dirname, "..", "datas", "users.json");

export const getUserByUserName = async (
  username: string
): Promise<User | null> => {
  // read JSON data from file
  const usersJson = await fs.promises.readFile(userFilePath, "utf8");
  if (usersJson) {
    const _users: User[] = JSON.parse(usersJson);
    const _user = _users.find((user) => user.username === username);
    return _user;
  }
  return null;
};
