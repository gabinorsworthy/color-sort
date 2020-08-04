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
        animations.push(['incHeight', helperLeft, helperRight]);
        if (current != helperLeft && current != helperRight) {
            animations.push(['incHeightCurrent', current, current]);
        }

        if (helper[helperLeft] <= helper[helperRight]) {
            array[current] = helper[helperLeft];

            animations.push(['changeColor', current, helper[helperLeft]]);
            animations.push(['decHeight', helperLeft, helperRight]);
        
            helperLeft++;            
        }
        else {
            array[current] = helper[helperRight];

            animations.push(['changeColor', current, helper[helperRight]]);
            animations.push(['decHeight', helperLeft, helperRight]);

            helperRight++;
        }

        animations.push(['decHeight', current, current]);
        current++;

        

    }

    var remaining = middle - helperLeft;
    for (let i = 0; i <= remaining; i++) {
        array[current + i] = helper[helperLeft + i];

        animations.push(['incHeight', current + i, current + i]);
        animations.push(['changeColor', current + i, helper[helperLeft + i]]);
        animations.push(['decHeight', current + i, current + i]);
    }

}