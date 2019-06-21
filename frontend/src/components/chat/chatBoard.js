import React from 'react';
import './chat.css';
import socketIOClient  from 'socket.io-client';
import $ from 'jquery';



class ChatBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            endpoint: "localhost:4001",
            message: ''
        };
    }


    sendMessages(e){
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('chat message', this.state.message);
        $('#m').val('');

        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
        });
    }

    handleUpdate(e){
        this.setState({message: e.target.value});
    }

    componentDidMount(){
    }

    componentDidUpdate(){
    }

    scrollToBottom(){
        this.messagesEnd.scrollIntoView({behavior: 'smooth'});
        console.log(this.messagesEnd);
    }


    render() {

        
        return (
            <div className='chatBoardContainer'>
                <div className='messagesContainer'>
                    <ul id='messages' className='messages'></ul>
                    <div ref={(el) => {this.messagesEnd = el;}}>
                        hi
                    </div>
                </div>

                <form className='messagesForm' action=''>
                    <input className='m' id='m' 
                           autoComplete='off' 
                           onChange = {e => this.handleUpdate(e)}
                           placeholder='Type your guess here..'
                           />
                    <button className='sendButton' 
                            onClick={
                            e => {this.sendMessages()
                            this.scrollToBottom()}}
                            >Send</button>
                </form>
            </div>

        )
    }
}
export default ChatBoard;