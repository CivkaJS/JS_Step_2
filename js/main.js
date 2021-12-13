var temp_product = [];
var summ_page_item = 0;
var summ_bucket_item = 0;
class GoodsList {
    constructor(product, price, count) {
        this.temp_product = product;
        this.summ_page_item = 0;
        this.summ_bucket_item = 0;
        this.price = price;
        this.count = count;
    }
}

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
        this.container = document.querySelector(container);
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

class GoodsList extends ProductItem {
    constructor(product, price, count) {
        this.temp_product = product;
        this.summ_page_item = 0;
        this.summ_bucket_item = 0;
        this.price = price;
        this.count = count;
    }
}

class BucketItem extends ProductItem {
    constructor(product, img = 'img', container = `.bucket`, container_summ = '.count-title') {
        super(product, img, container, container_summ);

        this.id = this.id - 1;
        // this.title = product.title;
        // this.price = product.price;
        // this.img = img;
        // this.catalog_img = product.catalog_img;
        // this.container = document.querySelector(.bucket);
        this.objPageSumm = document.querySelector(container_summ);
        this.count = 1;
    }

    renderBucket() {
        return `<div id="${this.id}-box" class="bucket-item">
            <div>
            <h3 class = "title">${this.title}</h3>
            <img src="${this.img}/${this.catalog_img}" alt="img_${this.id}" style="width: 100px; height: 70px;">
            </div>
            <div id="${this.id}-price" class = "price">
            <p>${this.count}шт. ${this.price} $</p>
            </div>
            <div class = "count-item">
            <button id="${this.id}-add" class="count-add">+</button>
            <button id="${this.id}-delete" class="count-delete">-</button>
            </div>
         </div>`
    }

    addItems() {
        this.container.insertAdjacentHTML("beforeend", this.renderBucket());
        temp_product[this.id] = new BucketItem(list.goods[this.id], this.number_item);
        summ_page_item++;
        console.log(temp_product);
    }

    summItem() {
        temp_product[this.id].count++;
        summ_page_item++;
        temp_product[this.id].price = this.price * temp_product[this.id].count;
        document.querySelector(`[id="${this.id}-price"]`).innerHTML = `${temp_product[this.id].count}шт. ${temp_product[this.id].price} $`;
    }

    deleteItem() {
        temp_product[this.id].count--;
        summ_page_item--;
        temp_product[this.id].price = this.price * temp_product[this.id].count;
        document.querySelector(`[id="${this.id}-price"]`).innerHTML = `${temp_product[this.id].count}шт. ${temp_product[this.id].price} $`;;
    }

    finishSummPage() {
        this.objPageSumm.innerHTML = summ_page_item;
    }

    finishSumm() {
        summ_bucket_item += this.price;
        document.querySelector('.summ_price').innerHTML = `${summ_bucket_item} $`;
    }

    finishDelete() {
        summ_bucket_item -= this.price;
        document.querySelector('.summ_price').innerHTML = `${summ_bucket_item} $`;
    }

    static getIDEvent(object) {
        let number_item = object.currentTarget.getAttribute('id');
        number_item = number_item.split('');
        number_item = number_item.find(item => String(parseInt(item, 10)) === String(item));
        return number_item;
    }

    static getIDObject(object) {
        let number_item = object.getAttribute('id');
        number_item = number_item.split('');
        number_item = number_item.find(item => String(parseInt(item, 10)) === String(item));
        return number_item;
    }

    addButton() {
        document.querySelectorAll('.count-add').forEach((item) => {
            item.addEventListener('click', event => {
                event.preventDefault();

                const bucket_item = new BucketItem(list.goods[BucketItem.getIDEvent(event)]);
                bucket_item.summItem();
                bucket_item.finishSumm();
                bucket_item.finishSummPage();
            });
        });
    }

    deleteButton() {
        document.querySelectorAll('.count-delete').forEach((item) => {
            item.addEventListener('click', event => {
                event.preventDefault();

                const bucket_item = new BucketItem(list.goods[BucketItem.getIDEvent(event)]);
                bucket_item.deleteItem();
                bucket_item.finishDelete();
                bucket_item.finishSummPage();

                if (temp_product[this.id].count == 0) {
                    temp_product[this.id] = 0;

                    if (this.container.hasChildNodes()) {           //Не пуст ли объект, есть ли у него дети
                        var children = this.container.childNodes;
                        children.forEach(box => {
                            if (BucketItem.getIDObject(box) == this.id) {
                                box.remove();
                            }
                        })
                    }
                }
            });
        });
    }
}

let list = new ProductList();
let goods = new GoodsList();

document.querySelectorAll('.buy-btn').forEach((item) => {
    item.addEventListener('click', event => {

        const number_item = event.currentTarget.getAttribute('id');
        const bucket_item = new BucketItem(list.goods[number_item]);

        if ((temp_product[number_item] === undefined) ||
            (temp_product[number_item] == 0)) {
            bucket_item.addItems();

        }
        else {
            bucket_item.summItem();
        }

        bucket_item.addButton();
        bucket_item.deleteButton();
        bucket_item.finishSumm();
        bucket_item.finishSummPage();
    });
});
