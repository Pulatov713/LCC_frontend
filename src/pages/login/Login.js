import React from "react";
import { Button, Form, Input } from "antd";
import { signin } from "../../server/config/Login.js";
import { deleteToken, setToken } from "../../util/TokenUtil.js";

const imageLogin = "././login.png";

class Login extends React.Component {
    // Komponent holatini boshlang'ich qiymatlari
    state = {
        username: '',
        password: '',
    };

    // Kirish sahifasining fon stili
    divStyle = {
        backgroundImage: `url("${imageLogin}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: "100%",
        height: '69vh',
        margin: "0 auto",
        paddingTop: '15%',
    };

    // Kirish ma'lumotlarini o'zgartirish va holatni yangilash
    handleChangeInput = (key, e) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    // Formani yuborish
    onFinish = () => {
        const { username, password } = this.state;
        const obj = { username, password };

        signin(obj)
            .then((res) => {
                console.log(res)
                if (res && res.data) {
                    // Resursdan javob statusi tekshirilmoqda
                    if (res.status === 200) {
                        const dto = res.data;
                        // Javobdan muvaffaqiyatli kirish tokeni tekshirilmoqda
                        if (dto.success && dto.data && dto.data.access_token) {
                            setToken(dto.data.access_token); // Muvaffaqiyatli kirish uchun token saqlash
                            window.location.reload(); // Kirish muvaffaqiyatli bo'lsa sahifani qayta yuklash
                        } else {
                            // Javobda success bo'lmasa yoki access_token mavjud bo'lmasa
                            alert(dto.message || "Kirish muvaffaqiyatsiz bo'ldi. Iltimos qayta urinib ko'ring.");
                        }
                    } else {
                        // Status kodi 200 bo'lmasa, tokenni o'chirish va xabar berish
                        deleteToken(); // So'rov muvaffaqiyatsiz bo'lsa tokenni o'chirish
                        alert("Xato: So'rovni qayta ishlash mumkin emas. Iltimos qayta urinib ko'ring.");
                    }
                } else {
                    // Agar `res` yoki `res.data` mavjud bo'lmasa
                    alert("Xato: Kutilmagan javob formati.");
                }
            })
            .catch((error) => {
                // Xatoliklar bo'yicha xabar berish
                console.error("Xato:", error.response ? error.response.data : error.message || error); // Xatolik ma'lumotlarini konsolga chiqarish
                alert("Xato yuz berdi. Iltimos keyinroq qayta urinib ko'ring."); // Foydalanuvchiga xato haqida xabar berish
            });


    };

    render() {
        return (
            <div style={this.divStyle}>
                <h2 style={{ textAlign: "center" }}>O'qitish Boshqaruv Tizimi</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }} // Yorliq ustun kengligi
                    wrapperCol={{ span: 16 }} // Qoplama ustun kengligi
                    style={{
                        textAlign: "center",
                        maxWidth: '66%',
                        paddingLeft: '20%',
                    }}
                    initialValues={{ remember: true }} // Formaning boshlang'ich qiymatlari
                    onFinish={this.onFinish} // Formani yuborish uchun funktsiya
                    autoComplete="off" // Avtomatik to'ldirishni o'chirish
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: "Iltimos, foydalanuvchi nomingizni kiriting!" },
                        ]}
                    >
                        <Input
                            value={this.state.username}
                            onChange={(e) => this.handleChangeInput("username", e)} // Username holatini yangilash
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Iltimos, parolingizni kiriting!" },
                        ]}
                    >
                        <Input.Password
                            value={this.state.password}
                            onChange={(e) => this.handleChangeInput("password", e)} // Parol holatini yangilash
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }} // Yuborish tugmasini joylash
                    >
                        <Button type="primary" htmlType="submit">
                            Yuborish
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;
