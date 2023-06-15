import React, { useEffect, useState } from 'react';

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <>{children}</>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

export default function BasicTabs({ tabsInfo, isAuthor, fetchingAuthorBooks }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        if (isAuthor && newValue === 0) {
            fetchingAuthorBooks();
        }

        setValue(newValue);
    }

    return (
        <Box sx={{ width: "100%", minHeight: "250px"}}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                >
                    {tabsInfo.map((tab, index) => (
                        <Tab
                            key={Math.random()}
                            label={tab.name}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabsInfo.map((tab, index) => (
                <TabPanel
                    key={Math.random()}
                    index={index}
                    value={value}
                >
                    <span>{tab.description}</span>
                </TabPanel>
            ))}
        </Box>
    );
}