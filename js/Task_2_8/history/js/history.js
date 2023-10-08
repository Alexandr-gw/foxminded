function initCountriesOfTheWorld() {
    fetchItemsData()
    async function fetchItemsData() {
        try {
            const responseItems = await fetch('../../json/data.json');
            let newData = []
            await responseItems.json().then((data) => newData = data)
            getItems(newData)
        } catch (e) {
            console.error('While receiving items data something went wrong')
        }
    }

    function getItems(items) {
        getCartItems(items)
        printInCartQuantity()

        function getCartItems() {
            const inCartElementsId = getLocalStorage();
            const div = document.querySelector(".cart-list")
            const inCartElements = []

            div.innerHTML = ''
            items.forEach(el => {
                if (inCartElementsId.includes(el.id)) {
                    printCartItem(el)
                    inCartElements.push(el)
                }
            })
            editCartQuantity(inCartElements)
            printCartTotalValue()
        }

        function editCartQuantity(inCartItems) {
            const cart_items = document.querySelectorAll('.cart-item')
            cart_items.forEach(item => {
                const btnMinus = item.querySelector('#removeOneItem')
                const btnPlus = item.querySelector('#addOneItem')
                const textField = item.querySelector('.input-quantity-field')
                const removeBtn = item.querySelector('.remove-btn')
                const itemToWorkWith = inCartItems.find(inCartItem => {
                    if (inCartItem.id === Number(item.id)) {
                        return inCartItem;
                    }
                })
                const itemQuantity = getLocalStorageValue(itemToWorkWith.id)

                textField.value = itemQuantity

                textField.addEventListener('keydown', (event) => {
                    let ASCIICode = Number(event.keyCode)
                    if ((ASCIICode < 48 || ASCIICode > 57) && !(ASCIICode === 8 || ASCIICode === 37 || ASCIICode === 39)) {
                        event.preventDefault()
                    } else {
                        textField.addEventListener('input', () => {
                            //key = obejct | value = NEW QUANTITY
                            if (textField.value.length > 0) {
                                if ((textField.value.length === 1) && (Number(textField.value) === 0)) {
                                    textField.style.color = 'red'
                                    localStorage.setItem('cart_item_id-' + itemToWorkWith.id, itemQuantity)
                                } else {
                                    textField.style.color = '#fff'
                                    localStorage.setItem('cart_item_id-' + itemToWorkWith.id, textField.value)
                                }
                            } else {
                                localStorage.setItem('cart_item_id-' + itemToWorkWith.id, itemQuantity)
                            }
                            printCartTotalValue()
                        })
                    }

                    if (textField.value.length > 5) {
                        event.preventDefault()
                    }
                })

                btnPlus.addEventListener("click", () => {
                    textField.value = Number(textField.value) + 1

                    //key = obejct | value = NEW QUANTITY
                    localStorage.setItem('cart_item_id-' + itemToWorkWith.id, textField.value);
                    getCartItems()
                    printInCartQuantity()
                })

                btnMinus.addEventListener("click", () => {
                    if (textField.value > 1) {
                        textField.value = Number(textField.value) - 1
                    }

                    //key = obejct | value = NEW QUANTITY
                    localStorage.setItem('cart_item_id-' + itemToWorkWith.id, textField.value);
                    getCartItems()
                    printInCartQuantity()
                })

                removeBtn.addEventListener('click', () => {
                    localStorage.removeItem('cart_item_id-' + itemToWorkWith.id);
                    getCartItems()
                    printInCartQuantity()
                })
            })
        }


        function getTotalPrice() {
            const inCartElementsId = getLocalStorage();
            const allPrices = [];

            items.forEach(el => {
                if (inCartElementsId.includes(el.id)) {
                    const itemQuantity = getLocalStorageValue(el.id)
                    allPrices.push(Number(el.price) * itemQuantity)
                }
            })
            const initialValue = 0;
            const totalPrice = allPrices.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

            return totalPrice
        }

        function getLocalStorage() {
            let index = 0;
            let localStorageData = [];

            while (index < localStorage.length) {
                if (localStorage.key(index).split("-")[1]) {
                    localStorageData.push(Number(localStorage.key(index).split("-")[1]));
                }
                index++
            }
            return localStorageData;
        }

        function getLocalStorageValue(key) {
            const value = localStorage.getItem('cart_item_id-' + key)
            return value
        }

        function printInCartQuantity() {
            const span = document.querySelector('.in-cart-quantity')
            const inCartElements = getLocalStorage();

            if (inCartElements.length > 0) {
                span.innerHTML = inCartElements.length
            }else{
                span.innerHTML = 0
            }
        }

        function printCartTotalValue() {
            const div = document.querySelector('.cart-total')
            const totalQuantity = getTotalPrice()

            div.innerHTML = ''

            const total = `
            <h2>Total:</h2>
            <h2 id="cart-total-value"><i>$</i>${totalQuantity}</h2>
            <button>Checkout</button>`.trim()

            div.insertAdjacentHTML('afterbegin', total);
        }


        function printCartItem(element) {
            const div = document.querySelector(".cart-list")

            const item = `
            <div class="cart-item" id="${element.id}">
                    <div class="item-info">
                        <div class="item-img">
                            <img src=${element.img} alt="item logo">
                        </div>
                        <div class="item-descriptions">
                            <h5 class="name">${element.name}</h5>
                            <h5 class="price">$${element.price}</h5>
                        </div>
                    </div>
                    <div class="item-quantity">
                        <div class="quantity-btns">
                            <button id="removeOneItem">-</button>
                            <input class="input-quantity-field" type="text" name="quantity" value="1">
                            <button id="addOneItem">+</button>
                        </div>
                        <div class="remove-btn">
                            <p>Remove</p>
                            <span><img src="../../img/aside-x-btn.svg"></span>
                        </div>
                    </div>
                </div>`.trim()

            div.insertAdjacentHTML('beforeend', item);
        }

    }

} window.addEventListener("DOMContentLoaded", initCountriesOfTheWorld())