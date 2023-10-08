function initShopPage() {
    fetchItemsData()
    async function fetchItemsData() {
        try {
            const responseItems = await fetch('../../json/data.json');
            let newData = []
            await responseItems.json().then((data) => newData = data)
            getItems(true, newData)
        } catch (e) {
            console.error('While receiving items data something went wrong')
        }
    }

    function getItems(firstCall, items) {
        const showAll = document.querySelector('#showAllItems')
        const div = document.querySelector('.item-list')

        showAll && showAll.addEventListener('click', () => {
            div.innerHTML = '';
            items && items.forEach(element => {
                printItem(element);
            })
            showAll.style.display = 'none'
            addToCart(items)
        })

        if (firstCall) {
            items && items.forEach((element, index) => {
                if (index < 6) {
                    printItem(element);
                }
            })
            printTopics(items)
            printRangeScroll(items)
            addToCart(items)
            getCartItems(items)
        }
        searchItems(items)
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

                textField && textField.addEventListener('keydown', (event) => {
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
                })

                btnPlus && btnPlus.addEventListener("click", () => {
                    textField.value = Number(textField.value) + 1

                    //key = obejct | value = NEW QUANTITY
                    localStorage.setItem('cart_item_id-' + itemToWorkWith.id, textField.value);
                    getCartItems()
                    printInCartQuantity()
                })

                btnMinus && btnMinus.addEventListener("click", () => {
                    if (textField.value > 1) {
                        textField.value = Number(textField.value) - 1
                    }

                    //key = obejct | value = NEW QUANTITY
                    localStorage.setItem('cart_item_id-' + itemToWorkWith.id, textField.value);
                    getCartItems()
                    printInCartQuantity()
                })

                removeBtn && removeBtn.addEventListener('click', () => {
                    localStorage.removeItem('cart_item_id-' + itemToWorkWith.id);
                    getCartItems()
                    printInCartQuantity()
                })
            })
        }

        function getMaxMinPrice(items) {
            const tempMinMax = [];

            items.forEach(el => {
                tempMinMax.push(el.price)
            })

            const minPrice = Math.min(...tempMinMax)
            const maxPrice = Math.max(...tempMinMax)

            return [minPrice, maxPrice]
        }

        function getTopics(items) {
            const allTopics = []

            items.forEach(el => {
                allTopics.push(el.type)
            })

            const uniqueTopics = Array.from(new Set(allTopics))

            return uniqueTopics
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

        function searchItems(items) {
            let searchSelected = []
            let topicsSelected = []
            let rangeSelected = []

            const divTopics = document.querySelector('.topics-list');
            const lis = divTopics.querySelectorAll('li');
            const divRange = document.querySelector('#rangeValueOutput');
            const priceSlider = document.querySelector('.price-slider');
            const range = priceSlider.querySelector('input');
            const form = document.querySelector('.search-form')
            const search = form.querySelector('.search-field')

            search && search.addEventListener('input', () => {
                searchSelected = []

                if (search.value && search.value.trim().length > 0) {
                    let value = search.value.trim().toLowerCase()

                    items.forEach(function (el, index) {
                        if (el.name.includes(value)) {
                            searchSelected.push(items[index].id)
                        } else {
                            console.log("No matching element")
                        }
                    })
                }
                getUnique()
            })

            lis.forEach((li) => {
                li.addEventListener('click', () => {
                    document.querySelector('.buttonActive')?.classList.remove('buttonActive');
                    li.classList.add('buttonActive');
                    topicsSelected = []

                    items.forEach(function (el, index) {
                        if (el.type === li.children[0].dataset.topicType || li.children[0].dataset.topicType === "All") {
                            topicsSelected.push(items[index].id)
                        } else {
                            console.log("No matching element")
                        }
                    })
                    getUnique()
                });
            });

            range.addEventListener('input', () => {
                rangeSelected = []

                items.forEach(function (el, index) {
                    if (Number(el.price) >= Number(range.value)) {
                        rangeSelected.push(items[index].id)
                    } else {
                        console.log("No matching element")
                    }
                })
                divRange.innerHTML = `Value: $${range.value}`
                getUnique()
            })

            function getUnique() {
                let intersectionOfTwo = []
                let intersection = [];

                if (topicsSelected.length > rangeSelected.length) {
                    if (rangeSelected.length > 0) {
                        intersectionOfTwo = topicsSelected.filter(element => {
                            return rangeSelected.includes(element);
                        });
                    } else {
                        intersectionOfTwo = topicsSelected;
                    }
                } else {
                    if (topicsSelected.length > 0) {
                        intersectionOfTwo = rangeSelected.filter(element => {
                            return topicsSelected.includes(element);
                        });
                    } else {
                        intersectionOfTwo = rangeSelected;
                    }
                }

                if (searchSelected.length > 0 || search.value.length > 0) {
                    if ((intersectionOfTwo.length > 0) && (rangeSelected.length > 0 || topicsSelected.length > 0))
                        intersection = intersectionOfTwo.filter(element => {
                            return searchSelected.includes(element);
                        });
                    else if (rangeSelected.length === 0 && topicsSelected.length === 0) {
                        intersection = searchSelected
                    }
                } else {
                    intersection = intersectionOfTwo
                }
                document.querySelector('.item-list').innerHTML = '';

                intersection.forEach(id => {
                    printItem(items.find(el => {
                        if (el.id === id) {
                            return el;
                        }
                    }))
                })
                addToCart(items);
            }
        }

        function addToCart(items) {
            const div = document.querySelector('.item-list');
            const btns = div.querySelectorAll('button')

            btns && btns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const inCartElements = getLocalStorage();
                    const idInCart = []

                    if (inCartElements.length > 0) {
                        inCartElements.forEach(el => {
                            idInCart.push(el.id)
                        })
                        if (!idInCart.includes(Number(btn.parentNode.parentNode.id))) {
                            addLocalStorage(items, btn.parentNode.parentNode.id)
                            getCartItems(items)
                            printInCartQuantity()
                        } else {
                            console.log('Element already in the cart.')
                        }
                    } else {
                        addLocalStorage(items, btn.parentNode.parentNode.id)
                        getCartItems(items)
                        printInCartQuantity()
                    }
                })
            })
        }

        function addLocalStorage(items, id) {
            const item = items.find(el => {
                if (el.id === Number(id)) {
                    return el;
                }
            })
            // key = object id | value = quantity
            localStorage.setItem('cart_item_id-' + item.id, 1);
        }

        function getLocalStorage() {
            let index = 0;
            const localStorageData = [];

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

        function printRangeScroll(items) {
            const div = document.querySelector('.price-slider')
            const rangeMinMax = getMaxMinPrice(items)

            const range = `
        <p>Price</p>
        <input type="range" id="price" min="${rangeMinMax[0]}" max="${rangeMinMax[1]}" step="1" value="0" />`.trim()

            div.insertAdjacentHTML('afterbegin', range);
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

        function printTopics(items) {
            const ul = document.querySelector('#topics')
            const topics = getTopics(items)

            topics.forEach(topic => {
                const listElement = `
            <li>
             <button data-topic-type="${topic}">${topic}</button>
            </li>`.trim()

                ul.insertAdjacentHTML('beforeend', listElement);
            })
        }

        function printCartItem(element) {
            const div = document.querySelector(".cart-list")

            const item = `
        <div class="cart-item" id="${element.id}">
                <div class="item-info">
                    <div class="item-img">
                        <img src=${element.img}>
                    </div>
                    <div class="item-descriptions">
                        <h5 class="name">${element.name}</h5>
                        <h5 class="price">$${element.price}</h5>
                    </div>
                </div>
                <div class="item-quantity">
                    <div class="quantity-btns">
                        <button id="removeOneItem">-</button>
                        <input class="input-quantity-field" type="text" name="quantity" value="1" maxlength="5">
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

        function printItem(element) {
            const div = document.querySelector(".item-list")

            const item = `
        <li class="item" id="${element.id}">
            <div class="add-to-cart">
                <button>Add</button>
                <img src=${element.img}>
            </div>
            <div class="item-info">
                <h5 class="name">${element.name}</h5>
                <h5 class="price">$${element.price}</h5>
                <div class="stars">
                    <p>${element.stars}</p>
                </div>
                <p class="product-type">${element.type}</p>
            </div>
        </li>`.trim()

            div.insertAdjacentHTML('beforeend', item);
        }
    }

} window.addEventListener("DOMContentLoaded", initShopPage())