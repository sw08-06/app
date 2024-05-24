# Frontend
This repository contains the code for the service responsible for the UI.

## Development
To install project dependencies, run:
```
npm install
```
Start a development server with the following command:
```
npm run dev
```
To automatically open the app in a new browser tab, use:
```
npm run dev -- --open
```

Alternatively, Docker Compose can be used. To run the entire system, the `deployment` repository must first be cloned from the organization. This repository contains the Docker Compose file for running the entire system. Additionally, the other repositories must be cloned for the `frontend`, `data_generator`, `stress_predictor`, and `api` components. After cloning, ensure that all these repositories are placed within the same folder.

Furthermore, a `.env` file must be created in the frontend root directory with the following environment variable:
```
VITE_API_URL="http://localhost:3000"
```

## Building
To create a production-ready version of the app, execute:
```
npm run build
```
After building the production version, you can preview it locally by running:
```
npm run preview
```

## Capacitor (Android)
Before integrating with Capacitor, ensure you have built the app for production:
```
npm run build
```
To synchronize changes with the Android project in Capacitor, use:
```
npx cap sync
```
To open the Android project in Android Studio and run it in an emulator, execute:
```
npx cap open android
```

## License
This project is licensed under the MIT License.