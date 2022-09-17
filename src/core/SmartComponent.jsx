import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import WaitingControl from "./SmartControls/WaitingControl";
import smartReducer from "./SmartReducer";
import SmartSubSectionComponent from "./SmartSubSectionComponent";

export const SmartComponentContext = createContext(null);

const SmartComponent = ({ name, id, reducer }) => {
    const URL_FOR_CONFIG = `http://localhost:3007/${name}-Config`;
    const URL_FOR_FORM_DATA = `http://localhost:3007/${name}-${id}`;
    const URL_FOR_DOMAIN_DATA = `http://localhost:3007/domain`;

    // TODO: Child to enhance the reducer for the custom functionality... but how to add the child reducer functionality to the smart reducer???
    const [state, dispatch] = useReducer(smartReducer, {
        config: {},
        data: {},
        domain: [],
        isFormDataLoading: false,
        isDomainDataLoading: false,
        isConfigLoading: false,
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

    useEffect(() => {
        handleFetchComponentDetails();
    }, []);

    return (
        <SmartComponentContext.Provider value={{ state, dispatch }}>
            <form className="m-3">
                {state?.isFormDataLoading || state?.isConfigLoading ? (
                    <WaitingControl />
                ) : (
                    state["config"]["sections"]?.map((sectionId) => {
                        const sectionConfig = state["config"]["sectionConfig"]?.filter(
                            (section) => (section.id = sectionId)
                        )[0];
                        return (
                            <div key={`section-card-${sectionId}`} className="card">
                                <div key={`section-card-header${sectionId}`} className="card-header">
                                    {sectionConfig.title}
                                </div>
                                <div key={`section-card-body${sectionId}`} className="card-body">
                                    {/* This is the main component. */}
                                    <SmartSubSectionComponent
                                        key={`section-${sectionId}`}
                                        sectionConfig={sectionConfig}
                                    />
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
