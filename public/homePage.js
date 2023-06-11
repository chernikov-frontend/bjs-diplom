'use strict'
// выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(callback => { 
        if (callback.success) {
            alert("ВЫ вышли из личного кабинета"); // Алерты добавил для себя чтобы видеть ход выполнения функции
            location.reload();
        }
    });
};

// отображение данных пользовтеля
ApiConnector.current(callback => { 
    if (callback.success) {
        ProfileWidget.showProfile(callback.data);
    }
});

// Курсы валют
const ratesBoard = new RatesBoard();

function getRatesBoard() {
    ApiConnector.getStocks(callback => {
        if (callback.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(callback.data);
        }
    });
};

getRatesBoard();
setInterval(getRatesBoard, 60000);

//Операции с деньгами//
const moneyManager = new MoneyManager();
//пополнение счета //
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, `Счет успешно пополнен на ${data.amount}${data.currency}`);
        } else {
            moneyManager.setMessage(callback.success, callback.error);
        }
    });
};
//конвертация валюты //
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data,  callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, `Конвертация ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency} прошла успешно`);
        } else {
            moneyManager.setMessage(callback.success, callback.error);
        }
    });
};
//перевод валюты //
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data,  callback => {
        if (callback.success) {
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage(callback.success, `Вы успешно перевели - ${data.amount}${data.currency} пользователю с id ${data.to}`);
        } else {
            moneyManager.setMessage(callback.success, callback.error);
        }
    });
};

//Работа с избранным// 
const favoritesWidget = new FavoritesWidget();
//начальный список избранного//
ApiConnector.getFavorites(callback  => {
    if (callback.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(callback.data);
        moneyManager.updateUsersList(callback.data);
    }
});
//добавление пользователя в список избранных//
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, callback => {
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            favoritesWidget.setMessage(callback.success, `Вы успешно добавили пользователя ${data.name} в список избранных`);
        }else {
            favoritesWidget.setMessage(callback.success, callback.error);
        }
    });
};
//удаление пользователя из избранного//
favoritesWidget.removeUserCallback = id => {
    ApiConnector.removeUserFromFavorites(id, callback => {
        if (callback.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
            favoritesWidget.setMessage(callback.success, `Вы успешно удалили пользователя ${data.name} из списка избранных`);
        }else {
            favoritesWidget.setMessage(callback.success, callback.error);
        }
    });
};



