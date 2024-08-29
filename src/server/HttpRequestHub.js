// // ./host.js faylidan axiosInstant import qilinmoqda
// import { axiosInstant } from "./host.js";
//
// // HttpRequestHub funksiyasi yaratildi
// export const HttpRequestHub = (config) => {
//    return axiosInstant(config);
// }


import { axiosInstant } from "./host.js";

// HTTP so'rovlarini yuborish uchun umumiy funksiya
// So'rov konfiguratsiyasini qabul qiladi va `axiosInstant` obyekti yordamida so'rov yuboradi
export const HttpRequestHub = (config) => {
   return axiosInstant(config); // `axiosInstant` yordamida so'rov yuborish
}
