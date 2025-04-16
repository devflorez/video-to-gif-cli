import fs from "fs";
import path from "path";
import ora from "ora";
import chalk from "chalk";
import { exec } from "child_process";
import { convertToGif } from "../utils/convertToGif.js";
import { collectValidVideos } from "./fileUtils.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execShell = (cmd) =>
  new Promise((res, rej) => {
    exec(cmd, (err, stdout) => (err ? rej(err) : res(stdout)));
  });

function ensureOutputDirectory(outputPath) {
  const fullPath = path.resolve(__dirname, "..", outputPath);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
  return fullPath;
}

function notifyNoVideos() {
  console.log(chalk.yellow("⚠️  No video files found to convert."));
}

function showDryRun(video, options, outputDir) {
  console.log(`🧪 Dry run: would convert "${video}" with:`);
  console.log(`   - fps: ${options.fps}`);
  console.log(
    `   - width: ${options.scale ? "calculated via scale" : options.width}`
  );
  console.log(`   - scale: ${options.scale ?? "none"}`);
  console.log(`   - start: ${options.start}s`);
  console.log(`   - duration: ${options.duration ?? "full length"}`);
  console.log(`   - output: ${outputDir}`);
}

async function processVideo(video, options, outputDir) {
  const spinner = ora(`🎬 Converting ${video}...`).start();

  try {
    const gifPath = await convertToGif(video, outputDir, {
      fps: Number(options.fps),
      width: options.scale ? null : Number(options.width),
      scale: options.scale ? Number(options.scale) : null,
      start: Number(options.start),
      duration: options.duration ? Number(options.duration) : null,
    });

    spinner.succeed(`${chalk.green(path.basename(video))} converted ✅`);

    if (options.open) {
      await execShell(`open "${gifPath}"`).catch(() => {});
    }

    if (options.clipboard) {
      await execShell(`cat "${gifPath}" | pbcopy`).catch(() => {});
    }
  } catch (err) {
    spinner.fail(
      `❌ Failed to convert ${path.basename(video)}: ${chalk.red(err.message)}`
    );
  }
}

export default async function runConversion(inputs, options) {
  const outputDir = ensureOutputDirectory(options.output);
  const videoFiles = collectValidVideos(inputs, options.recursive);

  if (videoFiles.length === 0) {
    return notifyNoVideos();
  }

  for (const video of videoFiles) {
    if (options.dryRun) {
      showDryRun(video, options, outputDir);
      continue;
    }

    await processVideo(video, options, outputDir);
  }
}
