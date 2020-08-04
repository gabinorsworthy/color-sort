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

        for (let i = 0; i < 10; i ++) {
            
            var randomHue = randomInt(0, 359);
            array.push(randomHue);

            var rgb = hsl_to_rgb(randomHue, 1, .5);

            styleArray.push({
                backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
                width: `${window.innerWidth * 0.005}px`
                //marginRight: `${window.innerWidth * .002}px`,
                //marginLeft: `${window.innerWidth * .002}px`
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

    // FIXME: REMOVE
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomInt(1, 1000);
          for (let i = 0; i < length; i++) {
            array.push(randomInt(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          const sortedArray = getMergeSortAnimations(array);
          console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
        }
    }
    

    
    
    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const[barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout(() => {
                if (i % 3 === 0) {
                    barOneStyle.height = '60vh';
                    barTwoStyle.height = '60vh';
                }
                else if (i % 3 === 1) {
                    var temp = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp;
                }
                else{
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '60vh';
                }
            }, i * 5); 
        }
    }

    mergeSort() {
        this.testSortingAlgorithms();
        const animations = getMergeSortAnimations(this.state.array);
        console.log(animations);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            //console.log(arrayBars);

            const animationTask = animations[i][0];
            const barOneIdx = animations[i][1];
            const barTwoIdx = animations[i][2]

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout(() => {
                if (animationTask === 'current') {
                    barOneStyle.height = '70vh';
                }
                else if (animationTask === 'incHeight') {
                    barOneStyle.height = '60vh';
                    barTwoStyle.height = '60vh';
                }
                else if (animationTask === 'changeHeight') {
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '60vh';
                }
                else if (animationTask === 'changeColor') {
                    var temp = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp;
                }
                else if (animationTask === 'swapPivot'){
                    var temp2 = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp2;
                }
                else if (animationTask === 'changeHeightFinal') {
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '80vh';
                }
                else if (animationTask === 'matchPivotHeight') {
                    barTwoStyle.height = '70vh';
                }
            }, i * 1000);
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const animationTask = animations[i][0];
            const barOneIdx = animations[i][1];
            const barTwoIdx = animations[i][2]

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            setTimeout(() => {
                if (animationTask === 'piv') {
                    barOneStyle.height = '70vh';
                }
                else if (animationTask === 'incHeight') {
                    barOneStyle.height = '60vh';
                    barTwoStyle.height = '60vh';
                }
                else if (animationTask === 'changeHeight') {
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '60vh';
                }
                else if (animationTask === 'changeColor') {
                    var temp = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp;
                }
                else if (animationTask === 'swapPivot'){
                    var temp2 = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp2;
                }
                else if (animationTask === 'changeHeightFinal') {
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '80vh';
                }
                else if (animationTask === 'matchPivotHeight') {
                    barTwoStyle.height = '70vh';
                }
            }, i * 10); 
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

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// FIXME: DELETE
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
}

// https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
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