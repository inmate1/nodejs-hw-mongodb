//Создайте файл src/index.js. Импортируйте и вызовите в нем функцию setupServer.
//
import setupServer from "./server.js";
import initMongoConnection from "./db/initMongoConnection.js";


const bootstrap = async () => {
    await initMongoConnection()
setupServer()
}

bootstrap()

