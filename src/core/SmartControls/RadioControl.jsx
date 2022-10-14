import React, { useContext } from "react";
import { Style } from "../common/Settings";
import { SmartComponentContext } from "../SmartComponent";

const RadioControl = ({ sectionId, control }) => {
    const { state, dispatch } = useContext(SmartComponentContext);
    const controlDomain = state["domain"].filter((domain) => domain.categoryCode === control.props.domainCategoryCode);

    const handleValueChange = (name, value) =>
        dispatch({ type: "CONTROL_VALUE_CHANGE", payload: { sectionId, name, value } });

    return (
        <fieldset className={`col-${control.width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <legend className="col-form-label col-sm-2 pt-0">{control.props.label}</legend>
            <div className="d-flex flex-wrap form-check">
                {controlDomain.map((domain) => (
                    <div className="col-4" key={`${sectionId}-${control.id}-radio-top-${domain.code}`}>
                        <input
                            key={`${sectionId}-${control.id}-radio-${domain.code}`}
                            className={`form-check-input`}
                            type="radio"
                            name={control.id}
                            id={domain.code}
                            value={state["data"][sectionId][control.id]}
                            checked={state["data"][sectionId][control.id] === domain.code}
                            onChange={(event) => handleValueChange(control.id, event.target.value)}
                            disabled={!state.mode.isEdit}
                        />
                        <label
                            key={`${sectionId}-${control.id}-radio-label-${domain.code}`}
                            className="form-check-label"
                            htmlFor={domain.code}
                        >
                            {domain.value}
                        </label>
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default RadioControl;
