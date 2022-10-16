import axios from "axios";
import React, { useContext, useEffect } from "react";
import WaitingControl from "../FormControls/WaitingControl";
import SmartControl from "./SmartControl";
import { SmartContext } from "../Context/SmartContext";

const SmartPageControl = ({ name, id }, ref) => {
    const { state, dispatch } = useContext(SmartContext);
    const URL_FOR_CONFIG = `http://localhost:3007/${name}-Config`;
    const URL_FOR_FORM_DATA = `http://localhost:3007/${name}-${id}`;
    const URL_FOR_DOMAIN_DATA = `http://localhost:3007/domain`;

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

    const sections = state.mode.isEdit ? [state.mode.sectionInEditMode] : state.config.sections;

    useEffect(() => {
        handleFetchComponentDetails();
    }, []);

    return (
        <form className="m-3">
            {state?.flags?.isFormDataLoading || state?.flags?.isConfigLoading ? (
                <WaitingControl />
            ) : (
                sections?.map((sectionId) => {
                    return <SmartControl key={`section-${sectionId}`} sectionId={sectionId} dataKey={sectionId} />;
                })
            )}
        </form>
    );
};

export default SmartPageControl;
