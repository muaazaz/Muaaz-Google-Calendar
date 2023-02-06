const Input = ({label, value, readOnly, onChange, placeholder, maxLength, type}) => {
    return ( 
        <div className="em">
            <label className="lbl">{label} : </label>
            <input  
              type={type}
              className="inp"
              name={label}
              autoComplete="on"
              maxLength={maxLength}
              value={value}
              required
              readOnly={readOnly}
              placeholder={placeholder}
              onChange={onChange}
            />
        </div>
     );
}
 Input.defaultProps ={
  type: "text",
  readOnly: false
 }
export default Input;