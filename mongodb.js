const mongoose = require('mongoose');

// Адрес контейнера MongoDB
const mongoDBUrl = "mongodb://root:example@mongo:27017";


const personSchema = new mongoose.Schema({
    name: String,
    email: String
});

const personModel = mongoose.model('Person', personSchema);


mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log('Подключено к MongoDB');
        createData();
    })
    .catch((err) => {
        console.log('Ошибка подключения в MongoDB: ', err);
    });

async function createData() {

    const myData = new personModel({ name: 'John2', email: 'john@example.com' });
    await myData.save()
        .then(() => console.log('Data saved successfully'))
        .catch((err) => console.log('Error saving data:', err));
}

async function getData() {
    try {
        const data = await personModel.find({});
        console.log(data);
        return data;
    } catch (err) {
        console.log('Error getting data:', err);
        return [];
    }
}

module.exports = {
    getData
};
