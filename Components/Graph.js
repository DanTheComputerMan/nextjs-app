import React from "react";

import GraphFunctions from "../Components/GraphFunctions";
import classes from "./StyledElements/Graph.module.css";

class Graph extends React.Component {
    constructor () {
        super();
        this.state = { };
    }
    
    render() {
        return (<div>
            <GraphFunctions />
            <canvas className={classes.graph} id="myCanvas">
            
            </canvas>
        </div>);
    }
}

export default Graph;