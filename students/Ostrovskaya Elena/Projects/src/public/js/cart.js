class Cart {
    constructor(){
        this.items = [];
        this.total = 0;
        this.sum = 0;
        this.container = document.querySelector ('.cart-block');
        this.quantityBlock = document.querySelector ('#quantity');
        this.priceBlock = document.querySelector ('#price');
    }

    /**
     *Обработчик события - нажатие на кнопку удалить продукта в корзине
     *
     */
    _handleEvents () {
        this.container.addEventListener ('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct (evt.target)
            }
        })
    }

    /**
     *Удаляет выбранный продукт
     *
     * @param {*} product
     */
    deleteProduct (product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice (this.items.indexOf(find), 1);
        }
         
        this._checkTotalAndSum ();
        this.render ();
    }
    
    /**
     *Считает общую сумму товаров
     *
     * @memberof Cart
     */
    _checkTotalAndSum () {
        let qua = 0;
        let pr = 0;
        this.items.forEach (item => {
            qua += item.quantity;
            pr += item.price * item.quantity;
        })
        this.total = qua;
        this.sum = pr;
    }
    /**
     *Вставляет товары в HTML-разметку корзины
     *
     * @memberof Cart
     */
    render () {
        let itemsBlock = this.container.querySelector ('.cart-items')
        let str = ''
        this.items.forEach (item => {
            str += `<div class="cart-item" data-id="${item.id_product}">
                    <img src="https://placehold.it/100x80" alt="">
                    <div class="product-desc">
                        <p class="product-title">${item.product_name}</p>
                        <p class="product-quantity">${item.quantity}</p>
                        <p class="product-single-price">${item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${item.id_product}">&times;</button>
                    </div>
                </div>`
        })
        itemsBlock.innerHTML = str
        this.quantityBlock.innerText = this.total
        this.priceBlock.innerText = this.sum
    }

    /**
     *Добавляет товар в корзину
     *
     * @param {*} product
     * @memberof Cart
     */
    addProduct (product) {
        let id = product.dataset['id'];
        let find = this.items.find (product => product.id_product === id);
        if (find) {
            find.quantity++;
        } else {
            let prod = this._createNewProduct (product);
            this.items.push (prod);
        }
         
        this._checkTotalAndSum ();
        this.render ();
    }

    /**
     *Возвращает массив с параметрами товара
     *
     * @param {*} prod
     * @returns
     * @memberof Cart
     */
    _createNewProduct (prod) {
        return {
            product_name: prod.dataset['name'],
            price: prod.dataset['price'],
            id_product: prod.dataset['id'],
            quantity: 1
        }
    }
}