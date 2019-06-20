import React from 'react';
import './canvas.css';
import ToolBrush from './toolBrush';


class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolType: '',
            modal: true,
            mode: ''
        };
        this.changeStrokeSize = this.changeStrokeSize.bind(this);
        // this.changeImage = this.changeImage.bind(this);
    }

    resetSelect(){
        document.getElementById('tool_draw').setAttribute('src', '/icons/tools_draw.png');
        document.getElementById('tool_erase').setAttribute('src', '/icons/tools_erase.png');
        document.getElementById('tool_undo').setAttribute('src', '/icons/tools_undo.png');
        document.getElementById('tool_fill').setAttribute('src', '/icons/tools_fill.png');
        document.getElementById('tool_save').setAttribute('src', '/icons/tools_save.png');
        document.getElementById('tool_eyedropper').setAttribute('src', '/icons/tools_eyedropper.png');
        document.getElementById('tool_clear').setAttribute('src', '/icons/tools_clear.png');
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
        document.getElementById('tool_draw').setAttribute('src', '/icons/tools_draw_select.png');
        this.setState({mode: 'draw'});
        // document.addEventListener('click', this.eyedropper);
    }

    componentDidUpdate(prevprops){
        // console.log(prevprops);
        if (prevprops.mode !== this.props.mode) {
            this.setState({ mode: this.props.mode });
        }
        document.removeEventListener('click', this.hideModal);
    }

    showModal(){
        this.setState({modal: true});
    }



    changeImage(element, imageLink){
        let img = document.getElementById(`${element}`);
        img.setAttribute('src', imageLink);
    }

    setModeProperties(mode){
        this.props.changeState(mode)
    }

    setMode(mode){
        this.resetSelect();
        this.props.changeState(mode);
        this.setState({ mode: `${mode}` });
        this.changeImage(`tool_${mode}`, `/icons/tools_${mode}_select.png`);
    }


    render() {
        
        return (
            <div id='canvasToolbarContainer'>
                {(this.state.modal) ? <ToolBrush 
                    lineWidth = {this.props.lineWidth}
                    changeStrokeSize={this.changeStrokeSize}/> : ''}

                <div >
                    <img id='tool_draw' className='toolIcon' src='/icons/tools_draw.png'
                        alt='brush'
                        onMouseOver={(this.state.mode !== 'draw') ?
                            () => this.changeImage('tool_draw', '/icons/tools_draw_hover.png')
                            : function () {}}
                        onMouseOut={
                            (this.state.mode !== 'draw') ? () => this.changeImage('tool_draw', '/icons/tools_draw.png') : this.changeImage('tool_draw', '/icons/tools_draw_select.png')}
                        onClick={() => {
                            this.setMode('draw');
                            this.props.returnToBrush()}} />
                </div>

                <div >
                    <img id='tool_erase' className='toolIcon' src='/icons/tools_erase.png'
                        alt='erase'
                        onMouseOver={(this.state.mode !== 'erase') ? 
                            () => this.changeImage('tool_erase', '/icons/tools_erase_hover.png')
                            : function(){}}
                        onMouseOut={(this.state.mode !== 'erase') ? 
                            () => this.changeImage('tool_erase', '/icons/tools_erase.png') 
                            : this.changeImage('tool_erase', '/icons/tools_erase_select.png')}
                        onClick={() => {
                            this.setMode('erase');
                            this.props.changeColor('#fff')} }/>
                </div>

                <div >
                    <img id='tool_eyedropper' className='toolIcon' src='/icons/tools_eyedropper.png'
                        alt='eyedropper'
                        onMouseOver={(this.state.mode !== 'eyedropper') ? 
                            () => this.changeImage('tool_eyedropper', '/icons/tools_eyedropper_hover.png')
                            : function(){}}
                        onMouseOut={(this.state.mode !== 'eyedropper') ? 
                            () => this.changeImage('tool_eyedropper', '/icons/tools_eyedropper.png')
                            : this.changeImage('tool_eyedropper', '/icons/tools_eyedropper_select.png')}
                        onClick={() => {
                            this.setMode('eyedropper');
                        }}
                        />
                </div>

                <div >
                    <img id='tool_fill' className='toolIcon' src='/icons/tools_fill.png'
                        alt='fill'
                        onMouseOver={() => this.changeImage('tool_fill', '/icons/tools_fill_hover.png')}
                        onMouseOut={() => this.changeImage('tool_fill', '/icons/tools_fill.png')}
                         />
                </div>

                <div >
                    <img id='tool_undo' className='toolIcon' src='/icons/tools_undo.png'
                        alt='undo'
                        onMouseOver={() => this.changeImage('tool_undo', '/icons/tools_undo_hover.png')}
                        onMouseOut={() => this.changeImage('tool_undo', '/icons/tools_undo.png')}
                        onClick={()=>this.props.undo()}/>
                </div>

                <div >
                    <img id='tool_clear' className='toolIcon' src='/icons/tools_clear.png'
                        alt='clear'
                        onMouseOver={() => this.changeImage('tool_clear', '/icons/tools_clear_hover.png')}
                        onMouseOut={() => this.changeImage('tool_clear', '/icons/tools_clear.png')}
                        onClick={() => {
                            this.changeImage('tool_clear', '/icons/tools_clear_select.png')
                            this.props.clear()
                            this.props.returnToBrush()
                            this.resetSelect();
                            this.setState({ mode: 'draw' })
                            }}/>
                </div>
                <div >
                    <img id='tool_save' className='toolIcon' src='/icons/tools_save.png'
                        alt='save'
                        onMouseOver={() => this.changeImage('tool_save', '/icons/tools_save_hover.png')}
                        onMouseOut={() => this.changeImage('tool_save', '/icons/tools_save.png')}
                        onClick={() => this.props.save()}/>
                </div>

            </div>
        );
    }
}
export default Toolbar;