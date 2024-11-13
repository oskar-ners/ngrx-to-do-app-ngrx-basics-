import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ngrx-to-do-app',
        appId: '1:28743720081:web:3117167830218cef21b330',
        storageBucket: 'ngrx-to-do-app.firebasestorage.app',
        apiKey: 'AIzaSyCu8a119DeeMHrMxWksoGPJUz776_62v0o',
        authDomain: 'ngrx-to-do-app.firebaseapp.com',
        messagingSenderId: '28743720081',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
