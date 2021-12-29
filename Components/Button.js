import superscript from "./Helpers/SuperScript";

import classes from "./StyledElements/4Functions.module.css";

function Button(props) {
    if (props.modifiers) {
        switch (true) {
            case props.modifiers.pow:
                return <button className={classes.FourFunctions} name={props.name} onClick={props.onClick}>
                    {props.name[0]}{superscript(props.name.substring(1, props.name.length))}
                </button>;
        }
    }
    return <button className={classes.FourFunctions} name={props.name} onClick={props.onClick}>{props.name}</button>;
}

export default Button;