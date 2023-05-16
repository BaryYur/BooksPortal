import React, { useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function RangeInput({ startValue, finishValue, min, max, inputName }) {
    const [value, setValue] = useState([startValue, finishValue]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const valuetext = (value) => {
        return `${value} ${inputName}`;
    }

    return (
        <Box sx={{ width: "100%" }}>
            <Slider
                getAriaLabel={() => inputName}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={min}
                max={max}
            />
        </Box>
    );
}