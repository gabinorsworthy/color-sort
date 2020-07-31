export function getQuickSortAnimations(array) {
    let animations = [];
       
    quickSort(array, 0, array.length - 1, animations);

    return animations;
}


function quickSort(array, low, high, animations) {

    if (low < high) {
        var partitionIdx = partition(array, low, high, animations);

        quickSort(array, low, partitionIdx - 1, animations);
        quickSort(array, partitionIdx + 1, high, animations);
    }
    else if (low < array.length) {
        animations.push(['changeHeightFinal', low, low]);  
    }
    
}


function partition(array, low, high, animations) {
    var pivot = array[high];
    var i = low;
    var j = high - 1;

    animations.push(['piv', high, high]);
    animations.push(['incHeight', i, j]);

    while (true) {
        
        while (array[i] < pivot) {
            i++;
            if (!(i > j)) {
                animations.push(['changeHeight', i - 1, i, 'i while']);
            }
        }

        while ((j > 0) && (array[j] > pivot)) {
            j--;
            if (!(i > j)){
                animations.push(['changeHeight', j + 1, j, 'j while']);
            } 
        }

        if (i >= j) {
            break;
        }
        else {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            animations.push(['changeColor', i, j]);

            i++;
            j--;
            if (!(i > j)) {
                animations.push(['changeHeight', i - 1, i, 'change color']);
                animations.push(['changeHeight', j + 1, j, 'change color']);
            }   
        }
    }
    
    if ((j >= low) && (i != high)) {
        animations.push(['changeHeight', j, i]);
    }

    var partitionIdx = i;
    array[high] = array[partitionIdx];
    array[partitionIdx] = pivot;

    animations.push(['matchPivotHeight', high, partitionIdx]);
    animations.push(['swapPivot', high, partitionIdx]);
    animations.push(['changeHeightFinal', high, partitionIdx]);

    return partitionIdx;
}