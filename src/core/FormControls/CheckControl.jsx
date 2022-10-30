import React, { useContext, useRef } from "react";
import { Style } from "../common/Settings";
import { SmartContext } from "../Context/SmartContext";
import ErrorControl from "./ErrorControl";

const CheckControl = ({ sectionId, control }) => {
    console.log("In the check control!");
    const { state, dispatch } = useContext(SmartContext);
    const formControlRef = useRef(null);

    const handleValueChange = (name, value) => {
        dispatch({ type: "CONTROL_VALUE_CHANGE", payload: { sectionId, name, value } });
    };

    return (
        <fieldset className={`col-${control.width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <div className="form-check">
                <input
                    id={control.id}
                    key={`${sectionId}-${control.id}-check`}
                    className={`form-check-input`}
                    type="checkbox"
                    name={control.id}
                    checked={state["data"][sectionId][control.id]}
                    onChange={(event) => handleValueChange(control.id, event.target.checked)}
                    disabled={!state.mode.isEdit}
                    ref={formControlRef}
                />
                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                    {control.props.label}
                </label>
            </div>
            <ErrorControl formControlRef={formControlRef} controlConfig={control} />
        </fieldset>
    );
};

export default React.memo(CheckControl);
