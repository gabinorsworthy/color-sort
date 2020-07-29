export function getBubbleSortAnimations(array) {
    let animations = [];

    for (let i = 0; i < array.length; i++) {
        let swapped = false;
        
        for (let j = 0; j < (array.length - i - 1); j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;

                animations.push([j, j+1]);
            }
        }

        if (!swapped){
            break;
        }
    }
    console.log(array);
    
    return animations;

}