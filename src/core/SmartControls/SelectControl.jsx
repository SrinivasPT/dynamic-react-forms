import React, { useContext } from "react";
import { Style } from "../common/Settings";
import { SmartComponentContext } from "../SmartComponent";

const SelectControl = ({ sectionId, control }) => {
    const { state, dispatch } = useContext(SmartComponentContext);
    const controlDomain = state["domain"].filter((domain) => domain.categoryCode === control.props.domainCategoryCode);

    const handleValueChange = (name, value) =>
        dispatch({ type: "CONTROL_VALUE_CHANGE", payload: { sectionId, name, value } });

    return (
        <div className={`col-${control.width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING} `}>
            <label htmlFor={control.id} className="form-label">
                {control.props.label}
            </label>
            <select
                id={control.id}
                className="form-select form-select-lg"
                value={state["data"][sectionId][control.id]}
                onChange={(event) => handleValueChange(control.id, event.target.value)}
            >
                {controlDomain.map((domain) => (
                    <option
                        key={`${sectionId}-${control.id}-select-${domain.code}`}
                        value={domain.code}
                        defaultValue={state["data"][sectionId][control.id] === domain.code}
                    >
                        {domain.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectControl;
