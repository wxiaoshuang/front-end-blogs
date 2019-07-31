function quickSort(arr) {
    quick(arr, 0 , arr.length - 1);
}
function quick(arr, l ,r) {
    if(l < r) {
        let index = partition(arr, l ,r)
        quick(arr, l, index- 1)
        quick(arr, index + 1, r)
    }
}
function partition(arr, l, r) {
    let temp = arr[l] // 以左边第一个作为基础
    while(l < r) {
        while(l < r && arr[r] >= temp) {
            r--
        }
        arr[l] = arr[r]
        while(l < r && arr[l] <= temp) {
            l++
        }
        arr[r] = arr[l]
    }
    arr[l] = temp
    return l;
}