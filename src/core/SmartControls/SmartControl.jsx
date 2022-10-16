import { useContext } from "react";

import CheckControl from "../FormControls/CheckControl";
import GridBoxControl from "../FormControls/GridBoxControl";
import RadioControl from "../FormControls/RadioControl";
import SelectControl from "../FormControls/SelectControl";
import SmartArrayControl from "./SmartArrayControl";
import { SmartContext } from "../Context/SmartContext";
import TextControl from "../FormControls/TextControl";
import { evaluateExpression } from "../Context/SmartFunctions";

const SmartControl = ({ sectionId, dataKey }) => {
    const { state } = useContext(SmartContext);
    const sectionConfig = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0];
    const controlGroup = sectionConfig["controlGroup"];

    const getControl = (control) => {
        const key = `section-${sectionConfig.id}-${control.id}`;
        const childDataKey = dataKey + "." + control.id;

        if (control?.props?.hideExpression !== undefined) {
            const isHidden = evaluateExpression(control.props.hideExpression, state);
            if (isHidden) return;
        }

        switch (control.type) {
            case "TEXT":
                return <TextControl key={key} control={control} dataKey={childDataKey} />;
            case "RADIO":
                return <RadioControl key={key} sectionId={sectionConfig.id} control={control} dataKey={childDataKey} />;
            case "CHECK":
                return <CheckControl key={key} sectionId={sectionConfig.id} control={control} dataKey={childDataKey} />;
            case "SELECT":
                return <SelectControl key={key} sectionId={sectionConfig.id} control={control} dataKey={childDataKey} />;
            case "GRID_BOX":
                return <GridBoxControl key={key} sectionId={control.id} control={control} dataKey={childDataKey} />;
            case "CUSTOM":
                return <SmartControl key={key} sectionId={control.id} dataKey={childDataKey} />;
            case "CUSTOM_ARRAY":
                return <SmartArrayControl key={key} sectionId={control.id} dataKey={childDataKey} />;
            default:
                return new Error();
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex flex-wrap">{controlGroup.map((control) => getControl(control))}</div>
        </div>
    );
};

export default SmartControl;
