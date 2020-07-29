import React from 'react';
import './ColorSort.css';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleSort.js'

export default class ColorSort extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = []
        for (let i = 0; i < 100; i ++) {
            array.push(randomInt(0, 360));
        }

        this.setState({array})
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

        console.log(animations);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            setTimeout(() => {
                const[barOneIdx, barTwoIdx] = animations[i];

                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                let temp = barOneStyle.backgroundColor;
                barOneStyle.backgroundColor = barTwoStyle.backgroundColor;
                barTwoStyle.backgroundColor = temp;

            }, i * 10);

        }
    }

    mergeSort() {}

    quickSort() {}

    render() {
        const {array} = this.state;

        return (
            <>
                <div className="tool-bar">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                </div>
                
                <div className="bar-container">    
                    {array.map((value, idx) => (
                        <div 
                            className="array-bar"
                            key={idx}
                            style={{backgroundColor: `hsl(${value}, 100%, 50%)`,
                                    width: `${window.innerWidth * 0.005}px`,//}}></div>
                                    //margin: `${window.innerWidth * .002}px`}}></div>
                                    margin: `0px`}}></div>
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