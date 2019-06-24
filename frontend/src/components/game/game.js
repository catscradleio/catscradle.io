import React from 'react';
import './game.css';
import defaultFile from '../../input/default.txt';
import $ from 'jquery';


class Game extends React.Component {
    constructor(props) {
        super(props);
        
        this.list = React.createRef();
        
        this.state = {
            guess: '',
            word: ''
        };
        
        this.handleFiles = this.handleFiles.bind(this);
        this.readDefault = this.readDefault.bind(this);
        this.setupGame = this.setupGame.bind(this);
    }

    // resources for file reading: https://stackoverflow.com/questions/27522979/read-a-local-text-file-using-javascript

    readDefault(file){
        let rawFile = new XMLHttpRequest();
        let returnText = '';
        rawFile.open('GET', file, false);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0){ 
                    var allText = rawFile.responseText;
                    returnText = allText;
                }
            }
        };
        rawFile.send(null); 
        return returnText;
    }

    chooseWord(){
        let text = this.readDefault(defaultFile);
        let divided = text.split(/\n/g);
        return divided[(Math.floor(Math.random() * divided.length))];
    }

    // let players submit their own text files to play with
    handleFiles(e){
        let fileInput = document.getElementById('fileInput');
        // console.log(e.target[0]);
        var file = fileInput.files[0];
        var textType= /text.*/;

        if (file.type.match(textType)){
            var reader = new FileReader();

            reader.onload = function(e) {
                var content = reader.result;
                let textByLine = content.split('\n');
                return textByLine;
            };
            reader.readAsText(file);
        } else {
            alert('File not supported');
        }
    }

    componentDidMount(){
        // jQuery(React.findDOMNode(this.refs.list)).setupGame();
        this.game();
    }

    setupGame(){
        let word = this.chooseWord();
        let list = document.getElementById('guessContainer');
        this.setState({word: word});
    
        for (let i = 0; i < word.length; i++) {
            $(list).append($("<li>__</li>"));
        }
    }

    game(){
        this.setupGame();
    }

    win(){
        if (this.state.word === this.state.guess) {
            console.log('win');
            return true;
        } 
        this.setState({guess: '' });
        console.log('lose');
        return false;
    }


    handleChange(e){
        this.setState({guess: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.win();
    }

    render() {
        return (
            <div id='gameContainer'>
                {/* {this.setupGame()} */}
                <ul ref={this.list} id='guessContainer'>

                </ul>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type='text'
                           placeholder={this.state.guess}
                           onChange={e => this.handleChange(e)}>
                    </input>
                </form>
                {/* <input id='fileInput' type='file' onChange={e => this.handleFiles(e)}/> */}

            </div>
        );
    }
}
export default Game;
