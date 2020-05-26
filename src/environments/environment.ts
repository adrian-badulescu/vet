// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyC54eaTJEsr8vTwLLXWkpe54AZ_YuEtj78",
    authDomain: "cloudstorage-c6914.firebaseapp.com",
    databaseURL: "https://cloudstorage-c6914.firebaseio.com",
    projectId: "cloudstorage-c6914",
    storageBucket: "cloudstorage-c6914.appspot.com",
    messagingSenderId: "84841941271",
    appId: "1:84841941271:web:c370581f07e9f156"
  },
  server: {
    
    url:'http://localhost:3000'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
