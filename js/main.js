var box = [];

/**
 * Список товаров
 */
const products = [
    { id: 1, title: 'Notebook', img: 'img', catalog_img: 'notebook.jpg', price: 2000 },
    { id: 2, title: 'Mouse', img: 'img', catalog_img: 'mouse.jpg', price: 20 },
    { id: 3, title: 'Keyboard', img: 'img', catalog_img: 'keyboard.jpg', price: 200 },
    { id: 4, title: 'Gamepad', img: 'img', catalog_img: 'gamepad.jpg', price: 50 },
];

/**
 * Коробка для карточек
 * @param {*} id            номер карточки
 * @param {*} title         Название продукта
 * @param {*} price         цена
 * @param {*} img           ссылка на картинку
 */
function Product(id, title, price, img, catalog_img) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.catalog_img = catalog_img;
    this.img = img;
}

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (prod) => {

    box.push(new Product);				//Создать объект и добавить в масив объектов

    box[prod.id - 1].id = prod.id;
    box[prod.id - 1].title = prod.title;
    box[prod.id - 1].price = prod.price;
    box[prod.id - 1].catalog_img = prod.catalog_img;
    box[prod.id - 1].img = prod.img;

    return `<div class="product-item">
                <h3 class = "title">${box[prod.id - 1].title}</h3>
                <img src="${box[prod.id - 1].img}/${box[prod.id - 1].catalog_img}" alt="img_${box[prod.id]}" style="width: 190px; height: 140px;">
                <p class = "price">${box[prod.id - 1].price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {

    const productsList = list.map(item => renderProduct(item));
    console.log(box);
    console.log(productsList);


    //не понял почему, но если объединить каждую ячейку массива в строку c указанием разделителя то все получается.
    //Если разделитель не поставить productsList.join() запятая остается.
    document.querySelector('.products').innerHTML = productsList.join('');

    //Не понял почему каждый новый элемент массива стирает старый в конце выполнения кода остается одна последняя ячейка массива
    // for(let i = 0; i < 4; i++){
    //     document.querySelector('.products').innerHTML = productsList[i];
    // }
};

renderPage(products);