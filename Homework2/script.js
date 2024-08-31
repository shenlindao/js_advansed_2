// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. 
// В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.
// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.
// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.
// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.
// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.


class Library {
    #books;
    constructor(initialBooks = []) {
        // Проверяем на дубликаты
        const uniqueBooks = Array.from(new Set(initialBooks));
        if (uniqueBooks.length !== initialBooks.length) {
            throw new Error('Ошибка: начальный список книг содержит дубликаты.');
        }
        // Инициализация списка книг
        this.#books = uniqueBooks;
    }

    // Получение списка книг
    get allBooks() {
        return this.#books;
    }

    // Добавление книги
    addBook(title) {
        if (this.hasBook(title)) {
            throw new Error(`Ошибка: книга с названием "${title}" уже существует в библиотеке.`);
        }
        this.#books.push(title);
    }

    // Удаление книги
    removeBook(title) {
        const bookIndex = this.#books.indexOf(title);
        if (bookIndex === -1) {
            throw new Error(`Ошибка: книга с названием "${title}" не найдена в библиотеке.`);
        }
        this.#books.splice(bookIndex, 1);
    }

    // Проверка наличия книги
    hasBook(title) {
        return this.#books.includes(title);
    }
}

try {
    const library = new Library(['1867', 'Война и мир']);
    console.log(library.allBooks); // (2) ['1867', 'Война и мир']

    library.addBook('Мастер и Маргарита');
    console.log(library.allBooks); // (3) ['1867', 'Война и мир', 'Мастер и Маргарита']

    console.log(library.hasBook('1867')); // true
    console.log(library.hasBook('Идиот')); // false

    library.removeBook('1867');
    console.log(library.allBooks); // (2) ['Война и мир', 'Мастер и Маргарита']

    // Попытка добавить дубликат для определения ошибки
    library.addBook('Война и мир');
} catch (error) {
    console.error(error.message);
}



// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.
// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.
// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.
// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.
document.addEventListener('DOMContentLoaded', function () {
    const initialData = [
        {
            product: "Apple iPhone 13",
            reviews: [
                {
                    id: "1",
                    text: "Отличный телефон! Батарея держится долго.",
                },
                {
                    id: "2",
                    text: "Камера супер, фото выглядят просто потрясающе.",
                },
            ],
        },
        {
            product: "Samsung Galaxy Z Fold 3",
            reviews: [
                {
                    id: "3",
                    text: "Интересный дизайн, но дорогой.",
                },
            ],
        },
        {
            product: "Sony PlayStation 5",
            reviews: [
                {
                    id: "4",
                    text: "Люблю играть на PS5, графика на высоте.",
                },
            ],
        },
    ];

    const reviewContainer = document.getElementById('reviewContainer');

    initialData.forEach(product => {
        product.reviews.forEach(review => {
            addReviewToPage(review.text);
        });
    });

    document.getElementById('submitButton').addEventListener('click', function () {
        const reviewInput = document.getElementById('reviewInput');
        const reviewText = reviewInput.value;

        try {
            addReview(reviewText);
            reviewInput.value = '';
        } catch (error) {
            alert(error.message);
        }
    });

    function addReview(reviewText) {
        if (reviewText.length < 50 || reviewText.length > 500) {
            throw new Error("Длина отзыва должна быть от 50 до 500 символов.");
        }
        addReviewToPage(reviewText);
    }

    function addReviewToPage(reviewText) {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerText = reviewText;
        reviewContainer.appendChild(reviewDiv);
    }
});