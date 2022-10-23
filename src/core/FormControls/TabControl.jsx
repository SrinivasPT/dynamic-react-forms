import React, { useEffect, useState } from "react";
import SmartControl from "../SmartControls/SmartControl";

function TabControl({ sectionId, control, dataKey }) {
    const [selectedTab, setSelectedTab] = useState(control["controlGroup"].filter((element) => element["props"]["default"])[0]["id"]);

    const handleTabClick = (clickedTab) => {
        setSelectedTab(clickedTab);
        //displayClickedComponent(selectedTab);
    };

    const displayClickedComponent = () => {
        // return <SmartControl sectionId={selectedTab} dataKey={dataKey} />;
        return (
            <div className="tab-content" id="nav-tabContent">
                {control["controlGroup"].map((tab, tabIndex) => {
                    return (
                        <div
                            className={`tab-pane fade ${tab.id === selectedTab ? " show active " : ""}`}
                            id={`nav-${tab.id}`}
                            role="tabpanel"
                            aria-labelledby={`nav-${tab.id}-tab`}
                            tabIndex="0"
                        >
                            <SmartControl sectionId={tab.id} dataKey={dataKey} />
                        </div>
                    );
                })}
            </div>
        );
    };

    const displayTabs = () => {
        return (
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {control["controlGroup"].map((tab) => {
                        return (
                            <button
                                className={"nav-link " + tab.id === selectedTab ? "active" : ""}
                                id={`nav-${tab.id}-tab`}
                                data-bs-toggle="tab"
                                data-bs-target={`#nav-${tab.id}`}
                                type="button"
                                role="tab"
                                aria-controls={`nav-${tab.id}`}
                                aria-selected={selectedTab === tab.id ? "true" : "false"}
                                key={dataKey + tab.id}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab["props"]["label"]}
                            </button>
                        );
                    })}
                </div>
            </nav>
        );
    };

    return (
        <div className="col-12">
            {displayTabs()}
            {displayClickedComponent()}
        </div>
    );
}

export default TabControl;
