// import axios from "axios";
// import { host, port } from "./const.js";
// import { getToken } from "../util/TokenUtil.js";
//
// // Tokenni olish
// let token = getToken();
//
// // So'rov sarlavhalarini sozlash
// const headers = {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     // Token mavjud bo'lsa, Authorization sarlavhasini qo'shing
//     "Authorization": token ? `Bearer ${token}` : undefined
// };
//
// // axiosInstant ob'ektini yaratish
// export const axiosInstant = axios.create({
//     baseURL: `${host}:${port}/api`, // Bazaviy URL
//     timeout: 5000, // So'rov vaqt o'chirilishi
//     headers: headers // Sarlavhalar
// });


import axios from "axios";
import { host, port } from "./const.js";
import { getToken } from "../util/TokenUtil.js";

// Tokenni olish
let token = getToken();

// So'rov sarlavhalarini sozlash
const headers = {
    "Content-Type": "application/json", // So'rovning ma'lumot turi JSON bo'lishi
    "Accept": "application/json", // So'rov javobining ma'lumot turi JSON bo'lishi
    // Token mavjud bo'lsa, Authorization sarlavhasini qo'shing
    "Authorization": token ? `Bearer ${token}` : undefined
};

// axiosInstant ob'ektini yaratish
// Bu ob'ekt HTTP so'rovlarini yuborish uchun asosiy konfiguratsiyani belgilaydi
export const axiosInstant = axios.create({
    baseURL: `${host}:${port}/api`, // Bazaviy URL, API so'rovlarining asosiy manzili
    timeout: 5000, // So'rovlar uchun maksimal vaqt (5 soniya)
    headers: headers // So'rov sarlavhalari
});

