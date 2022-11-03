import axios from "axios";
import React, { useContext, useEffect } from "react";
import WaitingControl from "../FormControls/WaitingControl";
import SmartControl from "./SmartControl";
import { SmartContext } from "../Context/SmartContext";
import Accordion from "../FormControls/Accordion";
import CardControl from "../FormControls/CardControl";
import { convertDomainArrayToMap, isEmpty } from "../Context/SmartFunctions";

const SmartPageControl = ({ name, id }, ref) => {
    const { state, dispatch } = useContext(SmartContext);
    const URL_FOR_CONFIG = `http://localhost:3007/${name}-Config`;
    const URL_FOR_FORM_DATA = `http://localhost:3007/${name}-${id}`;
    const URL_FOR_DOMAIN_DATA = `http://localhost:3007/domain`;

    const handleFetchComponentDetails = () => {
        dispatch({ type: "CONFIG_FETCH_INIT" });
        dispatch({ type: "FORM_DATA_FETCH_INIT" });
        dispatch({ type: "DOMAIN_DATA_FETCH_INIT" });
        const payload = {};

        // TODO: Dispatch all the data at once rather than one at a time to avoid three refreshes
        Promise.all([axios.get(URL_FOR_CONFIG), axios.get(URL_FOR_FORM_DATA), axios.get(URL_FOR_DOMAIN_DATA)]).then((values) => {
            dispatch({
                type: "API_RESPONSE",
                payload: { config: values[0].data, data: values[1].data, domain: convertDomainArrayToMap(values[2].data) },
            });
        });
    };

    //const sections = state.config.sections;

    useEffect(() => {
        handleFetchComponentDetails();
    }, []);

    const sections = state.mode.isEdit ? [state.mode.sectionInEditMode] : state.config.sections;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const isValid = form.checkValidity();
        isValid ? dispatch({ type: "HIDE_CONTROL_ERRORS" }) : dispatch({ type: "SHOW_CONTROL_ERRORS" });

        console.log(isValid);
        console.log(state.data);
    };

    const paintPage = (sections) => {
        switch (state.config.layout) {
            case "ACCORDION":
                return <Accordion sections={sections} width={state.config.width} />;
            default:
                return sections?.map((sectionId) => (
                    <CardControl
                        key={`section-${sectionId}`}
                        sectionId={sectionId}
                        component={<SmartControl key={`section-${sectionId}`} sectionId={sectionId} dataKey={sectionId} />}
                    />
                ));
        }
    };

    return (
        state.domain.size && (
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                {state?.flags?.isFormDataLoading || state?.flags?.isConfigLoading ? <WaitingControl /> : paintPage(sections)}
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        )
    );
};

export default SmartPageControl;
