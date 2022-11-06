import React, { useContext, useRef } from "react";
import { Style } from "../common/Settings";
import { getStateKeyValueForControl } from "../Context/SmartFunctions";
import { SmartContext } from "../Context/SmartContext";
import ErrorControl from "./ErrorControl";

const TextControl = ({ control, dataKey }) => {
    const { state, dispatch } = useContext(SmartContext);
    const data = getStateKeyValueForControl(dataKey, state);
    const formControlRef = useRef(null);

    const handleValueChange = (name, value) => dispatch({ type: "CONTROL_VALUE_CHANGE", payload: { dataKey, name, value } });

    const readOnlyStyle = state.isReadOnly ? "form-control-plaintext" : "";

    const handleBlur = (event) => {
        // if (event.target.validity.valid) {
        //     setError(false);
        //     return;
        // }
        // if (!error && !event.target.validity.valid) setError(true);
    };

    return (
        <div className={`has-validation col-${control.width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <label htmlFor={control.id} className="form-label">
                {`${control.props.label} ${control.props.required ? "*" : ""}`}
            </label>
            <input
                type={control.type}
                className={`form-control form-control-lg ${readOnlyStyle}`}
                id={control.id}
                placeholder={control.props.placeholder}
                inputMode={control.props.inputMode}
                value={data}
                required={control.props.required}
                onChange={(event) => handleValueChange(control.id, event.target.value)}
                onBlur={handleBlur}
                minLength={control.props.minLength}
                maxLength={control.props.maxLength}
                min={control.props.min}
                max={control.props.max}
                // disabled={!state.mode.isEdit}
                ref={formControlRef}
            />
            <ErrorControl formControlRef={formControlRef} controlConfig={control} />
        </div>
    );
};

export default TextControl;
