import React, { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";

const ErrorControl = ({ formControlRef, controlConfig }) => {
    const { state } = useContext(SmartContext);

    if (!state.flags.showControlErrors) return;

    const label = controlConfig.props.label;
    const errorMessages = [];

    const checkForRequiredField = () =>
        controlConfig.props?.required && errorMessages.length === 0 && !formControlRef.current.value
            ? errorMessages.push(`Please enter ${label}`)
            : null;

    const checkForMinAndMaxLength = () => {
        const violatingMinLength = controlConfig.props?.minLength && formControlRef.current.value.length < controlConfig.props?.minLength;
        const violatingMaxLength = controlConfig.props?.maxLength && formControlRef.current.value.length > controlConfig.props?.maxLength;

        if (violatingMinLength & !violatingMaxLength)
            errorMessages.push(`Please enter minimum ${controlConfig.props?.minLength} characters for ${label}`);
        if (!violatingMinLength & violatingMaxLength)
            errorMessages.push(`Please enter less than ${controlConfig.props?.maxLength} characters for ${label}`);
        if (violatingMinLength & violatingMaxLength)
            errorMessages.push(
                `Please enter between ${controlConfig.props?.minLength} - ${controlConfig.props?.maxLength} characters for ${label}`
            );
    };

    const checkForMinAndMaxValue = () => {};

    const validate = () => {
        checkForMinAndMaxLength();
        checkForMinAndMaxValue();
        checkForRequiredField();
        return errorMessages;
    };

    return state.flags.showControlErrors && validate().length > 0 ? (
        <div className="text-bg-danger">{errorMessages.concat()}</div>
    ) : undefined;
};

export default ErrorControl;
