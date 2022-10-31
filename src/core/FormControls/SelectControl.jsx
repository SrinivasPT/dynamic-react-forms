import React, { useContext, useState, useRef } from "react";
import { Style } from "../common/Settings";
import { SmartContext } from "../Context/SmartContext";
import { getStateKeyValueForControl } from "../Context/SmartFunctions";
import ErrorControl from "./ErrorControl";

const SelectControl = ({ sectionId, control, dataKey, parentDataKey }) => {
    const { state, dispatch } = useContext(SmartContext);
    const data = getStateKeyValueForControl(dataKey, state);
    const parentData = getStateKeyValueForControl(parentDataKey + "." + control.props.parentId, state);
    const formControlRef = useRef(null);

    const [error, setError] = useState(false);
    const style = (error) => (error ? { backgroundColor: Style.FORM_CONTROL_REQUIRED_FIELD_BACKGROUND_COLOR } : {});

    const handleValueChange = (name, value) => dispatch({ type: "CONTROL_VALUE_CHANGE", payload: { dataKey, name, value } });

    const readOnlyStyle = state.isReadOnly ? "form-control-plaintext" : "";

    const handleBlur = (event) => {
        if (event.target.validity.valid) {
            setError(false);
            return;
        }
        if (!error && !event.target.validity.valid) setError(true);
    };

    const controlDomain = state["domain"].get(control.props.domainCategoryCode).filter((domain) => {
        if (control.props.parentId === null || control.props.parentId === undefined || control.props.parentId.length === 0) return true;
        else return domain.parentCode === parentData;
    });

    return (
        <div className={`col-${control.width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING} `}>
            <label htmlFor={control.id} className="form-label">
                {control.props.label}
            </label>
            <select
                id={control.id}
                className={`form-select form-select-lg ${readOnlyStyle}`}
                value={data}
                required={control.props.required}
                onChange={(event) => handleValueChange(control.id, event.target.value)}
                disabled={!state.mode.isEdit}
                onBlur={handleBlur}
                style={style(error)}
                ref={formControlRef}
            >
                {!controlDomain.some((domain) => domain.code === "") && <option value={""}>{"--Select--"}</option>}
                {controlDomain.map((domain) => (
                    <option
                        key={`${sectionId}-${control.id}-select-${domain.code}`}
                        value={domain.code}
                        defaultValue={data === domain.code}
                        readOnly={state.mode.isEdit}
                    >
                        {domain.value}
                    </option>
                ))}
            </select>
            <ErrorControl formControlRef={formControlRef} controlConfig={control} />
        </div>
    );
};

export default SelectControl;
