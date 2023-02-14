import { useEffect } from "react";
import {timeArray} from "../../Constants/constants"
const Select = ({ type, value, onChange, label, disabled, className, timeCheckArray}) => {
    let i = 8.5;
    // useEffect(()=>{},[timeCheckArray])
    console.log(timeCheckArray)
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
                            {timeCheckArray ?
                            !timeCheckArray.includes(i) && <option className={type} id={i} value={i}>{item} </option>
                            :
                            <option className={type} id={i} value={i}>{item} </option>
                            }
                        </>
                    )
                })
                }

            </select>
        </div>
    );
}

export default Select;