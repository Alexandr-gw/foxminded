function sortArrays() {

    function printArray(elementData) {
        const obj = `
         <li>
           <p>time processed ${elementData.toFixed(5)}</p>
         </li>`.trim();

        const ul = document.querySelector(".timeResultList")

        ul.insertAdjacentHTML('beforeend', obj);
    }


    //================//
    function bblSort(arr) {

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < (arr.length - i - 1); j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                }
            }
        }
    }
    //================//

    function swap(arr, xp, yp) {
        let temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }

    function selectionSort(arr) {

        let i, j, min_idx;

        for (i = 0; i < arr.length - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < arr.length; j++)
                if (arr[j] < arr[min_idx])
                    min_idx = j;
            swap(arr, min_idx, i);
        }
    }

    //================//

    function insertionSort(arr) {
        let i, key, j;
        for (i = 1; i < arr.length; i++) {
            key = arr[i];
            j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }


    //================//


    function quickSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        let pivot = arr[0];
        let leftArr = [];
        let rightArr = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < pivot) {
                leftArr.push(arr[i]);
            } else {
                rightArr.push(arr[i]);
            }
        }

        return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
    };

    //================//

    function merge(left, right) {
        let arr = []
        while (left.length && right.length) {
            if (left[0] < right[0]) {
                arr.push(left.shift())
            } else {
                arr.push(right.shift())
            }
        }
        return [...arr, ...left, ...right]
    }
    function mergeSort(array) {
        const half = array.length / 2

        if (array.length < 2) {
            return array
        }

        const left = array.splice(0, half)
        return merge(mergeSort(left), mergeSort(array))
    }

    //================//

    start = performance.now();
    bblSort(arr_100el.slice());
    timeTaken = performance.now() - start;
    printArray(timeTaken/1000)

    //================//

    start = performance.now();
    selectionSort(arr_100el.slice());
    timeTaken = performance.now() - start;
    printArray(timeTaken/1000)

    //================//

    start = performance.now();
    insertionSort(arr_100el.slice());
    timeTaken = performance.now() - start;
    printArray(timeTaken/1000)

    //================//

    start = performance.now();
    quickSort(arr_100el.slice());
    timeTaken = performance.now() - start;
    printArray(timeTaken/1000)

    //================//

    start = performance.now();
    mergeSort(arr_100el.slice());
    timeTaken = performance.now() - start;
    printArray(timeTaken/1000)

}
window.addEventListener("DOMContentLoaded", sortArrays)