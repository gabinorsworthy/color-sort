export function getMergeSortAnimations(array) {
    let animations = [];
    let helper = []

    for (let i = 0; i < array.length; i++) {
        helper.push(array[i]);
    }
       
    mergeSort(array, helper, 0, array.length - 1, animations);

    //console.log(array);
    return animations;
}


function mergeSort(array, helper, low, high, animations) {

    if (low < high) {
        var middle = Math.floor((low + high) / 2);
        //console.log(low, high, middle);

        mergeSort(array, helper, low, middle, animations);
        mergeSort(array, helper, middle + 1, high, animations);
        merge(array, helper, low, middle, high, animations);
    }
    
}


function merge(array, helper, low, middle, high, animations) {
    for (let i = low; i <= high; i++) {
        helper[i] = array[i];
    }

    var helperLeft = low;
    var helperRight = middle + 1;
    var current = low;

    while (helperLeft <= middle && helperRight <= high) {
        animations.push(['incHeight', helperLeft, helperRight])
        animations.push(['current', current, current]);

        if (helper[helperLeft] <= helper[helperRight]) {
            array[current] = helper[helperLeft];
            animations.push(['matchPivotHeight', helperLeft, helperLeft]);
            animations.push(['changeColor', current, helperLeft]);

            helperLeft++;
            if (helperLeft <= middle) {
                animations.push(['changeHeight', helperLeft - 1, helperLeft]);
            }
            
        }
        else {
            array[current] = helper[helperRight];
            animations.push(['matchPivotHeight', helperRight, helperRight]);
            animations.push(['changeColor', current, helperRight]);

            helperRight++;
            if (helperRight <= high) {
                animations.push(['changeHeight', helperRight - 1, helperRight]);
            }
            
        }

        current++;

    }

    var remaining = middle - helperLeft;
    for (let i = 0; i <= remaining; i++) {
        array[current + i] = helper[helperLeft + i];
    }

}