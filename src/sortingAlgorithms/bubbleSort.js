export function getBubbleSortAnimations(array) {
    let animations = [];

    for (let i = 0; i < array.length - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < (array.length - i - 1); j++) {
            animations.push([j, j + 1]);

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;

                animations.push([j, j+1]);
            }
            else{
                animations.push([j + 1, j + 1]);
            }

            animations.push([j, j + 1]);
        }

        /* removed break for animation purpose
            removing the break allows for all color heights to get adjusted to a uniform height at the end
        if (!swapped){
            break;
        }
        */
    }
    animations.push([0,0]);
    
    return animations;
}