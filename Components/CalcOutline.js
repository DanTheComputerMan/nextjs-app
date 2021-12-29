// function CalcOutline() {
//     return <div>This is CG's test page.</div>
// }

import React from "react";
import Display from "../Components/Display";
import Button from "../Components/Button";

class CalcOutline extends React.Component {
    constructor() {
        super();
        this.state = {
            display: 0,
            firstNumber: 0,
            stage: 1,
            secondNumber: null,
            operator: null,
            history: []
        };
    }
    
    equate = () => {
        let result;
        let secnum = this.state.secondNumber || this.state.firstNumber;
        if (this.state.stage === 2) { // 2nd number mode.
            switch (this.state.operator) {
                case "/":
                    result = this.state.firstNumber / secnum; break;
                case "*":
                    result = this.state.firstNumber * secnum; break;
                case "-":
                    result = this.state.firstNumber - secnum; break;
                case "+":
                    result = Number(this.state.firstNumber) + Number(secnum); break; // b/c of js interaction with + with numbers and strings.
                // default: // operator doesn't exist.
                //     return this.state.display;
            }
        }
        console.log('equate', this.state, secnum, result);
        this.setState(prevState => {
            let _arr = prevState.history.slice(); // make copy of old history.
            _arr.push({
                display: prevState.display,
                firstNumber: prevState.firstNumber,
                secondNumber: prevState.secondNumber,
                operator: prevState.operator
            });
            return {
                display: result || this.state.display,
                secondNumber: null,
                operator: null,
                stage: 1,
                history: _arr
            }
        });
        // return result || this.state.display; // first number only, operator doesn't exist, and general catch all.
    }
    
    handleClick = (event) => {
        const { name } = event.target;
        // console.log(name);
        switch (name) {
            case "CE":
                this.setState({
                    display: 0,
                    firstNumber: 0,
                    stage: 1,
                    secondNumber: null,
                    operator: null
                });
                break;
            case "←":
                this.setState(prevState => {
                    if (prevState.operator) {
                        return {
                            display: (''+prevState.display).substring(0, prevState.display.length-1) || 0,
                            secondNumber: (''+prevState.secondNumber).substring(0, prevState.secondNumber.length-1) || 0
                        }
                    } else {
                        return {
                            display: (''+prevState.display).substring(0, prevState.display.length-1) || 0,
                            firstNumber: (''+prevState.firstNumber).substring(0, prevState.firstNumber.length-1) || 0
                        }
                    }
                });
                break;
            case "/":
            case "*":
            case "-":
            case "+":
                if (this.state.operator) { // to chain operators, 5 + 3 + 9 + 10 / 2
                    return this.setState(prevState => {
                        let _val;
                        switch(prevState.operator) {
                            case "/":
                                _val = prevState.firstNumber / prevState.secondNumber; break;
                            case "*":
                                _val = prevState.firstNumber * prevState.secondNumber; break;
                            case "-":
                                _val = prevState.firstNumber - prevState.secondNumber; break;
                            case "+":
                                _val = Number(prevState.firstNumber) + Number(prevState.secondNumber); break;
                        }
                        return {
                            display: _val,
                            firstNumber: _val,
                            secondNumber: null,
                            stage: 2,
                            operator: name
                        }
                    });
                }
                this.setState({
                    firstNumber: this.state.display,
                    secondNumber: null,
                    stage: 2,
                    operator: name
                });
                break;
            case ".":
                console.log(this.state);
                if ((''+this.state.display).includes('.')) return;
                this.setState(prevState => {
                    if (prevState.stage === 1) {
                        return {
                            firstNumber: prevState.firstNumber + '.',
                            display: prevState.display + '.'
                        }
                    } else if (prevState.stage === 2) {
                        return {
                            secondNumber: prevState.secondNumber + '.',
                            display: prevState.display + '.'
                        }
                    }
                });
                break;
            case "x2":
                this.setState(prevState => {
                    if (prevState.secondNumber) {
                        return {
                            display: prevState.display**2,
                            secondNumber: prevState.secondNumber**2
                        }
                    }
                    return {
                        display: prevState.display**2,
                        firstNumber: prevState.firstNumber**2
                    }
                });
                break;
            case "n!":
                let factorial = (n) => {
                    if (n <= 1) return 1;
                    return n * factorial(n - 1);
                }
                let fact = factorial(this.state.display);
                this.setState(prevState => {
                    if (prevState.secondNumber) {
                        return {
                            display: fact,
                            secondNumber: fact
                        }
                    }
                    return {
                        display: fact,
                        firstNumber: fact
                    }
                });
                break;
            case "±":
                this.setState(prevState => {
                    if (prevState.secondNumber) {
                        return {
                            display: -prevState.display,
                            secondNumber: -prevState.secondNumber
                        }
                    }
                    return {
                        display: -prevState.display,
                        firstNumber: -prevState.firstNumber
                    }
                });
                break;
            case "%":
                this.setState(prevState => {
                    if (prevState.secondNumber) {
                        return {
                            display: prevState.display / 100,
                            secondNumber: prevState.secondNumber / 100
                        }
                    }
                    return {
                        display: prevState.display / 100,
                        firstNumber: prevState.firstNumber / 100
                    }
                });
                break;
            case "=":
                this.equate();
                break;
            default: // 0-9
                let disp = (_val) => {
                    _val = ''+_val;
                    return (_val.includes(0) && _val.includes(".")) ? _val + name : (Number(_val) ? _val + name : name)
                    // return Number(_val) ? _val + name : name
                }
                if (this.state.stage === 1) {
                    this.setState({
                        firstNumber: disp(this.state.firstNumber),
                        display: disp(this.state.display),
                    });
                } else if (this.state.stage === 2) {
                    if (!this.state.secondNumber) {
                        this.setState({
                            display: name,
                            secondNumber: name
                        });
                    } else {
                        this.setState({
                            display: disp(this.state.secondNumber),
                            secondNumber: disp(this.state.secondNumber)
                        });
                    }
                }
                break;
        }
    }
    
