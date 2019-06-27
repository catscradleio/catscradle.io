import React from 'react';
import './canvas.css';


class ToolBrush extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            brushSize: this.props.lineWidth,
        };

        this.node = React.createRef();
        this.changeValue = this.changeValue.bind(this);

    }

    hideModal(e) {
        if (!this.node.current.contains(e.target)) { 
            this.props.hideDropdown();
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.hideModal);
    }

    componentDidUpdate() {
        document.removeEventListener('click', this.hideModal);
    }

    changeValue(){
        let slider = document.getElementById('myRange');
        this.setState({brushSize: slider.value});
        this.props.changeStrokeSize(this.state.brushSize);
        // console.log(slider.value);
    }


    render() {
        return (
            <div ref={this.node} className='toolBrushSizeContainer'>
                    <input className="slider" id="myRange"
                        type="range"
                        min="1"
                        max="100"
                        value={this.state.brushSize}
                        // onInput={() => this.setState({brushSize: value})}
                        onChange={() => this.changeValue()} />
            </div>
        );
    }
}
export default ToolBrush;
