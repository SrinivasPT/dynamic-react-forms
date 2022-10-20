import React, { useContext, useState } from "react";
import { Style } from "../Common/Settings";
import { SmartContext } from "../Context/SmartContext";
import { getStateKeyValueForControl } from "../Context/SmartFunctions";

const SelectControl = ({ sectionId, control, dataKey }) => {
    const { state, dispatch } = useContext(SmartContext);
    const data = getStateKeyValueForControl(dataKey, state);

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

    const controlDomain = state["domain"].filter((domain) => {
        if (control.props.parent === null || control.props.parent === undefined || control.props.parent.length === 0)
            return domain.categoryCode === control.props.domainCategoryCode;
        else
            return (
                domain.categoryCode === control.props.domainCategoryCode &&
                state["data"][sectionId][control.props.parent] === domain.parentCode
            );
    });

    return (
        <div className={`col-${control.width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING} `}>
            <label htmlFor={control.id} className="form-label">
                {control.props.label}
            </label>
            <select
                id={control.id}
                className={`form-control form-control-lg ${readOnlyStyle}`}
                value={data}
                required={control.props.required}
                onChange={(event) => handleValueChange(control.id, event.target.value)}
                disabled={!state.mode.isEdit}
                onBlur={handleBlur}
                style={style(error)}
            >
                {controlDomain.map((domain) => (
                    <option
                        key={`${sectionId}-${control.id}-select-${domain.code}`}
                        value={domain.code}
                        defaultValue={state["data"][sectionId][control.id] === domain.code}
                        readOnly={state.mode.isEdit}
                    >
                        {domain.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectControl;
