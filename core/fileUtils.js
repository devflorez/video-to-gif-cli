import fs from "fs";
import path from "path";

export function getAllVideoFiles(dir, recursive = false) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && /\.(mp4|mov)$/i.test(entry.name)) {
      files.push(fullPath);
    }
    if (entry.isDirectory() && recursive) {
      files = files.concat(getAllVideoFiles(fullPath, recursive));
    }
  }

  return files;
}

export function collectValidVideos(inputs, recursive) {
  const videos = [];

  for (const input of inputs) {
    const fullPath = path.resolve(input);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      videos.push(...getAllVideoFiles(fullPath, recursive));
    } else if (stat.isFile() && /\.(mp4|mov)$/i.test(fullPath)) {
      videos.push(fullPath);
    }
  }

  return videos;
}
