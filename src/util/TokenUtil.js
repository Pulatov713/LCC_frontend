// import {token_expired, token_name} from "../const.js";
//
// export const getToken=()=>{
//    let str= localStorage.getItem(token_name);
//    if (str){
//        let data = JSON.parse(str);
//        const now = new Date();
//        if (now.getTime() > data.expiry){
//            localStorage.removeItem(token_name);
//            return null;
//        }
//        return data.token;
//    }
//    return null;
// }
//
// export function setToken(token){
//     if (getToken()){
//         localStorage.removeItem(token_name);
//     }
//
//     const now = new Date();
//     let data={
//         token:token,
//         expiry: now.getTime() + token_expired
//     }
//
//     localStorage.setItem(token_name,JSON.stringify(data))
// }
// export function deleteToken(){
//     localStorage.removeItem(token_name);
// }


// Token ma'lumotlarini saqlash uchun sozlamalar
export const token_name = "java_g2_key"; // Tokenning saqlanadigan nomi
export const token_expired = 1000 * 60 * 60; // Tokenning amal qilish muddati (1 soat)

// Tokenni olish
// Agar token mavjud bo'lsa va uning muddati tugamagan bo'lsa, tokenni qaytaradi. Aks holda, null qaytaradi
export const getToken = () => {
    let str = localStorage.getItem(token_name); // LocalStorage-dan token ma'lumotlarini olish
    if (str) {
        let data = JSON.parse(str); // JSON formatidagi ma'lumotni obyektga aylantirish
        const now = new Date(); // Hozirgi vaqtni olish
        if (now.getTime() > data.expiry) { // Agar tokenning muddati tugagan bo'lsa
            localStorage.removeItem(token_name); // Tokenni localStorage-dan o'chirish
            return null; // Token mavjud emasligini bildirish
        }
        return data.token; // Tokenni qaytarish
    }
    return null; // Token mavjud emasligini bildirish
};

// Tokenni saqlash
// Yangi tokenni localStorage-ga saqlaydi va uning amal qilish vaqtini belgilaydi
export function setToken(token) {
    if (getToken()) {
        localStorage.removeItem(token_name); // Agar mavjud bo'lsa, eski tokenni o'chirish
    }

    const now = new Date(); // Hozirgi vaqtni olish
    let data = {
        token: token, // Yangi token
        expiry: now.getTime() + token_expired // Tokenning amal qilish muddati
    };

    localStorage.setItem(token_name, JSON.stringify(data)); // Tokenni localStorage-ga saqlash
}

// Tokenni o'chirish
// Tokenni localStorage-dan o'chiradi
export function deleteToken() {
    localStorage.removeItem(token_name); // Tokenni o'chirish
}

