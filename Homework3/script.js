// Урок 3. Промисы. Хранилище

// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах.
// Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:
// - Поле для ввода названия продукта.
// - Текстовое поле для самого отзыва.
// - Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:
// - Показывает список всех продуктов, о которых были оставлены отзывы.
// - При клике на название продукта отображается список всех отзывов по этому продукту.
// - Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

// Загрузка всех отзывов
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const productContainer = document.getElementById('productContainer');

    if (!productContainer) {
        console.error('Элемент с id="productContainer" не найден.');
        return;
    }

    productContainer.innerHTML = '';

    for (const product in reviews) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerText = product;

        productDiv.addEventListener('click', function () {
            showReviews(product, reviews[product]);
        });

        productContainer.appendChild(productDiv);
    }
}

// Показ отзывов
function showReviews(product, reviews) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = `<h2>${product}</h2>`;

    reviews.forEach((review, index) => {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review';
        reviewDiv.innerHTML = `
                <span>${review}</span>
                <span class="delete-button" onclick="deleteReview('${product}', ${index})">Удалить</span>
            `;
        productContainer.appendChild(reviewDiv);
    });
}

// Удаление отзыва
function deleteReview(product, index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    reviews[product].splice(index, 1);
    if (reviews[product].length === 0) {
        delete reviews[product];
    }
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews(); // Заново загружаем отзывы после удаления
}

document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('productContainer');
    if (productContainer) {
        loadReviews();
    }
    const submitButton = document.getElementById('submitButton');
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            const product = document.getElementById('productInput').value;
            const review = document.getElementById('reviewInput').value;

            if (product === '' || review === '') {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
            if (!reviews[product]) {
                reviews[product] = [];
            }

            reviews[product].push(review);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            document.getElementById('productInput').value = '';
            document.getElementById('reviewInput').value = '';
            alert('Отзыв добавлен!');
        });
    }
});

