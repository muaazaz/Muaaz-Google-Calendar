const Select = ({ type, value, onChange, label, disabled, className }) => {
    const timeArray = ['9:00', '9:30', '10:00', '10:30', '11:00',
        '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
        '3:00', '3:30', '4:00', '4:30', '5:00', '5:30', '6:00',
        '6:30', '7:00', '7:30', '8:00']
    var i = 8.5;
    return (
        <div className="pass">
            <label className="lbl">{label} Time:</label>
            <select
                className={className + " slct"}
                required
                disabled={disabled}
                value={value}
                onChange={onChange}
            >
                <option className={type} value="" defaultChecked hidden>Select {type}ing time : </option>
                {timeArray.map((item) => {
                    i = i + .5;
                    return (
                        <>
                            <option className={type} id={i} value={item}>{item} </option>
                        </>
                    )
                })
                }

            </select>
        </div>
    );
}

export default Select;