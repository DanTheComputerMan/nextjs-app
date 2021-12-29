import classes from "./StyledElements/Display.module.css";

function Display(props) {
    return <div className={classes.Display} name={props.name}>
        {props.name}
    </div>
}

export default Display;