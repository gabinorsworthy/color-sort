import React from 'react';
import './ColorSort.css';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleSort.js'
import {getQuickSortAnimations} from '../sortingAlgorithms/quickSort.js'
import {getMergeSortAnimations} from '../sortingAlgorithms/mergeSort.js'

export default class ColorSort extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            styleArray: []
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        const styleArray = [];
        const arrayBars = document.getElementsByClassName('array-bar');

        // creates an array of 180 items (fits well to screen) 
        for (let i = 0; i < 180; i ++) {
            
            // gets random, valid hue
            var randomHue = randomInt(0, 360);
            array.push(randomHue);

            // converts hsl value to array of rgb values
            var rgb = hsl_to_rgb(randomHue, 1, .5);

            // add color and width to style array
            // used to create the new bars
            styleArray.push({
                backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
                width: `${window.innerWidth * 0.005}px`
            });

            // Had issue updating colors in render
            // Randomly, one color of the 100 wouldn't update in background color (but the value showed correct when added to class name)
            // This fix ensures the color is updated when a new array is generated
            if (arrayBars[i]) {
                arrayBars[i].style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
                arrayBars[i].style.height = '50vh';
            }
        }
        
        this.setState({array, styleArray});
    }

    

    
    
    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const[barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout(() => {
                // increase height of bars being compared
                if (i % 3 === 0) {
                    barOneStyle.height = '60vh';
                    barTwoStyle.height = '60vh';
                }
                // swap the colors if necessary
                else if (i % 3 === 1) {
                    var temp = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp;
                }
                // decrease height of bar no longer being used
                else{
                    barOneStyle.height = '50vh';
                }
            }, i * 5);
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const animationTask = animations[i][0];
            const barOneIdx = animations[i][1];

            const barOneStyle = arrayBars[barOneIdx].style;

            setTimeout(() => {
                // increase height of items being compared
                if (animationTask === 'incHeight') {
                    const barTwoIdx = animations[i][2];
                    const barTwoStyle = arrayBars[barTwoIdx].style;

                    barOneStyle.height = '60vh';
                    barTwoStyle.height = '60vh';
                }
                // increase height of the location the color will change
                // if it is not already equal to the items being compared
                else if (animationTask == 'incHeightCurrent') {
                    barOneStyle.height = '70vh';
                }
                // decrease height of bars no longer being compared
                else if (animationTask === 'decHeight') {
                    const barTwoIdx = animations[i][2];
                    const barTwoStyle = arrayBars[barTwoIdx].style;

                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '50vh';
                }
                // change color at current location being filled
                else if (animationTask === 'changeColor') {
                    const newColor = hsl_to_rgb(animations[i][2], 1, .5);
                    console.log(newColor);

                    barOneStyle.backgroundColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
                }
            }, i * 5);
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const animationTask = animations[i][0];
            const barOneIdx = animations[i][1];
            const barTwoIdx = animations[i][2];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout(() => {
                // increase height of pivot at start
                if (animationTask === 'piv') {
                    barOneStyle.height = '70vh';
                }
                // increase height of items being compared
                else if (animationTask === 'incHeight') {
                    barOneStyle.height = '60vh';
                    barTwoStyle.height = '60vh';
                }
                // lower height of bar no longer being used
                else if (animationTask === 'changeHeight') {
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '60vh';
                }
                // change color of two bars
                else if (animationTask === 'changeColor') {
                    var temp = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp;
                }
                // match height of pivot
                else if (animationTask === 'matchPivotHeight') {
                    barTwoStyle.height = '70vh';
                }
                // decrease height of bar no longer being used
                // will set bars in correct locations to taller than the others
                else if (animationTask === 'changeHeightFinal') {
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '80vh';
                }
            }, i * 5); 
        }
    }

    render() {
        return (
            <>
                <div className="tool-bar">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                </div>
                
                <div className="bar-container">    
                    {this.state.styleArray.map((value, idx) => (
                        <div 
                            className={`array-bar ${value.backgroundColor}`}
                            key={idx}
                            style={value}></div>
                    ))} 
                </div>
            </>
        );
        
    }

}

// returns a random integer between min and max (inclusive)
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
// Takes HSL values where 0 <= h <= 360, 0 <= s, l <= 1
// returns an array of RGB value [r, g, b]
function hsl_to_rgb(h, s, l) {
    var r, g, b;

    var C = (1 - Math.abs(2 * l - 1)) * s;
    var X = C * (1 - Math.abs(((h / 60) % 2) - 1))
    var m = l - (C / 2)

    if (h < 60) {r = C; g = X; b = 0;}
    else if (h < 120) {r = X; g = C; b = 0;}
    else if (h < 180) {r = 0; g = C; b = X;}
    else if (h < 240) {r = 0; g = X; b = C;}
    else if (h < 300) {r = X; g = 0; b = C;}
    else {r = C; g = 0; b = X;}

    return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}