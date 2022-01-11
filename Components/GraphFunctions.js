import React from "react";

import GraphFunctionInput from "../Components/GraphFunctionInput";
import classes from "./StyledElements/Graph.module.css";

class GraphFunctions extends React.Component {
    constructor (props) {
        super();
        this.state = {
            functions: [],
            functionClasses: [],
            bounds: {
                minusX: -10,
                plusX: 10,
                minusY: -10,
                plusY: 10,
            },
            error: false
        };
        // We don't want to use this.state as this.setState takes time to propagate changes and that causes problems with rapidly updating values.
        this.time = 0;
        this.timeIncrement = 0.1;
        this.color = 1000000; // Starting point to start showing colors as soon as user uses the c variable.
        this.colorIncrement = 1000;
    }
    
    componentDidMount() {
        this.plot();
    }
    
    functionChange = (props) => { // onTextChanged
        const { name, value } = props.target;
        const funcs = this.state.functions.slice();
        // funcs[name.split('.')[1]] = value.replace(/\s/g, '');
        funcs[name.split('.')[1]] = value;
        this.setState(() => {
            return {
                functions : funcs
            }
        });
    }
    
    updateBounds = (props) => {
        const { name, value } = props.target;
        this.setState({
            bounds: {
                ...this.state.bounds,
                [name]: value
            }
        })
    }
    
    plot = () => {
        const startAnimation = () => {
            (function animloop() {
                requestAnimationFrame(animloop);
                render();
            })();
        }
        
        const render = () => {
            this.time += this.timeIncrement;
            this.color += this.colorIncrement;
            if (this.color > 15777000) this.color = 1000000; // Ensures constant color change (no long black time spans).
            this.plotFunctions(); // Doing it this way also has the benefit of "live" validation of user input.
        }
        
        startAnimation();
    }
    
    plotFunctions = () => {
        if (this.error) return;
        let canvas = document.getElementById("myCanvas"),
            ctx = canvas.getContext('2d'),
            math = mathjs(),
            expr,
            scope = { x: 0, y: 0, t: 0, c: 0 },
            tree,
            n = 100, // "smoothness" of graph, or how many points to plot per function. 100 is plenty for most cases.
            xMin = +this.state.bounds.minusX, xMax = +this.state.bounds.plusX,
            yMin = +this.state.bounds.minusY, yMax = +this.state.bounds.plusY,
            percentX, percentY, // percent from 0 to 1.
            mathX, mathY,
            time = 0,
            timeIncrement = 0.1,
            classesArr = [];
        
        // First clear canvas.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines.
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = "gray";
        ctx.stroke();
        let xInc = (xMax-xMin) / 20, yInc = (yMax-yMin) / 20, canvasInc = canvas.width / 20;
        for (let i = 0; i <= 20; i++) { // xMin + i*ii
            let _xX = (canvas.width/20)*i, _xY = canvas.height/2 + 8,
                _yX = canvas.width/2 + 2, _yY = (canvas.height/20)*i;
            ctx.fillStyle = "gray";
            ctx.font = "7px sans-serif";
            if (i != 10 && !(i % 2)) ctx.fillRect(_xX, _xY-12, 1, 3); // Draw x-axis markers.
            if (i != 10 && !(i % 2)) ctx.fillRect(_yX-6, _yY, 3, 1); // Draw y-axis markers. If -i check to prevent clutter around 0.
            if (i != 10 && !(i % 2)) ctx.fillText(+(xMin + (i*xInc)).toFixed(1), _xX - canvasInc/3, _xY); // Draw x-axis numbers.
            if (i != 10 && !(i % 2)) ctx.fillText(+(yMax - (i*yInc)).toFixed(1), _yX, _yY+4); // Draw y-axis numbers.
        }
        ctx.strokeStyle = "black";
        for (let i = 0; i < this.state.functions.length; i++) {
            expr = (this.state.functions[i] || '').toLowerCase();
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
                scope.t = this.time;
                scope.c = this.color;
                // check if 'c' was passed in. Otherwise, use black color.
                ctx.strokeStyle = tree.find().find(p => p.name === 'c') ? '#'+scope.c.toString(16) : 'black';
                scope.y = mathY = tree.eval();
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
            <span style={{margin:'18px'}}>Type functions here:</span>
            {/* Plans are to make this automatic for x number of function inputs. */}
            <GraphFunctionInput className={this.state.functionClasses[0] || classes.functionBox} name="function.0" 
                                value={this.state.functions[0]} onChange={this.functionChange} />
            <GraphFunctionInput className={this.state.functionClasses[1] || classes.functionBox} name="function.1" 
                                value={this.state.functions[1]} onChange={this.functionChange} />
            <GraphFunctionInput className={this.state.functionClasses[2] || classes.functionBox} name="function.2" 
                                value={this.state.functions[2]} onChange={this.functionChange} />
            <div style={{
                    fontSize: "10px"
            }}>
                <label>
                    -x
                    <input type="text" name="minusX" className={classes.BoundsBox} value={this.state.bounds.minusX}  onChange={this.updateBounds} />
                </label>
                <label>
                    +x
                    <input type="text" name="plusX" className={classes.BoundsBox} value={this.state.bounds.plusX}  onChange={this.updateBounds} />
                </label>
                <label>
                    -y
                    <input type="text" name="minusY" className={classes.BoundsBox} value={this.state.bounds.minusY}  onChange={this.updateBounds} />
                </label>
                <label>
                    +y
                    <input type="text" name="plusY" className={classes.BoundsBox} value={this.state.bounds.plusY}  onChange={this.updateBounds} />
                </label>
            </div>
        </div>);
    }
}

export default GraphFunctions;