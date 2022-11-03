import React, { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";
import { Style } from "../common/Settings";
import SmartControl from "../SmartControls/SmartControl";
import { isEmpty } from "../Context/SmartFunctions";

const Accordion = ({ sections, width }) => {
    const { state, dispatch } = useContext(SmartContext);
    const getSectionTitle = (sectionId) => state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0]["title"];

    const handleEditClick = (sectionId) => {
        console.log("Editing section " + sectionId);
        dispatch({ type: "EDIT_SECTION_START", payload: sectionId });
    };

    return (
        <div className={`col-${isEmpty(width) ? 12 : width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <div className="accordion" id={`accordion-${sections.join("-")}`}>
                {sections.map((sectionId, index) => {
                    return (
                        <div
                            key={`accordion-item-${sectionId}`}
                            className="accordion-item m-3"
                            aria-labelledby={`v-pills-${sectionId}-tab`}
                        >
                            <h2 className="accordion-header " id={`heading-${sectionId}`}>
                                <div
                                    className={`accordion-button text-bg-info`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse-${sectionId}`}
                                    aria-expanded={index === 0 ? "true" : "false"}
                                    aria-controls={`collapse-${sectionId}`}
                                >
                                    <b className="col-11">{getSectionTitle(sectionId)}</b>
                                    <i className="bi bi-pencil" onClick={() => handleEditClick(sectionId)}></i>
                                </div>
                            </h2>
                            <div
                                id={`collapse-${sectionId}`}
                                className={`accordion-collapse collapse `}
                                aria-labelledby={`collapse-${sectionId}`}
                                data-bs-parent={`#accordion-${sections.join("-")}`}
                            >
                                <div className="accordion-body">
                                    <div className="d-flex flex-wrap">
                                        {<SmartControl key={`section-${sectionId}`} sectionId={sectionId} dataKey={sectionId} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Accordion;
