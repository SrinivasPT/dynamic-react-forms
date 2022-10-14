import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import WaitingControl from "./SmartControls/WaitingControl";
import smartReducer from "./SmartReducer";
import SmartSubSectionComponent from "./SmartSubSectionComponent";
import { useImmerReducer } from "use-immer";

export const SmartComponentContext = createContext(null);

const SmartComponent = ({ name, id }) => {
    const URL_FOR_CONFIG = `http://localhost:3007/${name}-Config`;
    const URL_FOR_FORM_DATA = `http://localhost:3007/${name}-${id}`;
    const URL_FOR_DOMAIN_DATA = `http://localhost:3007/domain`;

    // TODO: Child to enhance the reducer for the custom functionality... but how to add the child reducer functionality to the smart reducer???
    const [state, dispatch] = useImmerReducer(smartReducer, {
        config: {},
        data: {},
        domain: [],
        flags: { isFormDataLoading: false, isDomainDataLoading: false, isConfigLoading: false },
        mode: { isReadOnly: false, isEdit: false, sectionInEditMode: "" },
        isError: false,
    });

    const handleFetchComponentDetails = () => {
        dispatch({ type: "CONFIG_FETCH_INIT" });
        dispatch({ type: "FORM_DATA_FETCH_INIT" });
        dispatch({ type: "DOMAIN_DATA_FETCH_INIT" });

        Promise.all([
            axios
                .get(URL_FOR_CONFIG)
                .then((result) => dispatch({ type: "CONFIG_FETCH_SUCCESS", payload: result.data }))
                .catch(() => dispatch({ type: "CONFIG_FETCH_ERROR" })),
            axios
                .get(URL_FOR_FORM_DATA)
                .then((result) => dispatch({ type: "FORM_DATA_FETCH_SUCCESS", payload: result.data }))
                .catch(() => dispatch({ type: "FORM_DATA_FETCH_ERROR" })),
            axios
                .get(URL_FOR_DOMAIN_DATA)
                .then((result) => dispatch({ type: "DOMAIN_DATA_FETCH_SUCCESS", payload: result.data }))
                .catch(() => dispatch({ type: "DOMAIN_DATA_FETCH_ERROR" })),
        ]);
    };

    const handleEditSection = (sectionId) => dispatch({ type: "EDIT_SECTION_START", payload: sectionId });

    const sections = state.mode.isEdit ? [state.mode.sectionInEditMode] : state.config.sections;

    const handleSectionSave = () => dispatch({ type: "EDIT_SECTION_SAVE" });

    const handleSectionCancel = () => dispatch({ type: "EDIT_SECTION_CANCEL" });

    useEffect(() => {
        handleFetchComponentDetails();
    }, []);

    return (
        <SmartComponentContext.Provider value={{ state, dispatch }}>
            <form className="m-3">
                {state?.flags?.isFormDataLoading || state?.flags?.isConfigLoading ? (
                    <WaitingControl />
                ) : (
                    sections?.map((sectionId) => {
                        const sectionConfig = state["config"]["sectionConfig"]?.filter(
                            (section) => section.id === sectionId
                        )[0];
                        return (
                            <div key={`section-card-${sectionId}`} className="card mb-3">
                                <div key={`section-card-header${sectionId}`} className="card-header">
                                    <div className="d-flex justify-content-between">
                                        {sectionConfig.title}
                                        <i className="bi bi-pencil" onClick={() => handleEditSection(sectionId)}></i>
                                    </div>
                                </div>
                                <div key={`section-card-body${sectionId}`} className="card-body">
                                    {/* This is the main component. */}
                                    <SmartSubSectionComponent key={`section-${sectionId}`} sectionId={sectionId} />
                                    {state.mode.isEdit && (
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-primary mx-2 col-2" onClick={handleSectionSave}>
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary mx-2 col-2"
                                                onClick={handleSectionCancel}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </form>
        </SmartComponentContext.Provider>
    );
};

export default SmartComponent;
