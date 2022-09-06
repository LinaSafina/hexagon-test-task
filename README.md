# Hexagon, Тестовое задание

Сервис по получению по произвольной ссылке (например https://docs.docker.com/engine/reference/commandline/attach/) короткой ссылки (http://79.143.31.216/s/7ASMU), реализующей перенаправление пользователя на исходную страницу.

В приложении пользователь может:

1. Зарегистрироваться или авторизоваться
2. Создать произвольное количество сокращенных ссылок
3. Просматривать количество переходов по каждой из коротких ссылок
4. Сортировать данные в таблице по столбцам (кликнув на заголовок соответствующего столбца)
5. Скопировать короткую ссылку, нажав на иконку копирования

## Стек технологий

- Приложение создано с помощью [CRA](https://github.com/facebook/create-react-app) (React 18), выполнено на TypeScript. Версия Node - **v16.13.2** (также указана в файле .nvmrc)
- В качестве стейт менеджера использован [Redux](https://redux.js.org/) (с использованием [ReduxToolkit](https://redux-toolkit.js.org/)).
- Использовалась UI-библиотека компонентов MUI, а также Styled-components для стилизации компонент.
- для реализации регистрации, авторизации пользователя, сортировки данных в таблице, получения коротких ссылок, пагинации использованы запросы к [API](http://79.143.31.216/docs).
- для копирования коротких ссылок использовалась библиотека react-copy-to-clipboard

## Запуск приложения

**Приложение развернуто и доступно [ЗДЕСЬ](https://hexagon-test-task.web.app)**

1. склонировать к себе на компьютер ветку main и установить все зависимости (_npm i_)

2. запустить приложение в режиме разработки - **npm start**. Открыть **http://localhost:3000** (страница входа в приложение) в браузере, если это не произошло автоматически.

3. войти в приложение, если уже есть учетная запись или зарегистрироваться в нем.
   Для входа в приложение можно использовать одни из следующих данных:

- логин - *user1@gmail.com*
  пароль - _User1_
- логин - *user2@gmail.com*
  пароль - _User2_
- логин - *user3@gmail.com*
  пароль - _User3_
