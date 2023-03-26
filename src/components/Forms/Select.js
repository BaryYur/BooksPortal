import React, { useEffect, useState } from "react";

import "./Select.css";

export const Select = ({ multiple, value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const clearOptions = () => {
        multiple ? onChange([]) : onChange("");
    }

    const selectOption = (option) => {
        if (multiple) {
            let values = [];

            for (let item of value) {
                values.push(item.label);
            }

            if (values.includes(option.label)) {
                onChange(value.filter(o => o !== option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) onChange(option);
        }
    }

    const isOptionSelected = (option) => {
        let values = [];

        for (let item of value) {
            values.push(item.label);
        }

        return (multiple ? values.includes(option.label) : option === value);
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen])

    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(active => !active)}
            tabIndex={0}
            className="select-container"
        >
            <span className="value">{
                multiple ? value.map(v => (
                    <button
                        key={v.value}
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(v);
                        }}
                        className="option-badge"
                    >
                        {v.label}
                        <span className="remove-btn">&times;</span>
                    </button>
                )) : value?.label}
            </span>
            <button
                onClick={e => {
                    e.stopPropagation();
                    clearOptions();
                }}
                className="clear-btn"
            >&times;</button>
            <div className="divider"></div>
            <div className="caret"></div>
            <ul className={isOpen ? "show" : "options"}>
                {options.map((option, index) => (
                    <li
                        onClick={(e) => {
                            e.stopPropagation();
                            selectOption(option);
                            setIsOpen(false);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value}
                        className={
                            isOptionSelected(option) ? "selected" : "option" &&
                            index === highlightedIndex ? "highlighted" : "option"
                        }
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}