function TextAreaInput({name, value, onChange}: {name : string, value: string, onChange: (value : string) => void}) {
    return(
        <textarea className="border rounded p-2 w-full" rows={4} value={value} name={name}
                  onChange={e => onChange(e.target.value)} />
    )
}
export default TextAreaInput;