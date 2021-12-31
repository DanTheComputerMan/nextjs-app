import React from "react";

import GraphFunctionInput from "../Components/GraphFunctionInput";
import classes from "./StyledElements/Graph.module.css";

class GraphFunctions extends React.Component {
    constructor (props) {
        super();
        this.state = {
            functions: [],
            functionClasses: []
        };
    }
    
    functionChange = (props) => { // onTextChanged
        const { name, value } = props.target;
        const funcs = this.state.functions.slice();
        funcs[name.split('.')[1]] = value.replace(/\s/g, '');
        this.setState(prevState => {
            return {
                functions : funcs
            }
        });
    }
    
    plotFunctions = () => {
        let canvas = document.getElementById("myCanvas"),
            ctx = canvas.getContext('2d'),
            math = mathjs(),
            expr,
            scope = { x: 0 },
            tree,
            n = 100,
            xMin = -10, xMax = 10,
            yMin = -10, yMax = 10,
            percentX, percentY, // percent from 0 to 1.
            mathX, mathY,
            classesArr = [];
        
        // First clear canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < this.state.functions.length; i++) {
            expr = this.state.functions[i];
            if (!expr) { classesArr.push(classes.functionBox); continue; }
            
            try {
                tree = math.parse(expr, scope);
                classesArr.push(classes.functionBox);
            } catch {
                classesArr.push(classes.invalidFunctionBox);
                continue;
            }
            
            ctx.beginPath();
            for (let i = 0; i < n; i++) {
                percentX = i / (n - 1);
                mathX = percentX * (xMax - xMin) + xMin;
                scope.x = mathX;
                mathY = tree.eval();
                percentY = 1 - ((mathY - yMin) / (yMax - yMin));
                
                ctx.lineTo(percentX * canvas.width, percentY * canvas.height);
            }
            ctx.stroke();
        }
        
        // Set Classes now.
        this.setState(() => {
            return {
                functionClasses: [...classesArr]
            };
        });
    }
    
    render() {
        return (<div>
            {/* Plans are to make this automatic for x number of inputs. */}
            <button onClick={this.plotFunctions}>Plot functions</button>
            {/* <button name="button.0" onClick={this.plotFunctions}>=</button> */}
            <GraphFunctionInput className={this.state.functionClasses[0] || classes.functionBox} name="function.0" 
                                value={this.state.functions[0]} onChange={this.functionChange} />
            <GraphFunctionInput className={this.state.functionClasses[1] || classes.functionBox} name="function.1" 
                                value={this.state.functions[1]} onChange={this.functionChange} />
            <GraphFunctionInput className={this.state.functionClasses[2] || classes.functionBox} name="function.2" 
                                value={this.state.functions[2]} onChange={this.functionChange} />
        </div>);
    }
}

export default GraphFunctions;