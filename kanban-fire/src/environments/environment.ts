
// Import the functions you need from the SDKs you need
// @ts-ignore
import { initializeApp } from 'firebase/app';
// @ts-ignore
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBsyhE3VH1VJBiXEFdrFaTSqgc7GYhkQeY',
    authDomain: 'kanbanfire-b114c.firebaseapp.com',
    projectId: 'kanbanfire-b114c',
    storageBucket: 'kanbanfire-b114c.appspot.com',
    messagingSenderId: '669525602241',
    appId: '1:669525602241:web:71fd460997836619768940',
    measurementId: 'G-9G61948W5L'
  }
};




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig = {
//   apiKey: 'AIzaSyBsyhE3VH1VJBiXEFdrFaTSqgc7GYhkQeY',
//   authDomain: 'kanbanfire-b114c.firebaseapp.com',
//   projectId: 'kanbanfire-b114c',
//   storageBucket: 'kanbanfire-b114c.appspot.com',
//   messagingSenderId: '669525602241',
//   appId: '1:669525602241:web:71fd460997836619768940',
//   measurementId: 'G-9G61948W5L'
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);







/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
