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
        // changes item in correct location to final height
        // denoting that the bar is in it's final location
        animations.push(['changeHeightFinal', low, low]);  
    }
    
}


function partition(array, low, high, animations) {
    var pivot = array[high];
    var i = low;
    var j = high - 1;

    // increases the pivot height
    animations.push(['piv', high, high]);
    // increases the height of the bars being compared
    animations.push(['incHeight', i, j]);

    while (true) {
        
        while (array[i] < pivot) {
            i++;
            if (!(i > j)) {
                // decreases height of old point
                // increases height of new point
                animations.push(['changeHeight', i - 1, i]);
            }
        }

        while ((j > 0) && (array[j] > pivot)) {
            j--;
            if (!(i > j)){
                // decreases height of old point
                // increases height of new point
                animations.push(['changeHeight', j + 1, j]);
            } 
        }

        if (i >= j) {
            break;
        }
        else {
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            // swap colors
            animations.push(['changeColor', i, j]);

            i++;
            j--;
            if (!(i > j)) {
                // decrease height of old points
                // increase height of new points
                animations.push(['changeHeight', i - 1, i]);
                animations.push(['changeHeight', j + 1, j]);
            }   
        }
    }
    
    if ((j >= low) && (i != high)) {
        // decreases height of location no longer being used if within range
        animations.push(['changeHeight', j, i]);
    }

    var partitionIdx = i;
    array[high] = array[partitionIdx];
    array[partitionIdx] = pivot;

    // matches bar to pivot bar height for comparison
    animations.push(['matchPivotHeight', high, partitionIdx]);
    // swaps the colors
    animations.push(['changeColor', high, partitionIdx]);
    // changes pivot height to normal
    // increases partition point height to show it is in its final position
    animations.push(['changeHeightFinal', high, partitionIdx]);

    return partitionIdx;
}