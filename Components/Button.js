import superscript from "./Helpers/SuperScript";

import classes from "./StyledElements/FunctionKeys.module.css";

function Button(props) {
    const selectedClass = [ '÷', 'x', '-', '+' ].includes(props.name) && classes.FourFunctions || classes.FunctionKeys;
    if (props.modifiers) {
        switch (true) {
            case props.modifiers.pow:
                return <button className={selectedClass} name={props.name} onClick={props.onClick}>
                    {props.name.substring(0, props.modifiers.index || 1)}{superscript(props.name.substring(props.modifiers.index || 1, props.name.length))}
                </button>;
        }
    }
    return <button className={selectedClass} name={props.name} onClick={props.onClick}>{props.name}</button>;
}

export default Button;