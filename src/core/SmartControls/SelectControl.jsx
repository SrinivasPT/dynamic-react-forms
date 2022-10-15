import React, { useContext } from "react";
import { Style } from "../common/Settings";
import { SmartContext } from "./SmartPageControl";

const SelectControl = ({ sectionId, control }) => {
    const { state, dispatch } = useContext(SmartContext);
    const controlDomain = state["domain"].filter((domain) => {
        if (control.props.parent === null || control.props.parent === undefined || control.props.parent.length === 0)
            return domain.categoryCode === control.props.domainCategoryCode;
        else
            return (
                domain.categoryCode === control.props.domainCategoryCode &&
                state["data"][sectionId][control.props.parent] === domain.parentCode
            );
    });

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
                disabled={!state.mode.isEdit}
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
