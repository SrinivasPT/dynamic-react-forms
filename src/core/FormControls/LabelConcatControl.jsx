import React, { useContext } from "react";
import { Style } from "../common/Settings";
import { evaluateExpressionForLabelConcat, getDomainValueForCode, getStateKeyValueForControl } from "../Context/SmartFunctions";
import { SmartContext } from "../Context/SmartContext";

const LabelConcatControl = ({ control, dataKey }) => {
    const { state } = useContext(SmartContext);
    const fields = [];

    control.props.fields.forEach((element) => {
        const field = dataKey + "." + element;
        const keyValue = getStateKeyValueForControl(field, state);
        const finalValue = element.endsWith("Code")
            ? getDomainValueForCode(keyValue, state.domain, element.replace("Code", "").toUpperCase())
            : keyValue;
        fields.push(finalValue);
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
