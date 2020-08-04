export function getMergeSortAnimations(array) {
    let animations = [];
    let helper = []

    for (let i = 0; i < array.length; i++) {
        helper.push(array[i]);
    }
       
    mergeSort(array, helper, 0, array.length - 1, animations);

    return animations;
}


function mergeSort(array, helper, low, high, animations) {

    if (low < high) {
        var middle = Math.floor((low + high) / 2);

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
        // increases height of items being compared
        animations.push(['incHeight', helperLeft, helperRight]);

        if (current != helperLeft && current != helperRight) {
            // if current isn't equal to the items being compared
            // increase its height to distinguish it
            animations.push(['incHeightCurrent', current]);
        }

        if (helper[helperLeft] <= helper[helperRight]) {
            array[current] = helper[helperLeft];

            // change colors
            animations.push(['changeColor', current, helper[helperLeft]]);
            // decrease height of item no longer being used
            animations.push(['decHeight', helperLeft, helperRight]);
        
            helperLeft++;            
        }
        else {
            array[current] = helper[helperRight];

            // change colors
            animations.push(['changeColor', current, helper[helperRight]]);
            // decrease height of item no longer being used
            animations.push(['decHeight', helperLeft, helperRight]);

            helperRight++;
        }  

        // decrease height of item no longer being used
        animations.push(['decHeight', current, current]);
        current++;

        

    }

    var remaining = middle - helperLeft;
    for (let i = 0; i <= remaining; i++) {
        array[current + i] = helper[helperLeft + i];

        // increase height of bar about to be changed
        animations.push(['incHeight', current + i, current + i]);
        // change its color
        animations.push(['changeColor', current + i, helper[helperLeft + i]]);
        // decrease the height of the bar as it is no longer being used
        animations.push(['decHeight', current + i, current + i]);
    }

}