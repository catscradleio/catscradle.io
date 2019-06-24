import React from 'react';
import './canvas.css';
import Toolbar from './toolbar';
import ColorWheel from './colorWheel';
import {CANVAS_HEIGHT, CANVAS_WIDTH} from '../../constants';


class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.lastX = 0;
        this.lastY = 0;
    
        this.drawArea = React.createRef();
        this.historyStack = [];

        // canvas drawing style
        this.state ={
            isDrawing: false,
            strokeStyle: `#000`,
            lineWidth: 2,
            lastDrawColor: '#000',
            history: [],
            history2: [],
            height: CANVAS_HEIGHT,
            width: CANVAS_WIDTH,
            mode: 'draw'
            // history2: []
        };

        // binding functions
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.draw = this.draw.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.changeStrokeSize = this.changeStrokeSize.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.returnToBrush = this.returnToBrush.bind(this);
        this.save = this.save.bind(this);
        this.undo = this.undo.bind(this);
        this.changeState = this.changeState.bind(this);
        this.eyedropper = this.eyedropper.bind(this);
        this.changeCursor = this.changeCursor.bind(this);
    }

 
    componentDidMount(){
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.draw);
        document.addEventListener('click', this.eyedropper);
    }
    
    componentDidUpdate(){
        document.addEventListener('mouseup', this.handleMouseUp);

    }
    
    handleMouseUp() {
        this.setState({isDrawing: false});
    }

    handleMouseDown(e) {
        [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
        this.setState({ isDrawing: !this.state.isDrawing });
    }

    draw(e){
        if (this.state.mode === 'erase') this.setState({strokeStyle: '#fff'});

        if ((this.state.mode ==='erase' || this.state.mode === 'draw') 
        && this.state.isDrawing && this.drawArea.current.contains(e.target)) {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.strokeStyle = this.state.strokeStyle;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = this.state.lineWidth;
            ctx.beginPath();
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            // this.setState({history : (ctx.save())});
            [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
            // this.historyStack.push(this.save());
            // this.setState({history2: this.historyStack});
            this.setState({history: this.save()});
        }

    }

    changeColor(color){
        if (color !== '#fff'){
            this.setState({lastDrawColor: color});
        }
        this.setState({strokeStyle: color});
    }

    changeCursor(e){
        var css = '#canvas:hover{ cursor: url(/cursor/cursor_eyedropper.png) 2 15, pointer }';
        var style = document.createElement('style');
        if (this.state.mode === 'eyedropper' && this.drawArea.current.contains(e.target)) {
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }

    returnToBrush(){
        this.setState({strokeStyle: this.state.lastDrawColor});
    }

    changeStrokeSize(size){
        this.setState({lineWidth: size});
    }

    save(){
        let canvas = document.getElementById('canvas');
        var dataURL = canvas.toDataURL();
        return dataURL;
        // console.log(dataURL);
    }

    eyedropper(e) {
        if (this.state.mode === 'eyedropper' && this.drawArea.current.contains(e.target)) {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            let color = ctx.getImageData(e.offsetX, e.offsetY, 1, 1);
            let rgba = `rgba(${color.data[0]},${color.data[1]},${color.data[2]},${color.data[3]})`;
            if (rgba !== 'rgba(0,0,0,0)') this.changeColor(rgba);
        }
    } 

    undo(){
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        var myImg = new Image();
        let imgsrc = 'data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEsCAYAAAA1u0HIAAAWgklEQVR4Xu3dv6st13kG4M8EDCIp4jJgiP+DOGXAxnaTLthp0tpp00huXKSR1aRwI7tJK6kJpJJUprJEwG2kvyAygdQyxGAIxOGVZ8j2zrln7XPO7L3XfPMMXHTv1ZyZtZ5viVfzY635UtkIECBAgACB3Qt8afc90AECBAgQIECgBLpBQIAAAQIEGggI9AZF1AUCBAgQICDQjQECBAgQINBAQKA3KKIuECBAgAABgW4MECBAgACBBgICvUERdYEAAQIECAh0Y4AAAQIECDQQEOgNiqgLBAgQIEBAoBsDBAgQIECggYBAb1BEXSBAgAABAgLdGCBAgAABAg0EBHqDIuoCAQIECBAQ6MYAAQIECBBoICDQGxRRFwgQIECAgEA3BggQIECAQAMBgd6giLpAgAABAgQEujFAgAABAgQaCAj0BkXUBQIECBAgINCNAQIECBAg0EBAoDcooi4QIECAAAGBbgwQIECAAIEGAgK9QRF1gQABAgQICHRjgAABAgQINBAQ6A2KqAsECBAgQECgGwMECBAgQKCBgEBvUERdIECAAAECAt0YIECAAAECDQQEeoMi6gIBAgQIEBDoxgABAgQIEGggINAbFFEXCBAgQICAQDcGCBAgQIBAAwGB3qCIukCAAAECBAS6MUCAAAECBBoICPQGRdQFAgQIECAg0I0BAgQIECDQQECgNyiiLhAgQIAAAYFuDBAgQIAAgQYCAr1BEXWBAAECBAgIdGOAAAECBAg0EBDoDYqoCwQIECBAQKAbAwQIECBAoIGAQG9QRF0gQIAAAQIC3RggQIAAAQINBAR6gyLqAgECBAgQEOjGAAECBAgQaCAg0BsUURcIECBAgIBANwYIECBAgEADAYHeoIi6QIAAAQIEBLoxQIAAAQIEGggI9AZF1AUCBAgQICDQjQECBAgQINBAQKA3KKIuECBAgAABgW4MECBAgACBBgICvUERdYEAAQIECAh0Y4AAAQIECDQQEOgNiqgLBAgQIEBAoBsDBAgQIECggYBAb1BEXSBAgAABAgLdGCBAgAABAg0EBHqDIuoCAQIECBAQ6MYAAQIECBBoICDQGxRRFwgQIECAgEA3BggQIECAQAMBgd6giLpAgAABAgQEujFAgAABAgQaCAj0BkXUBQIECBAgINCNAQIECBAg0EBAoDcooi4QIECAAAGBbgwQIECAAIEGAgK9QRF1gQABAgQICHRjgAABAgQINBAQ6A2KqAsECBAgQECgGwMECBAgQKCBgEBvUERdIECAAAECAt0YIECAAAECDQQEeoMi6gIBAgQIEBDoxgABAgQIEGggINAbFFEXCBAgQICAQDcGCBAgQIBAAwGB3qCIukCAAAECBAS6MUCAAIGHBf64qv6sqr62/Pp6VeXvvn1FsI + q6jtXPL5DNxYQ6I2Lq2sECDwqkGD + bVWtQb0Gd0I7f3eP7eMr / w / DPfrknDcSEOg3gnYaAgTuJpDg / tMlpBPU36yqP7iwNQnYz6vqk6r6bPmV3 + fvbASmEhDoU5VDYwgQeIFArrAT3AnwBHf + /NiV9qdLMK9BvQZ3mpBb3zYCuxIQ6Lsql8YSIHAmkNB+var+rqq+/AqdBHdCO1fWCeo1wGESaCUg0FuVU2cIHEIgz7i / X1U / OLsC / 5 + q + tcluNdb5K60DzEkdDICAt04IEBgLwIJ8O9W1fdOGvyrqvqgqt51m3wvZdTOawkI9GvJOi4BAlsI5Hl4rsYT4rkyX7cPT4J8i / M4BoHdCwj03ZdQBwi0Ecjz8Mz7zotsCfLzt9HzLDxX4vnlLfM2ZdeRrQQE + laSjkOAwFMFEtzfWsL7r14xley / q + ofq + qny8tsTz2H / QkcRkCgH6bUOkrg7gKnAZ4r8NNb6Gnc + lJbXmTLS23ri213b7gGENiDgEDfQ5W0kcA + BUYB / svlRbYE + DqdbJ891WoCEwgI9AmKoAkEmggI8CaF1I19Cgj0fdZNqwnMIrDOCf / JAwu7uAKfpUracQgBgX6IMuskgc0F1ulkmRu + bnmB7Z9ObqNnRTYbAQI3EhDoN4J2GgINBHI1noVd3jhboS1zwjOVLAu82AgQuJOAQL8TvNMS2JFA5oe / eba4S1Zoy1SyBLkr8R0VU1P7Cgj0vrXVMwIvFcjt9KzSltvr65bPia6Lu7z0 + H6eAIENBQT6hpgORaCBQK7GE + K5rb7OE1 / XS / +xq / EGFdaFtgICvW1pdYzAkwSyVvq6Zvr6g1lqNbfV82zcUqtP4rQzgdsLCPTbmzsjgVkEXvUt8fd8vWyWEmkHgcsFBPrlVvYk0EHgVW + qZ8rZj3z4pEOJ9eGoAgL9qJXX76MJPHRL3bfEjzYK9Le1gEBvXV6dO7hAlmLNc / G8re5b4gcfDLrfX0Cg96 + xHh5LIM / F18Vf8vt1W78lnhfczBs / 1pjQ24MICPSDFFo3Wwusz8VzWz2 / 1i231Nc54 / kUqY0AgcYCAr1xcXWtvcC6nnpC / PSWet5Sz5W4pVjbDwEdJPB / AgLdaCCwL4F14Ze / P / u6mTnj + 6qj1hLYXECgb07qgAQ2F1hvqeflttNlWDPV7B + sp765twMS2KWAQN9l2TT6IAIP3VI31ewgxddNAk8VEOhPFbM / gesK5Go8U81 + cnZLff0oimVYr + vv6AR2KyDQd1s6DW8msF6N57b6urml3qzIukPgmgIC / Zq6jk3gcYH12Xi + YnY6Z / zD5bm4t9SNIAIELhYQ6BdT2ZHAZgJZwe31Zc74Ot3slydzxi38shm1AxE4joBAP06t9fT + ArmdniBPoK / b + mw8C8DYCBAg8GwBgf5sOj9I4CKB9ROlp + upryu45VvjrsYvYrQTAQIjAYE + EvLvCTxPIAGet9VP542vi7 + 4Gn + eqZ8iQOARAYFueBDYTmBdxS1hvr7kts4bz9W49dS3s3YkAgTOBAS6IUHg5QIPfWs8L7nl7XXzxl / u6wgECFwgINAvQLILgVcI5Hb6v5wtAJMPo + SW + kfUCBAgcEsBgX5LbefqIpDb6e + cPB / PAjA / WoL88y6d1A8CBPYlIND3VS + tva9A5oy / WVVvLM3I8 / HcVs / zcRsBAgTuKiDQ78rv5DsSyItub598dzy31hPsrsh3VERNJdBZQKB3rq6 + bSGQ5 + QJ8nUxmCwEkyD3xvoWuo5BgMBmAgJ9M0oHaiaQ5 + QJ8rzBni1vrSfIra / erNC6Q6CLgEDvUkn92Eogz8mzPGvCO7 / Pc / I8I88vt9e3UnYcAgQ2FxDom5M64I4F8pw8L72ti8LkOXleerM8646LqukEjiIg0I9Saf18TCDPx3N7fV2mNUu05grdXHLjhgCB3QgI9N2USkOvIJBb6gnyXJlny + 31BLm11q + A7ZAECFxXQKBf19fR5xXIrfQ8K1 + /R/6W5 + TzFkvLCBAYCwj0sZE9egnkrfV / PlmuNdPQcoXuOXmvOusNgcMJCPTDlfywHc7z8bzwtj4nz3Ktf + k5 + WHHg44TaCcg0NuVVIfOBM7nk3tObogQINBSQKC3LKtOLc / Gz9ddN5 / c0CBAoK2AQG9b2sN27HxhmECYT37Y4aDjBI4jINCPU + sj9PR8YRgvvB2h6vpIgMAXAgLdQOggcP4BFQvDdKiqPhAg8CQBgf4kLjtPJnC + wls + oJL55RaGmaxQmkOAwPUFBPr1jZ1he4G8uZ4X3k5XeMsLbwlzGwECBA4pINAPWfbddvqhF95 + tgS5L6HttqwaToDAFgICfQtFx7iFQNZYz1X5ulSrN9dvoe4cBAjsRkCg76ZUh21onpP / oqpeWwTy5npurfsS2mGHhI4TIPCQgEA3LmYWyFV5voaWLUu1 / k1VfTBzg7WNAAEC9xIQ6PeSd97HBHJb / Z2qyodUsnlObrwQIEBgICDQDZHZBDKn / P3lWXnWXc + b7K7KZ6uS9hAgMJ2AQJ + uJIduUKae5Rvl2fKsPFfo3l4 / 9JDQeQIELhUQ6JdK2e + aAplXnqvyvACX7S1zyq / J7dgECHQUEOgdq7qvPuWWel58y3PzrPSWq / JP9tUFrSVAgMD9BQT6 / Wtw1Bacv / iWeeV5q90t9qOOCP0mQOBFAgL9RXx++JkCubWeW + y51Z4X3xLk1l9 / JqYfI0CAQAQEunFwa4EsCpMV37Llq2i5xf7ZrRvhfAQIEOgmINC7VXTe / uRqPHPLMy0tmxff5q2VlhEgsEMBgb7Dou2wybkKT5jnuXlusefPlm7dYSE1mQCBeQUE + ry16dCyBHhur + cZebYPl4VivPjWobr6QIDAVAICfapytGrM6UdVclWeZ + dZOMZGgAABAlcQEOhXQHXIL67I10 + d / qaq / sLccqOCAAEC1xUQ6Nf1PdrRzS0 / WsX1lwCBaQQE + jSl2H1DzueW + 6jK7kuqAwQI7ElAoO + pWvO21dzyeWujZQQIHERAoB + k0FfqZm6xZ8W3dW55vlu + vtF + pVM6LAECBAg8JCDQjYvnCpx / t9zc8udK + jkCBAhsICDQN0A84CF8t / yARddlAgTmFhDoc9dnttb5bvlsFdEeAgQILAIC3VC4VOB0 + VbfLb9UzX4ECBC4kYBAvxH0jk + TF9 / eXpZsTTcs37rjYmo6AQJ9BQR639pu0TPLt26h6BgECBC4gYBAvwHyTk9xOrfc8q07LaJmEyBwHAGBfpxaX9rT8++WZ255wt0X0i4VtB8BAgTuICDQ74A + 8Sl9t3zi4mgaAQIEHhMQ6MZHBM4 / quLFN + OCAAECOxMQ6Dsr2BWamxXf3qmq3Gr33fIrADskAQIEbiEg0G + hPO85fFRl3tpoGQECBJ4kINCfxNVm50xHy1V5 / pntreXFtzYd1BECBAgcTUCgH63iv / sa2pvLc / Os + Jbvln90PAY9JkCAQC8Bgd6rno / 15vzFt / eWT52ajnacMaCnBAg0FhDojYt70rXz6Wi5Kv / gGF3XSwIECBxDQKD3rnOuynN7PbfZs3283GL / rHe39Y4AAQLHExDofWueMP / Pqnpt6eIPqyrfMbcRIECAQEMBgd6wqMvb6 + 8vc8t / XVXfqKpPenZVrwgQIEAgAgK93zjIVLSfL2 + xf1pVWTjGi2 / 96qxHBAgQ + D0Bgd5rQJyGueVbe9VWbwgQIPCogEDvM0Dy5noWi8mWKWn5s40AAQIEDiIg0HsUWpj3qKNeECBA4NkCAv3ZdNP8YKakvb20xpvs05RFQwgQIHBbAYF + W++tz / ZuVX1 / OejfVlX + bCNAgACBAwoI9P0WXZjvt3ZaToAAgc0FBPrmpFc / 4Oma7Pl + eaalmWN + dXYnIECAwNwCAn3u + py3LmGeOeaZnibM91U7rSVAgMBVBQT6VXk3PfjpUq757Gk + uOLKfFNiByNAgMB + BQT6Pmp3emWepVy / avW3fRROKwkQIHArAYF + K + nnn + c0zC3l + nxHP0mAAIHWAgJ97vIK87nro3UECBCYRkCgT1OK / 9cQYT5vbbSMAAEC0wkI9OlK8kWDhPmcddEqAgQITCsg0OcrjTCfryZaRIAAgekFBPpcJRLmc9VDawgQILAbAYE + T6mE + Ty10BICBAjsTkCgz1EyYT5HHbSCAAECuxUQ6PcvnTC / fw20gAABArsXEOj3LaEwv6 + /sxMgQKCNgEC/XymF + f3snZkAAQLtBAT6fUoqzO / j7qwECBBoKyDQb1 / a06 + mWZv99v7OSIAAgZYCAv22ZfXVtNt6OxsBAgQOIyDQb1dqt9lvZ + 1MBAgQOJyAQL9NyYX5bZydhQABAocVEOjXL70wv76xMxAgQODwAgL9ukNAmF / X19EJECBAYBEQ6NcbCsL8eraOTIAAAQJnAgL9OkNCmF / H1VEJECBA4BUCAn37oWGe + famjkiAAAECAwGBvv0Q + WlVvV5Vv66qr1bV59ufwhEJECBAgMDvCwj0bUfE96rq / eWQf15Vn2x7eEcjQIAAAQIPCwj07UZGbrX / e1Xlnz + sqlyp2wgQIECAwE0EBPp2zB9V1beq6uOq + vZ2h3UkAgQIECAwFhDoY6NL9nijqt6uql9V1dc8N7 + EzD4ECBAgsKWAQH + 55ter6t + Ww / x1VX3w8kM6AgECBAgQeJqAQH + a1 / neCfNfVNVrVfWzqsqVuo0AAQIECNxcQKA / n / wHy232vAT3m6r6E7fan4 / pJwkQIEDgZQIC / el + CfA8L0 + gZ3tvuTI33 / zpln6CAAECBDYSEOhPgzxdBS4vwOUW + 7tPO4S9CRAgQIDA9gIC / WmmeeHtu8sqcN + wcMzT8OxNgAABAtcTEOiX2 / 64qt5cpqblZbjPLv9RexIgQIAAgesKCPTLfE + XdP1OVWURGRsBAgQIEJhGQKCPS5Gr8Z9b0nUMZQ8CBAgQuJ + AQH / cPi / B / UdV / dHyNvv6Zvv9KubMBAgQIEDgAQGB / uphkTDPlXmu0H0K1X8 + BAgQIDC1gEB / uDyn09M + XT62Yp751ENZ4wgQIHBsAYH + cP3 / q6r + 0JX5sf / j0HsCBAjsSUCgP1yt3y5//RXLue5pOGsrAQIEjisg0B+u/Xp7PbfebQQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBQT62MgeBAgQIEBgegGBPn2JNJAAAQIECIwFBPrYyB4ECBAgQGB6AYE+fYk0kAABAgQIjAUE+tjIHgQIECBAYHoBgT59iTSQAAECBAiMBf4XKuzePN93HmwAAAAASUVORK5CYII=';
        myImg.onload= function(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.drawImage(myImg, 0, 0);
        };
        myImg.src = imgsrc;
    }

    changeState(mode){
        this.setState({mode: mode});
    }


    clear(){
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    render() {
        return (
            <div >
                <div id='canvasLayout'>
                
                <Toolbar 
                    changeState={this.changeState}
                    undo={this.undo}
                    save={this.save}
                    changeColor={this.changeColor}
                    changeStrokeSize={this.changeStrokeSize}
                    returnToBrush={this.returnToBrush}
                    lineWidth = {this.state.lineWidth}
                    clear = {this.clear}
                    changeCursor = {this.changeCursor}/>
                <canvas id='canvas'
                        ref={this.drawArea} 
                        height={`${this.state.height}`} 
                        width={`${this.state.width}`}/>
                    <ColorWheel changeColor={this.changeColor} />

                </div>
            </div>
        );
    }
}
export default Canvas;