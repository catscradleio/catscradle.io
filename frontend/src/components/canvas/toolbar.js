import React from 'react';
import './canvas.css';
import ToolBrush from './toolBrush';


class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolType: '',
            modal: true
        };
        this.changeStrokeSize = this.changeStrokeSize.bind(this);
    }

    changeColor(color){
        this.props.changeColor(color);
    }

    changeStrokeSize(size){
        this.props.changeStrokeSize(size);
    }

    hideModal(){
        this.setState({modal: false});
    }

    componentDidMount(){
        // document.addEventListener('click', this.hideModal);
    }

    componentDidUpdate(){
        // document.removeEventListener('click', this.hideModal);
    }

    showModal(){
        this.setState({modal: true});
    }


    render() {
        return (
            <div id='canvasToolbarContainer'>
                {(this.state.modal) ? <ToolBrush 
                    lineWidth = {this.props.lineWidth}
                    changeStrokeSize={this.changeStrokeSize}/> : ''}

                <div id='tool_brushSize'>
                    <img className='toolIcon' src='/icons/tools_draw.png'
                        alt='brush'
                        onClick={() => {
                        this.props.returnToBrush()}} />
                </div>

                <div id='tool_eraser'>
                    <img className='toolIcon' src='/icons/tools_erase.png'
                        alt='erase'
                        onClick={() => this.props.changeColor('#fff')} />
                </div>

                {/* <div id='tool_eyedropper'>
                    <img className='toolIcon' src='/icons/tools_eyedropper.png'
                        alt='eyedropper'
                         />
                </div>

                <div id='tool_fill'>
                    <img className='toolIcon' src='/icons/tools_fill.png'
                        alt='fill'
                         />
                </div> */}

                <div id='tool_undo'>
                    <img className='toolIcon' src='/icons/tools_undo.png'
                        alt='undo'
                        onClick={()=>this.props.undo()}/>
                </div>

                <div id='tool_clear'>
                    <img className='toolIcon' src='/icons/tools_clear.png'
                        alt='clear'
                        onClick={() => this.props.clear()}/>
                </div>
                <div id='tool_save'>
                    <img className='toolIcon' src='/icons/tools_save.png'
                        alt='save'
                        onClick={() => this.props.save()}/>
                </div>

            </div>
        );
    }
}
export default Toolbar;