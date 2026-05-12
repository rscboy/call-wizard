<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bb39b06e-678a-4326-a080-6b58f92ec78f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build and Preview Static Files

The root `index.html` is a Vite source file. Do not open it directly from Finder or the browser as a `file://` URL; the browser cannot compile `src/main.tsx` on its own.

To test the static build locally:

1. Build the app:
   `npm run build`
2. Serve the built files:
   `npm run preview`
3. Open the local preview URL shown in the terminal.

For GitHub Pages or another static host, deploy the contents of the `dist` folder after running `npm run build`.
