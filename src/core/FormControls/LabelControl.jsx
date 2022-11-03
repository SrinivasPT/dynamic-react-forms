import React, { useContext, useRef } from "react";
import { SmartContext } from "../Context/SmartContext";
import { Style } from "../common/Settings";
import { getDomainValueForCode, isEmpty } from "../Context/SmartFunctions";

const LabelControl = ({ controlId, label, data, css, width, categoryCode }) => {
    const { state } = useContext(SmartContext);
    const controlCss = css ? css : `col-${width}  ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`;

    return (
        <div className={controlCss}>
            <label htmlFor={controlId} className="form-label">
                <span className="fs-6 fw-light">{label}</span>
            </label>
            <br />
            <label>
                <span className="fs-5">
                    {controlId.endsWith("Code") || !isEmpty(categoryCode) ? getDomainValueForCode(data, state.domain, categoryCode) : data}
                </span>
            </label>
        </div>
    );
};

export default LabelControl;
