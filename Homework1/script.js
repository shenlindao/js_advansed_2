// Задание 1
// Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

const musicCollection = {
    albums: [
        { title: "Dark Side of the Moon", artist: "Pink Floyd", year: "1973" },
        { title: "Abbey Road", artist: "The Beatles", year: "1969" },
        { title: "Hotel California", artist: "Eagles", year: "1976" }
    ],
    [Symbol.iterator]: function() {
        let index = 0;
        const albums = this.albums;
        
        return {
            next: function() {
                if (index < albums.length) {
                    return { value: albums[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}

/*
// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:
// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:
// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

// Блюда и их повара:
// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

// Заказы:
// Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
// Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
// Клиент Ирина заказала: Чизкейк.
*/


// Повара и их специализации
const chefs = new Map([
    ['Виктор', 'Пицца'],
    ['Ольга', 'Суши'],
    ['Дмитрий', 'Десерты']
]);

// Блюда и их повара
const dishes = new Map([
    ['Пицца "Маргарита"', 'Виктор'],
    ['Пицца "Пепперони"', 'Виктор'],
    ['Суши "Филадельфия"', 'Ольга'],
    ['Суши "Калифорния"', 'Ольга'],
    ['Тирамису', 'Дмитрий'],
    ['Чизкейк', 'Дмитрий']
]);

// Заказы клиентов
const customerOrders = new Map();

// Клиенты
const customer1 = { name: 'Алексей' };
const customer2 = { name: 'Мария' };
const customer3 = { name: 'Ирина' };



// Добавление заказа
function addOrder(customer, orderedDishes) {
    customerOrders.set(customer, orderedDishes);
}

addOrder(customer1, ['Пицца "Пепперони"', 'Тирамису']);
addOrder(customer2, ['Суши "Калифорния"', 'Пицца "Маргарита"']);
addOrder(customer3, ['Чизкейк']);


function displayOrders() {
    customerOrders.forEach((orderedDishes, customer) => {
        console.log(`${customer.name} заказал:`);
        orderedDishes.forEach(dish => {
            const chef = dishes.get(dish);
            console.log(`- ${dish} (готовит: ${chef})`);
        });
    });
}

displayOrders();


