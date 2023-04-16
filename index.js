// подключаем необходимые модули
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// создаем экземпляр приложения
const app = express();

// устанавливаем соединение с базой данных MongoDB
const mongoDBUrl = "mongodb://root:example@mongo:27017";
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Подключено к MongoDB');
    })
    .catch((err) => {
        console.log('Ошибка подключения в MongoDB: ', err);
    });

// определяем схему и модель для коллекции в базе данных
const mySchema = new mongoose.Schema({
    name: String,
    email: String
});
const myModel = mongoose.model('MyCollection', mySchema);

// middleware для обработки данных в формате JSON
app.use(bodyParser.json());

// маршрут для получения всех записей
app.get('/api/mycollection', (req, res) => {
    myModel.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log('Ошибка при получении данных из MongoDB: ', err);
            res.status(500).json({ message: 'Ошибка при получении данных из MongoDB' });
        });
});

// маршрут для создания новой записи
app.post('/api/mycollection', (req, res) => {
    const { name, email } = req.body;
    const newData = new myModel({ name, email });
    newData.save()
        .then(() => {
            res.json({ message: 'Данные успешно сохранены' });
        })
        .catch((err) => {
            console.log('Ошибка при сохранении данных в MongoDB: ', err);
            res.status(500).json({ message: 'Ошибка при сохранении данных в MongoDB' });
        });
});

// устанавливаем порт для прослушивания запросов
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
