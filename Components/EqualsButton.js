import classes from "./StyledElements/EqualsKey.module.css";

function EqualsButton(props) {
    return <button className={classes.EqualsKey} name={props.name} onClick={props.onClick}>{props.name}</button>;
}

export default EqualsButton;