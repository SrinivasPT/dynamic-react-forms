import React, { useContext } from "react";
import { Style } from "../common/Settings";
import { SmartComponentContext } from "../SmartComponent";

const TextControl = ({ sectionId, control }) => {
    const { state, dispatch } = useContext(SmartComponentContext);

    const parent = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0]["parent"];

    const dataKey = parent ? parent + "." + sectionId + "." + control.id : sectionId + "." + control.id;

    const value = dataKey.split(".").reduce((a, c) => a[c], state.data);

    const handleValueChange = (name, value) =>
        dispatch({ type: "CONTROL_VALUE_CHANGE", payload: { dataKey, name, value } });

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
                value={value}
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
