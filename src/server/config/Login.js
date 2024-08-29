// import {HttpRequestHub} from "../HttpRequestHub.js";
//
// export const signin=(data)=>{
//     const config={
//         url:'/auth/signin',
//         method:'POST',
//         data:{
//             ...data
//         }
//     }
//
//     return HttpRequestHub(config);
// }

import { HttpRequestHub } from "../HttpRequestHub.js";

// Foydalanuvchini tizimga kirish uchun so'rov yuboradi
// Bu funksiya /auth/signin URL'ga POST so'rov yuboradi va foydalanuvchi kirish ma'lumotlarini yuboradi
export const signin = (data) => {
    // So'rov konfiguratsiyasini belgilash
    const config = {
        url: '/auth/signin', // API endpoint: foydalanuvchini tizimga kirish uchun
        method: 'POST', // So'rov usuli: POST - ma'lumot yuborish uchun
        data: { // POST so'rovining tanasi: foydalanuvchi kirish ma'lumotlari
            ...data // Kirish ma'lumotlari: `data` obyektidan to'liq nusxasini olish
        }
    };

    // HttpRequestHub yordamida so'rov yuboradi va javobni qaytaradi
    return HttpRequestHub(config);
}
