export default function GraphFunctionInput(props) {
    return (<input 
                type="text" 
                name={props.name} 
                className={props.className} 
                placeholder="f(x)" 
                value={props.value} 
                onChange={props.onChange}
            />);
}