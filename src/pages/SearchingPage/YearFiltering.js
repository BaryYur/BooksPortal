import RangeInput from "../../components/Forms/RangeInput";
import {useContext, useEffect, useState} from "react";
import ItemsContext from "../../context/items-context";

const YearFiltering = () => {
    const { searchingItems } = useContext(ItemsContext);
    const [minYear, setMinYear] = useState(0);
    const [maxYear, setMaxYear] = useState(10);

    const gettingPrices = () => {
        let values = [];

        for (let book of searchingItems) {
            values.push(Number(book.publishDate[0] + book.publishDate[1] + book.publishDate[2] + book.publishDate[3]));
        }

        let min = values[0];
        let max = values[0];

        for (let year of values) {
            if (year < min) {
                min = year;
            }

            if (year > max) {
                max = year;
            }
        }

        setMinYear(min);
        setMaxYear(max);
    }

    useEffect(() => {
        gettingPrices();
    }, [searchingItems]);

    return (
        <div className="range-input-controller">
            <p  style={{ fontWeight: "600" }}>By year:</p>
            <RangeInput
                inputName="year"
                startValue={minYear}
                finishValue={maxYear}
                min={minYear}
                max={maxYear}
            />
            <div className="max-min-numbers-box">
                <p>{minYear}</p>
                <p>{maxYear}</p>
            </div>
        </div>
    );
}

export default YearFiltering;