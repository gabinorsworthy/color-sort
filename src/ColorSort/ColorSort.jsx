import React from 'react';
import './ColorSort.css';

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

    bubbleSort() {}

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
                                    width: `${window.innerWidth * 0.005}px`,
                                    margin: `${window.innerWidth * .002}px`}}></div>
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