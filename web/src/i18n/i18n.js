'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './en.json' // English translations
import translationDE from './de.json' // German Translations
// Import translations for other languages as needed

const ln = typeof localStorage !== "undefined" ? localStorage.getItem('language') || 'en' : 'en'
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: { translation: translationEN }, // English
            de: { translation: translationDE }, // German
            // Add more languages and translations as needed
        },
        // resources :{
        //     en : translationEN,
        //     de : translationDE
        // },
        lng: 'de', // default language
        fallbackLng: 'de', // fallback language if a translation is missing
        interpolation: {
            escapeValue: false // react already safe from xss
        },
        react: {
            useSuspense: false // fixes Suspense related errors
        }
    })


// export function changeLanguage(lang) {
//     i18n.changeLanguage(lang);
//     console.log(lang,"lang");
//     }
export default i18n
