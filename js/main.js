var temp_product = [];
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', catalog_img: 'notebook.jpg', price: 2000 },
            { id: 2, title: 'Mouse', catalog_img: 'mouse.jpg', price: 20 },
            { id: 3, title: 'Keyboard', catalog_img: 'keyboard.jpg', price: 200 },
            { id: 4, title: 'Gamepad', catalog_img: 'gamepad.jpg', price: 50 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            console.log(item);
            block.insertAdjacentHTML("beforeend", item.renderPage());
        }
    }
}
class ProductItem {
    constructor(product, img = 'img', container = '.bucket') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
        this.catalog_img = product.catalog_img;
        this.container = container;
    }

    renderPage() {
        return `<div class="product-item">
            <h3 class = "title">${this.title}</h3>
            <img src="${this.img}/${this.catalog_img}" alt="img_${this.id}" style="width: 190px; height: 140px;">
            <p class = "price">${this.price}</p>
            <button id="${this.id - 1}" class="buy-btn">Купить</button>
            </div>`
    }


}
class BucketItem {
    constructor(product, number_item, img = 'img', container = '.bucket') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.price_addres = Number(number_item);
        this.img = img;
        this.catalog_img = product.catalog_img;
        this.number_item = number_item;
        this.container = document.querySelector(container);
        // this.count = count;
    }

    renderBucket() {
        return `<div class="bucket-item">
            <div>
            <h3 class = "title">${this.title}</h3>
            <img src="${this.img}/${this.catalog_img}" alt="img_${this.id}" style="width: 100px; height: 70px;">
            </div>
            <p id="${this.id - 1}" class = "price">${1}x ${this.price} р</p>
         </div>`
    }

    addItems() {
        this.container.insertAdjacentHTML("beforeend", this.renderBucket());
        temp_product[this.number_item] = new BucketItem(list.goods[this.number_item], this.number_item);
        // this.addItems(bucket_item);
    }

    summItem() {

        document.querySelector(`"#${this.price_addres}"`).price_addres.innerHTML = `${2}x ${this.price} р`;;
    }
}

let list = new ProductList();


document.querySelectorAll('.buy-btn').forEach((item) => {
    item.addEventListener('click', event => {


        const number_item = event.currentTarget.getAttribute('id');
        const bucket_item = new BucketItem(list.goods[number_item], number_item);
        console.log(temp_product);

        if (temp_product[number_item] === undefined) {
            bucket_item.addItems();
        }
        else {
            bucket_item.summItem();
        }

    });
});



// var box = [];

// /**
//  * Список товаров
//  */
// const products = [
//     { id: 1, title: 'Notebook', img: 'img', catalog_img: 'notebook.jpg', price: 2000 },
//     { id: 2, title: 'Mouse', img: 'img', catalog_img: 'mouse.jpg', price: 20 },
//     { id: 3, title: 'Keyboard', img: 'img', catalog_img: 'keyboard.jpg', price: 200 },
//     { id: 4, title: 'Gamepad', img: 'img', catalog_img: 'gamepad.jpg', price: 50 },
// ];

// /**
//  * Коробка для карточек
//  * @param {*} id            номер карточки
//  * @param {*} title         Название продукта
//  * @param {*} price         цена
//  * @param {*} img           ссылка на картинку
//  */
// class Product {
//     constructor(id, title, price, img, catalog_img) {
//         this.id = id;
//         this.title = title;
//         this.price = price;
//         this.catalog_img = catalog_img;
//         this.img = img;
//     }
// }


// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (prod) => {

//     box.push(new Product);				//Создать объект и добавить в масив объектов

//     box[prod.id - 1].id = prod.id;
//     box[prod.id - 1].title = prod.title;
//     box[prod.id - 1].price = prod.price;
//     box[prod.id - 1].catalog_img = prod.catalog_img;
//     box[prod.id - 1].img = prod.img;

//     return `<div class="product-item">
//                 <h3 class = "title">${box[prod.id - 1].title}</h3>
//                 <img src="${box[prod.id - 1].img}/${box[prod.id - 1].catalog_img}" alt="img_${box[prod.id]}" style="width: 190px; height: 140px;">
//                 <p class = "price">${box[prod.id - 1].price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };

// const renderPage = list => {

//     const productsList = list.map(item => renderProduct(item));
//     console.log(box);
//     console.log(productsList);


//     //не понял почему, но если объединить каждую ячейку массива в строку c указанием разделителя то все получается.
//     //Если разделитель не поставить productsList.join() запятая остается.
//     document.querySelector('.products').innerHTML = productsList.join('');
// };

// renderPage(products);