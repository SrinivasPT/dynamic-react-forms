import React from "react";
import { Style } from "../common/Settings";

const LabelControl = ({ controlId, label, data, css }) => {
    const controlCss = css ? css : `col-lg-3 col-md-6 col-md-6  ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`;
    return (
        <div className={controlCss}>
            <label htmlFor={controlId} className="form-label">
                <span className="fs-6 fw-light">{label}</span>
            </label>
            <br />
            <label>
                <span className="fs-5">{data}</span>
            </label>
        </div>
    );
};

export default LabelControl;
