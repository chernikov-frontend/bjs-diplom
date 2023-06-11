"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, (callback) => {
        if (callback.success) {
            alert("Успешная авторизация"); // Алерты добавил для себя чтобы видеть ход выполнения функции
            location.reload();
        } else {
            userForm.setLoginErrorMessage(`Неудачаная авторизация: ${callback.error}`);
        }
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, (callback) => {
        if (callback.success) {
            alert("Успешная регистрация");// Алерты добавил для себя чтобы видеть ход выполнения функции
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(`Неудачаная регистрация: ${callback.error}`);
        }
    });
};