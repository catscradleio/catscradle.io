import React from 'react';
import './chat.css';
import socketIOClient from 'socket.io-client';
import $ from 'jquery';



class ChatBoard extends React.Component {
    constructor() {
        super();
        this.messages = [];
        this.state = {
            endpoint: 'localhost:4001',
            // endpoint: "http://10.0.0.81:4001",
            message: '',
            messageArray: []
        };
        this.sendMessages = this.sendMessages.bind(this);
    }


    sendMessages(e) {
        e.preventDefault();
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        // this.setState({message: ''});

        socket.on('chat message', (msg) => {
            // this.messages.push(msg);
            // return this.setState({messageArray: this.messages});
            $('#messages').append($('<li>').text(msg));
        });

    }

    handleUpdate(e) {
        this.setState({ message: e.target.value });
    }


    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }


    message(msg, cb) {
        const socket = socketIOClient(this.state.endpoint);

        socket.emit('message', cb);
    }



    render() {
        // const socket = socketIOClient(this.state.endpoint);

        // console.log('hi');
        // socket.on('chat message', (msg) => {
        //     // this.messages.push(msg);
        //     // return this.setState({ messageArray: this.messages });
        //     $('#messages').append($('<li>').text(msg));
        // });

        // let messages = this.state.messageArray.forEach(msg => {
        //     return <li>{msg}</li>
        // });
        // console.log(messages)
        return (
            <div className='chatBoardContainer'>
                <div className='messagesContainer'>
                    <ul id='messages' className='messages'>
                        {/* {messages} */}
                    </ul>
                    <div ref={(el) => { this.messagesEnd = el; }}></div>
                </div>

                <form className='messagesForm' action=''
                    onSubmit={e => {
                        this.sendMessages(e)
                        this.scrollToBottom()
                    }}>
                    <input className='m' id='m'
                        autoComplete='off'
                        onChange={e => this.handleUpdate(e)}
                        placeholder='Type your guess here..'
                    />
                    <button className='sendButton'>Send</button>
                </form>

            </div>

        )
    }
}
export default ChatBoard;