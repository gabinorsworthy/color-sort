export function getQuickSortAnimations(array) {
    //console.log(array);
       
    quickSort(array, 0, array.length - 1);

    return array;

}


function quickSort(array, low, high) {
    //console.log(low, high);
    //console.log(array);

    if (low < high) {
        var partitionIdx = partition(array, low, high);

        quickSort(array, low, partitionIdx - 1);
        quickSort(array, partitionIdx + 1, high);
    }
    
}


function partition(array, low, high) {
    var pivot = array[low];
    var i = low + 1;
    var j = high;

    while (i <= j) {
        //console.log('i:', i);
        //console.log('j:', j);
        
        while (array[i] < pivot) { i++; }

        while (array[j] > pivot) { j--; }

        if (i <= j ) {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            i++;
            j--;
        }
    }

    var partitionIdx = Math.min(i, j);

    array[low] = array[partitionIdx];
    array[partitionIdx] = pivot;

    //console.log(array);

    return partitionIdx;
}