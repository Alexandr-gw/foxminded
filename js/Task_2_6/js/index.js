function initToDo() {
    const inputField = document.querySelector("input")
    const btnSave = document.querySelector("#editSaveBtn")

    if (!document.cookie) {
        console.log('NoCoockies')
    } else {
        const elementsToPrint = getCoockies()
        printElement(elementsToPrint)
    }

    btnSave && btnSave.addEventListener('click', () => {
        addElement(inputField.value)
        const elementsToPrint = getCoockies()
        printElement(elementsToPrint)
        inputField.value = ''
    })

    function expireTime(expireDays) {
        const date = new Date()
        const expDays = expireDays;
        date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        return expires
    }

    function getCoockies() {
        const coockieStorage = document.cookie
        const coockiesData = decodeURIComponent(coockieStorage).split('; ')
        let dataArr = []

        coockiesData.map(item => {
            item = item.split('=')
            dataArr.push(item.shift())
        })

        if (dataArr.length > 0) {
            return dataArr
        } else {
            console.log('Input field is empty')
        }
    }

    function addElement(element) {
        if (element && !btnSave.value) {
            const expires = expireTime(1)
            document.cookie = encodeURIComponent(element) + "=" + encodeURIComponent(element + Date.now()) + ";" + expires + "; path=/";
        } else if (element && btnSave.value) {
            if (element !== btnSave.value) {
                const expires = expireTime(1)
                document.cookie = encodeURIComponent(element) + "=" + encodeURIComponent(element + Date.now()) + ";" + expires + "; path=/";
                btnSave.classList.replace('edit', 'save')
                btnSave.innerHTML = 'Save'
                removeOne(btnSave.value)
            }
        } else {
            console.log('Input field is empty')
        }
    }

    const btnDeleteAll = document.querySelector(".deleteAll")
    btnDeleteAll && btnDeleteAll.addEventListener('click', () => {      
        removeAll()
        document.getElementById("objList").innerHTML = "";
    })

    function removeAll() {
        const elementToDelete = getCoockies()
        const expires = expireTime(-1)

        elementToDelete.forEach(item => {
            document.cookie = encodeURIComponent(item) + "=" + '' + ";" + expires + "; path=/";
        })
    }

    function deleteOneBtn() {
        const btnDeleteOne = document.querySelectorAll(".deleteOne")
        btnDeleteOne.length && btnDeleteOne.forEach(btn => {
            btn.addEventListener('click', () => {
                removeOne(btn.id)
                const elementsToPrint = getCoockies()
                printElement(elementsToPrint)
            });
        });
    }

    function edit() {
        const li = document.querySelectorAll("li")

        li.forEach(field => {
            field.addEventListener('click', (element) => {
                if (!element.target.classList.contains('deleteOne')) {
                    const elementToEdit = field.children[1].children[1].children[0].id

                    inputField.value = elementToEdit
                    btnSave.classList.replace('save', 'edit')
                    btnSave.innerHTML = 'Edit'
                    btnSave.value = elementToEdit
                }
            })
        })
    }

    function removeOne(elementToDelete) {
        const expires = expireTime(-1)
        document.cookie = encodeURIComponent(elementToDelete) + "=" + '' + ";" + expires + "; path=/";
    }

    function printElement(element) {
        const ul = document.querySelector("#objList")

        document.getElementById("objList").innerHTML = "";

        if (!(element[0] === '')) {
            element.map((item) => {
                item = `
                    <li>
                    <p>${item}</p>
                    <div class="btns">
                        <div class="safeBtn">
                            <label>
                                <div class="checkbox"></div>
                                <span>Safe</span>
                            </label>
                        </div>
                        <div class="delBtn">
                            <button class="deleteOne" id="${item}">X</button>
                            <span>Delete</span>
                        </div>
                    </div>
                </li>`.trim()

                ul.insertAdjacentHTML('beforeend', item);

            })
            edit()
            deleteOneBtn()
        } else {
            console.log('Nothing to print')
        }
    }
} window.addEventListener("DOMContentLoaded", initToDo)