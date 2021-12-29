import superscript from "./Helpers/SuperScript";

function Button(props) {
    const sup = {
        a:'ᵃ', b:'ᵇ', c:'ᶜ', d:'ᵈ', e:'ᵉ', f:'ᶠ', g:'ᵍ', h:'ʰ', i:'ⁱ', j:'ʲ', k:'ᵏ', l:'ˡ', m:'ᵐ', n:'ⁿ', o: 'ᵒ', p:'ᵖ', q:'q', r:'ʳ', s:'ˢ', t:'ᵗ', u:'ᵘ', v:'ᵛ', w:'ʷ', x:'ˣ', y:'ʸ', z:'ᶻ',
        A:'ᵃ', B:'ᵇ', C:'ᶜ', D:'ᵈ', E:'ᵉ', F:'ᶠ', G:'ᵍ', H:'ʰ', I:'ⁱ', J:'ʲ', K:'ᵏ', L:'ˡ', M:'ᵐ', N:'ⁿ', O: 'ᵒ', P:'ᵖ', Q:'Q', R:'ʳ', S:'ˢ', T:'ᵗ', U:'ᵘ', V:'ᵛ', W:'ʷ', X:'ˣ', Y:'ʸ', Z:'ᶻ',
        
    }
    if (props.modifiers) {
        switch (true) {
            case props.modifiers.pow:
                return <button name={props.name} onClick={props.onClick}>{props.name[0]}{superscript(props.name.substring(1, props.name.length))}</button>;
        }
    }
    return <button name={props.name} onClick={props.onClick}>{props.name}</button>
}

export default Button;