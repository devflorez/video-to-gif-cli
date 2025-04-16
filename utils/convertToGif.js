import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function convertToGif(inputPath, outputDir, options = {}) {
    const {
      fps = 10,
      width = 320,
      scale = null,
      start = 0,
      duration = null
    } = options;

    const ext = path.extname(inputPath);
    if (!['.mp4', '.mov'].includes(ext.toLowerCase())) {
      throw new Error('Unsupported format. Only .mp4 or .mov files are allowed.');
    }

    const baseName = path.basename(inputPath, ext);
    const outputPath = path.join(outputDir, `${baseName}.gif`);

    let trim = `-ss ${start}`;
    if (duration !== null) trim += ` -t ${duration}`;

    const scaleFilter = scale
      ? `scale=iw*${scale}:ih*${scale}:flags=lanczos`
      : `scale=${width}:-1:flags=lanczos`;

    const command = `ffmpeg ${trim} -i "${inputPath}" -vf "fps=${fps},${scaleFilter}" -y "${outputPath}"`;
    await execAsync(command);

    return outputPath;
  }
