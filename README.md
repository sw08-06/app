# Frontend

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