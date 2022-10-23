import React, { useContext } from "react";
import { SmartContext } from "../Context/SmartContext";
import { Style } from "../Common/Settings";
import SmartControl from "../SmartControls/SmartControl";

const Accordion = ({ sections, width }) => {
    const { state, dispatch } = useContext(SmartContext);
    const getSectionTitle = (sectionId) => state["config"]["sectionConfig"]?.filter((section) => section.id === sectionId)[0]["title"];

    const handleEditClick = (sectionId) => {
        console.log("Editing section " + sectionId);
        dispatch({ type: "EDIT_SECTION_START", payload: sectionId + "_edit" });
    };

    return (
        <div className={`col-${width} ${Style.FORM_CONTROL_MARGIN_AND_PADDING}`}>
            <div className="accordion" id="accordionFlushExample">
                {sections.map((sectionId, index) => {
                    return (
                        <div key={`accordion-item-${sectionId}`} className="accordion-item m-2">
                            <h2 className="accordion-header" id={`heading-${sectionId}`}>
                                <div
                                    className={`accordion-button ${index ? "collapsed" : ""}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#panelsStayOpen-collapse-${sectionId}`}
                                    aria-expanded={index ? "false" : "true"}
                                    aria-controls={`panelsStayOpen-collapse-${sectionId}`}
                                >
                                    <b className="col-11">{getSectionTitle(sectionId)}</b>
                                    <i className="bi bi-pencil" onClick={() => handleEditClick(sectionId)}></i>
                                </div>
                            </h2>
                            <div
                                id={`panelsStayOpen-collapse-${sectionId}`}
                                className={`accordion-collapse collapse ${index ? "" : "show"}`}
                                aria-labelledby={`flush-collapse-${sectionId}`}
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