    render() {
        return (
        <div>
            {/* <button onClick={() => console.log(this.state.history)}>History</button><br /> */}
            <Display name={this.state.display}/><br />
            <Button name="CE" onClick={this.handleClick}/><Button name="x2" modifiers={{pow:true}} onClick={this.handleClick}/><Button name="←" onClick={this.handleClick}/><br />
            <Button name="n!" onClick={this.handleClick}/><Button name="±" onClick={this.handleClick}/><Button name="%" onClick={this.handleClick}/><br />
            <Button name="7" onClick={this.handleClick}/><Button name="8" onClick={this.handleClick}/><Button name="9" onClick={this.handleClick}/><Button name="/" onClick={this.handleClick}/><br />
            <Button name="4" onClick={this.handleClick}/><Button name="5" onClick={this.handleClick}/><Button name="6" onClick={this.handleClick}/><Button name="*" onClick={this.handleClick}/><br />
            <Button name="1" onClick={this.handleClick}/><Button name="2" onClick={this.handleClick}/><Button name="3" onClick={this.handleClick}/><Button name="-" onClick={this.handleClick}/><br />
            <Button name="." onClick={this.handleClick}/><Button name="0" onClick={this.handleClick}/><Button name="=" onClick={this.handleClick}/><Button name="+" onClick={this.handleClick}/><br />
            <br />
            {/* <div>
                display: {this.state.display}<br />
                firstNumber: {this.state.firstNumber}<br />
                secondNumber: {this.state.secondNumber}<br />
                stage: {this.state.stage}<br />
                operator: {this.state.operator}<br />
                history: {JSON.stringify(this.state.history)}<br />
            </div> */}
        </div>);
    }
}

export default CalcOutline;