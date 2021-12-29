function subscript(_str) {
    const sub = {
        0:'₀', 1:'₁', 2:'₂', 3:'₃', 4:'₄', 5:'₅', 6:'₆', 7:'₇', 8:'₈', 9:'₉',
        a:'ₐ',                      e:'ₑ',               h:'ₕ', i:'ᵢ',        k:'ₖ',  l:'ₗ', m:'ₘ', n:'ₙ',  o:'ₒ', p:'ₚ',        r:'ᵣ',  s:'ₛ', t:'ₜ',  u:'ᵤ', v:'ᵥ',        x:'ₓ'              ,
        // no subscript capital letters exist.
               β:'ᵦ', γ:'ᵧ',                             θ:'ᶿ', ι:'ᶥ',                                                  ρ:'ᵨ',                                    ψ:'ᵩ', χ:'ᵪ'       ,
        // Α α, Β β, Γ γ, Δ δ, Ε ε, Ζ ζ, Η η, Θ θ, Ι ι, Κ κ, Λ λ, Μ μ, Ν ν, Ξ ξ, Ο ο, Π π, Ρ ρ, Σ σ/ς, Τ τ, Υ υ, Φ φ, Χ χ, Ψ ψ, and Ω ω.
    }
    let str = '';
    for (let i = 0; i < _str.length; i++) {
        str += sub[_str[i]] || _str[i];
    }
    return str;
}

export default subscript;