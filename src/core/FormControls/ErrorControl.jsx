import React, { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";

const ErrorControl = ({ formControl, control }) => {
    const { state } = useContext(SmartContext);

    if (!state.flags.showControlErrors) return;

    const label = control.props.label;
    const errorMessages = [];

    const checkForRequiredField = () =>
        control.props?.required && !formControl.current.value ? errorMessages.push(`Please enter ${label}`) : null;

    const checkForMinAndMaxLength = () => {
        const violatingMinLength = control.props?.minLength && formControl.current.value.length < control.props?.minLength;
        const violatingMaxLength = control.props?.maxLength && formControl.current.value.length > control.props?.maxLength;

        if (violatingMinLength & !violatingMaxLength)
            errorMessages.push(`Please enter minimum ${control.props?.minLength} characters for ${label}`);
        if (!violatingMinLength & violatingMaxLength)
            errorMessages.push(`Please enter less than ${control.props?.maxLength} characters for ${label}`);
        if (violatingMinLength & violatingMaxLength)
            errorMessages.push(`Please enter between ${control.props?.minLength} - ${control.props?.maxLength} characters for ${label}`);
    };

    const checkForMinAndMaxValue = () => {};

    const validate = () => {
        checkForRequiredField();
        checkForMinAndMaxLength();
        checkForMinAndMaxValue();
        return errorMessages;
    };

    return state.flags.showControlErrors && validate().length > 0 ? (
        <div className="text-bg-danger">{errorMessages.concat()}</div>
    ) : undefined;
};

export default ErrorControl;
