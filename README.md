# 🎞️ v2gif

A simple and powerful CLI to convert `.mp4` / `.mov` videos into `.gif` — fast, customizable, and fun.

---

## 🚀 Features

- ✅ Convert single or multiple video files
- 📂 Process entire folders (with optional recursion)
- 🎚️ Control FPS, width, start time, duration
- 🔁 Scale proportionally with `--scale`
- 🧪 Dry-run mode (preview conversion commands)
- 🖼️ Auto open converted GIFs
- 📋 Copy GIF to clipboard (macOS/Linux)

---

## 📦 Installation

```bash
git clone https://github.com/devflorez/video-to-gif-cli.git
cd video-to-gif-cli
npm install -g .
```

> Now you can use `v2gif` globally in your terminal!

---

## 🛠️ Usage

```bash
v2gif <file|folder...> [options]
```

### 🔹 Example 1: Convert a single video

```bash
v2gif ./video.mp4
```

### 🔹 Example 2: Convert all `.mp4/.mov` files in a folder

```bash
v2gif ./videos --output ./gifs
```

### 🔹 Example 3: Convert recursively with trimming & scaling

```bash
v2gif ./videos --recursive --start 5 --duration 10 --scale 0.5 --fps 12 --output ./gifs
```

### 🔹 Example 4: Dry-run mode

```bash
v2gif ./videos --dry-run
```

---

## ⚙️ Options

| Option             | Description                                                  | Default    |
|--------------------|--------------------------------------------------------------|------------|
| `-o, --output`     | Output folder for GIFs                                       | `./gifs`   |
| `--fps`            | Frames per second                                            | `10`       |
| `--width`          | Output width in pixels (ignored if `--scale` is used)       | `320`      |
| `--scale`          | Scale factor (e.g. `0.5` = 50% size)                         | `null`     |
| `--start`          | Start time in seconds                                       | `0`        |
| `--duration`       | Duration from start point (in seconds)                       | `null`     |
| `--open`           | Open the resulting GIF automatically                         | `false`    |
| `--clipboard`      | Copy resulting GIF to clipboard (macOS/Linux only)           | `false`    |
| `--recursive`      | Search subdirectories when folders are passed                | `false`    |
| `--dry-run`        | Show conversion details without running `ffmpeg`             | `false`    |

---

## 🧪 Requirements

- Node.js (v18+)
- [ffmpeg](https://ffmpeg.org/download.html) installed and available in your terminal

> To check: `ffmpeg -version`

---

## 📄 License

MIT © Devflorez
