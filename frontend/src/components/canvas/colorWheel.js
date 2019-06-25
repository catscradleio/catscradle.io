import React from 'react';
import './canvas.css';
import { COLORS_HASH } from '../../constants';

class ColorWheel extends React.Component {
    constructor(props) {
        super(props);
        this.drawColorWheel = this.drawColorWheel.bind(this);
        this.node = React.createRef();
        this.getColor = this.getColor.bind(this);
    }

    changeColor(color) {
        this.props.changeColor(color);
    }




    drawColorWheel() {
        let canvas = document.getElementById('colorWheel');
        let ctx = canvas.getContext('2d');
        for (let i = 0; i <= 12; i++) {
            ctx.beginPath();
            let segment = 2 * Math.PI / 12;
            // in radians
            // arc path : (x, y, r, sAngle, eAngle, counterclockwise)
            ctx.fillStyle = COLORS_HASH[i];
            ctx.moveTo(100, 75);
            ctx.arc(100, 75, 50, segment * i, segment * i + segment);
            ctx.lineTo(100, 75);
            ctx.fill();
        }
    }

    drawColorWheelSegments() {
        let canvas = document.getElementById('colorWheel');
        let ctx = canvas.getContext('2d');
        for (let i = 0; i <= 12; i++) {
            ctx.beginPath();
            let segment = 2 * Math.PI / 12;
            // in radians
            // arc path : (x, y, r, sAngle, eAngle, counterclockwise)
            ctx.fillStyle = COLORS_HASH[i];
            ctx.moveTo(50, 50);
            ctx.arc(50, 50, 50, segment * i, segment * i + segment);
            ctx.lineTo(50, 50);
            ctx.fill();
        }
    }

    getColor(e) {
        if (this.node.current !== null && this.node.current.contains(e.target)) {
            let canvas = document.getElementById('colorWheel');
            let ctx = canvas.getContext('2d');
            let color = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
            let rgba = `rgba(${color.data[0]},${color.data[1]},${color.data[2]},${color.data[3]})`;
            if (rgba !== 'rgba(0,0,0,0)') this.changeColor(rgba);
        }
    }

    componentDidUpdate() {

    }

    componentDidMount() {
        // this.drawColorWheel();
        this.drawColorWheelSegments();
        document.addEventListener('click', this.getColor);
    }

    render() {
        return (
            <div id='colorCanvasHolder'>
                <canvas ref={this.node} id='colorWheel' width='100' height='100' />
            </div>
        )
    }
}

export default ColorWheel;