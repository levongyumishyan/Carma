- Expo + React Native
- TypeScript codebase
- Clerk authentication
- Google & Apple OAuth sign-in
- Bottom tab navigation
- NativeWind (Tailwind CSS)
- iOS & Android support

## Getting Started

Clone the repository:

```bash
git clone https://github.com/levongyumishyan/Carma.git
cd Carma/carma-app

Install dependencies:

npm install

or

pnpm install

Create a .env file inside carma-app:

EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Start the development server:

npm start

Run the app:

npm run android
npm run ios

## Project Structure

Carma/
├── carma-app/
│   ├── assets/
│   ├── hooks/
│   ├── lib/
│   ├── navigation/
│   ├── screens/
│   ├── App.tsx
│   ├── app.json
│   ├── babel.config.js
│   ├── global.css
│   ├── index.ts
│   ├── metro.config.js
│   ├── nativewind-env.d.ts
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md

## Authentication

Carma uses Clerk for authentication. Supported providers include Google and Apple. Make sure your Clerk project is properly configured and your publishable key is added to the .env file.

Notes

If Android build fails, try clearing and rebuilding native files:

rm -rf android
npx expo prebuild --clean
Use Java 17 for best compatibility
Ensure Android SDK and emulator are properly configured
License

This project is provided as-is unless otherwise specified.


---

If you want next level, I can also:
- add **screenshots section**
- add **badges (Expo, TypeScript, Clerk)**
- or make it look like a **top-tier open-source repo** 👌
