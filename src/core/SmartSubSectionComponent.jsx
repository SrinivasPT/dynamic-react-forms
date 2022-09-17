import SmartTextControl from "./SmartControls/TextControl";

const SmartSubSectionComponent = ({ sectionConfig }) => {
    const controlGroup = sectionConfig["controlGroup"];

    const getControl = (control) => {
        const key = `section-${sectionConfig.id}-${control.id}`;
        switch (control.type) {
            case "TEXT":
                return <SmartTextControl key={key} sectionId={sectionConfig.id} control={control} />;
            case "DATE":
                return <SmartTextControl key={key} />;
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

export default SmartSubSectionComponent;
