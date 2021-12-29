function Display(props) {
    return <div name={props.name} style={{
        textAlign: 'center'
    }}>{props.name}</div>
}

export default Display;