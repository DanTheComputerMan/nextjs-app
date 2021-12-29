import classes from "./StyledElements/NumberKey.module.css";

function NumberButton(props) {
    return <button className={classes.NumberKey} name={props.name} onClick={props.onClick}>{props.name}</button>;
}

export default NumberButton;