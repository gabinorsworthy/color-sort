import React from 'react';
import './ColorSort.css';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleSort.js'

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

        for (let i = 0; i < 100; i ++) {
            
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
          const sortedArray = getBubbleSortAnimations(array);
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
                if (i % 3 == 0) {
                    barOneStyle.height = '60vh';
                    barTwoStyle.height = '60vh';
                }
                else if (i % 3 == 1) {
                    barOneStyle.height = '50vh';
                    barTwoStyle.height = '60vh';
                }
                else{
                    var temp = barOneStyle.backgroundColor;
                    barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                    barTwoStyle.backgroundColor = temp;
                }
            }, i * 5); 
        }
    }

    mergeSort() {}

    quickSort() {}

    render() {
        //const {styleArray} = this.state;

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
                                    /*{backgroundColor: `rgb(${value[0]}, ${value[1]}, ${value[2]})`,
                                    width: `${window.innerWidth * 0.005}px`,//}}></div>
                                    //margin: `${window.innerWidth * .002}px`}}></div>
                                    margin: `0px`}*/
                    ))} 
                </div>
            </>
        );
        
    }

}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// export default App

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
    /*
    h = h / 360;

    if(s === 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    //return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    return [Math.min(Math.floor(r * 256), 255), Math.min(Math.floor(g * 256), 255), Math.min(Math.floor(b * 256), 255)];
    */
}