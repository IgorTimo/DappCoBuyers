# DappCoBuyers
Чтобы всё заработало надо предпринять несколько нехитрых операций.
1. Установить <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/">MongoDB</a> и запустить её на локалке командой `brew services start mongodb-community@5.0`
2. Установить <a href="https://nodejs.org/en/download/">Node.js</a>
3. Cкачать/клонировать/форкнуть проект.
4. В теминале, находясь в папке `client` запустить команду `npm install`
5. В теминале, находясь в папке `server` запустить команду `npm install`
6. В теминале, находясь в папке `ethereum` запустить команду `npm install`
7. В файле `ethereum/hardhat.config.js` прописать свой ключ и адрес на инфуре. Потом задеплоить контракт командой `npx hardhat run scripts/deploy.js --network rinkeby`
8. Адрес задеплоинного котракта вставить в `client/purchaseFactory.js` как значение привязки `address`
9. Запустить сервер, находясь в папке `server` командой `npm start`
10. Запустить сервер, находясь в папке `client` командой `npx next dev`
