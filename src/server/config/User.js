// import {HttpRequestHub} from "../HttpRequestHub.js";
//
// export const userInfo=()=>{
//     const config={
//         url:'/user/get-user-info',
//         method:'GET',
//     }
//     return HttpRequestHub(config);
// }


import { HttpRequestHub } from "../HttpRequestHub.js";

// Foydalanuvchi ma'lumotlarini olish uchun so'rov yuboradi
// Bu funksiya /user/get-user-info URL'ga GET so'rov yuboradi va foydalanuvchi ma'lumotlarini qaytaradi
export const userInfo = () => {
    // So'rov konfiguratsiyasini belgilash
    const config = {
        url: '/user/get-user-info', // API endpoint: foydalanuvchi ma'lumotlarini olish uchun
        method: 'GET', // So'rov usuli: GET - ma'lumot olish uchun
    };
    // HttpRequestHub yordamida so'rov yuboradi va javobni qaytaradi
    return HttpRequestHub(config);
}
