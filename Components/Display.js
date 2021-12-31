import classes from "./StyledElements/Display.module.css";

function Display(props) {
    // const obj = (props.modes.exponent || (''+props.name).length > 21) ? {
    const obj = (props.modes.exponent || (''+props.name).length >= 20) ? {
        notation: 'scientific'
    } : {
        maximumSignificantDigits: 16
    };
    return <div className={classes.Display} name={props.name}>
        {Number(props.name).toLocaleString('en-US', obj)}
    </div>
}

export default Display;