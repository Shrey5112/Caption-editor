# Caption Editor

## 📌 Overview
The Caption Editor is a React-based application that allows users to upload videos, import SRT subtitle files, and edit captions dynamically. It provides real-time synchronization of captions with the video, styling options, and an intuitive user interface.

## 🚀 Features
- **Video Upload & Playback**: Users can upload and play video files.
- **SRT File Import & Parsing**: Supports drag-and-drop and manual file selection for subtitle files.
- **Dynamic Caption Editing**: Modify captions inline, adjust positioning, and maintain real-time sync.
- **Real-Time Caption Display**: Overlays captions on the video as it plays.
- **Theming Support**: Light & dark mode UI.
- **Error Handling**: Alerts for missing captions, invalid files, and timestamp mismatches.

## 📂 Folder Structure
```
📁 caption-editor/
 ┣ 📁 src/
 ┃ ┣ 📁 components/  # React components
 ┃ ┃ ┣ 📄 CaptionEditor.tsx  # Main caption editing UI
 ┃ ┃ ┣ 📄 VideoPlayer.tsx  # Video playback with live captions
 ┃ ┃ ┣ 📄 SRTUploader.tsx  # Upload & parse SRT files
 ┃ ┃ ┣ 📄 VideoUploader.tsx  # Upload videos
 ┃ ┣ 📁 store/  # Zustand state management
 ┃ ┃ ┣ 📄 useCaptionStore.ts  # Caption state management
 ┣ 📄 README.md  # Project documentation
 ┣ 📄 package.json  # Dependencies & scripts
 ┣ 📄 tsconfig.json  # TypeScript configuration
```

## 🛠️ Installation
### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup
```sh
git clone https://github.com/Shrey5112/Caption-editor
cd caption-editor
npm install  # or yarn install
```

## ▶️ Running the App
```sh
npm run dev  # Runs the development server
```
Visit to use the application.

## 🧪 Testing
### Run Unit & Integration Tests
```sh
npm test
```

## 📝 API Specifications
The application processes SRT files using the **srt-parser-2** library. Example parsed caption format:
```json
[
  {
    "start": 0.5,
    "text": "Hello, world!"
  }
]
```

## 🛠️ Troubleshooting
| Issue | Solution |
|--------|------------|
| Captions not loading | Ensure the SRT file is correctly formatted |
| Video not playing | Check if the file format is supported (.mp4, .webm, .mov) |
| Styling not applied | Ensure TailwindCSS is properly configured |

## 🏗️ Future Enhancements
- **Multi-language subtitle support**
- **AI-powered auto-captioning**
- **Export captions in multiple formats (VTT, SRT, TXT)**


🔥 Built with React, Zustand, TypeScript, TailwindCSS.

