#!/usr/bin/env node
import { Command } from "commander";
import runConversion from "../core/runConversion.js";

const program = new Command();

program
  .name("v2gif")
  .description("Convert one or more .mp4/.mov videos to .gif")
  .argument("<videos...>", "Path(s) to video file(s)")
  .option("-o, --output <folder>", "Output directory", "./gifs")
  .option("--fps <number>", "Frames per second", "10")
  .option("--width <number>", "Width in pixels", "320")
  .option("--open", "Open the GIF after converting", false)
  .option("--clipboard", "Copy the GIF to clipboard (macOS/Linux only)", false)
  .option("--recursive", "Search videos in subdirectories too", false)
  .option("--start <seconds>", "Start time in seconds", "0")
  .option("--scale <factor>", "Scale factor (e.g. 0.5 = 50%)", null)
  .option("--duration <seconds>", "Duration in seconds (after start)", null)
  .option("--dry-run", "Show what would be done without running ffmpeg", false)
  .action(runConversion);

program.parse();
