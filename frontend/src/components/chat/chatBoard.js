import React from 'react';
import './chat.css';
import socketIOClient  from 'socket.io-client';
import $ from 'jquery';
import io from 'socket.io-client';



class ChatBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            endpoint: "localhost:4001",
            message: 'test',
            ///
            color: 'white'
            ///
        };
        this.sendMessages = this.sendMessages.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    // sending sockets
    send(){
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', this.state.color) // change 'red' to this.state.color
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

    ///

    // adding the function
    setColor(color){
        this.setState({ color });
    }

    ///

    render() {
        // testing for socket connections

        const socket = socketIOClient(this.state.endpoint);
        socket.on('change color', (col) => {
            document.body.style.backgroundColor = col
        })

        return (
            <div className='chatBoardContainer'>
                <ul id='messages' className='messages'></ul>
                <form className='messagesForm' action=''>
                    <input className='m' id='m' autoComplete='off' onChange={(e) => this.handleUpdate(e)}/>
                    <button onClick={() => this.sendMessages()} className='sendButton'>Send</button>
                </form>
                {/* <button onClick={() => this.send()}>Change Color</button>


                <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                <button id="red" onClick={() => this.setColor('red')}>Red</button> */}

            </div>
        )
    }
}
export default ChatBoard;