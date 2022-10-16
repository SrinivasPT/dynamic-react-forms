import React, { useContext } from "react";
import { Style } from "../common/Settings";
import { getStateKeyValueForControl } from "./SmartFunctions";
import { SmartContext } from "./SmartContext";

const TextControl = ({ sectionId, index, control }) => {
    const { state, dispatch } = useContext(SmartContext);
    const { key, data } = getStateKeyValueForControl(sectionId, index, state, control);

    const handleValueChange = (name, value) =>
        dispatch({ type: "CONTROL_VALUE_CHANGE", payload: { key, name, value } });

    const readOnlyStyle = state.isReadOnly ? "form-control-plaintext" : "";

    return (
        <div className={`col-${control.width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <label htmlFor={control.id} className="form-label">
                {control.props.label}
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
                minLength={control.props.minLength}
                maxLength={control.props.maxLength}
                min={control.props.min}
                max={control.props.max}
                disabled={!state.mode.isEdit}
            />
        </div>
    );
};

export default TextControl;
