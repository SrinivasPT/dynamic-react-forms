import { useContext } from "react";

import CheckControl from "../FormControls/CheckControl";
import GridBoxControl from "../FormControls/GridBoxControl";
import RadioControl from "../FormControls/RadioControl";
import SelectControl from "../FormControls/SelectControl";
import SmartArrayControl from "./SmartArrayControl";
import { SmartContext } from "../Context/SmartContext";
import TextControl from "../FormControls/TextControl";
import { evaluateExpression } from "../Context/SmartFunctions";
import CardControl from "../FormControls/CardControl";
import { Style } from "../Common/Settings";

const SmartControl = ({ sectionId, dataKey }) => {
    const { state } = useContext(SmartContext);
    const sectionConfig = state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0];
    const controlGroup = sectionConfig["controlGroup"];
    //const width = control ? control.width : 12;

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
            case "SMART":
                return <SmartControl key={key} sectionId={control.id} dataKey={childDataKey} />;
            case "SMART_ARRAY":
                return <SmartArrayControl key={key} sectionId={control.id} dataKey={childDataKey} />;
            default:
                return new Error();
        }
    };

    return (
        <>
            <CardControl sectionId={sectionId} component={controlGroup.map((control) => getControl(control))} />
        </>
    );
};

export default SmartControl;
