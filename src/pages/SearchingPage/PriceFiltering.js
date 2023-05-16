import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import RangeInput from "../../components/Forms/RangeInput";

const PriceFiltering = () => {
    const { searchingItems } = useContext(ItemsContext);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10);

    const gettingPrices = () => {
        let values = [];

        for (let book of searchingItems) {
            values.push(book.price);
        }

        let min = values[0];
        let max = values[0];

        for (let price of values) {
            if (price < min) {
                min = price;
            }

            if (price > max) {
                max = price;
            }
        }

        setMinPrice(min);
        setMaxPrice(max);
    }

    useEffect(() => {
        gettingPrices();
    }, [searchingItems]);

    return (
        <div className="range-input-controller">
            <p  style={{ fontWeight: "600" }}>By price:</p>
            <RangeInput
                inputName="price"
                startValue={minPrice}
                finishValue={maxPrice}
                min={minPrice}
                max={maxPrice}
            />
            <div className="max-min-numbers-box">
                <p>{minPrice}$</p>
                <p>{maxPrice}$</p>
            </div>
        </div>
    );
}

export default PriceFiltering;