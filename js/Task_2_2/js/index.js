function initMenu() {
    for (let i = 0; i < menu_data.length; i++) {
        addElement(menu_data[i]);
    }
    document.querySelectorAll('button')[0].focus();

    function addElement(elementData) {
     const menuObj = `
        <li class="container">
            <img src=${elementData.image_url}>
            <div class="elementInfo">
                <div class="namePrice">
                 <p class="name">${elementData.name}</p>
                 <p class="price">${elementData.price}</p>
                </div>
                <p class="description">${elementData.description}</p>
            </div>
        </li>`.trim();

        const ul = document.querySelector("#objList")
        
        ul.insertAdjacentHTML('beforeend', menuObj);
    }

    const btns = document.querySelectorAll('button')

    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            document.querySelector('.buttonActive')?.classList.remove('buttonActive');
            btn.classList.add('buttonActive');
            document.getElementById("objList").innerHTML = "";

            menu_data.forEach(function (el, index) {
                if (el.type === btn.dataset.dishType || btn.dataset.dishType === "All") {
                    addElement(menu_data[index]);
                } else {
                    console.log("Element already exist in DOM")
                }
            })
        });
    });

}
window.addEventListener("DOMContentLoaded", initMenu)