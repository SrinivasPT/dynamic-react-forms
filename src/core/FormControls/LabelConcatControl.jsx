import React, { useContext, useState } from "react";
import { Style } from "../Common/Settings";
import { evaluateExpressionForLabelConcat, getStateKeyValueForControl } from "../Context/SmartFunctions";
import { SmartContext } from "../Context/SmartContext";

const LabelConcatControl = ({ control, dataKey }) => {
    const { state } = useContext(SmartContext);
    const fields = [];

    control.props.fields.forEach((element) => {
        const field = dataKey + "." + element;
        console.log(field);
        fields.push(getStateKeyValueForControl(field, state));
    });

    const templateString = "`" + control.props.templateString + "`";

    const data = evaluateExpressionForLabelConcat(templateString, fields);

    return (
        <div className={`col-lg-3 col-md-6 col-md-6  ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <label htmlFor={control.id} className="form-label">
                <span className="fs-6 fw-light">{control.props.label}</span>
            </label>
            <br />
            <label>
                <span className="fs-5">{data}</span>
            </label>
        </div>
    );
};

export default LabelConcatControl;
