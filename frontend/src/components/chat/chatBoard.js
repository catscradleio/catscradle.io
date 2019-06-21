import React from 'react';
import './chat.css';
import socketIOClient  from 'socket.io-client';
import $ from 'jquery';



class ChatBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            endpoint: "localhost:4001",
            message: 'test',
        };
        this.sendMessages = this.sendMessages.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    sendMessages(){
        const socket = socketIOClient(this.state.endpoint);

        $('form').submit(function(e){
            e.preventDefault();
            socket.emit('chat message', $('#m').val());

            return false;
        });
        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
        });
        this.setState({message: ''});
    }

    handleUpdate(e){
        this.setState({message: e.target.value});
    }


    render() {
 
        return (
            <div className='chatBoardContainer'>
                <ul id='messages' className='messages'></ul>
                <form className='messagesForm' action=''
                      onSubmit={e => this.sendMessages(e)}>
                    <input className='m' id='m' 
                           autoComplete='off' 
                           placeholder='Type your guess here..'
                           onChange={(e) => this.handleUpdate(e)}/>
                    <button onClick={() => this.sendMessages()} className='sendButton'>Send</button>
                </form>
            </div>
        )
    }
}
export default ChatBoard;