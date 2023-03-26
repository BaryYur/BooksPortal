import React from "react";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

import img1 from "../../images/slider-img1.png";
import img2 from "../../images/slider-img2.png";
import img3 from  "../../images/slider-img3.png";

const HeroSlider = () => {
    const sliderContent = [
        {
            title: "Books 1",
            image: img1,
            link: "/home",
        },
        {
            title: "Books 2",
            image: img2,
            link: "/home",
        },
        {
            title: "Books 3",
            image: img3,
            link: "/home",
        },
    ];

    return (
        <div className="home-page-slider">
            <Splide
                aria-label="ads"
                options={{
                    type: "loop",
                    rewind: true,
                    width: 1200,
                    gap: "10px",
                    autoplay: true,
                    perPage : 1,
                }}
            >
                {sliderContent.map(sliderItem => (
                    <SplideSlide key={Math.random()}>
                        <div className="hero-ads-wrapper">
                            <a href={sliderItem.link}>
                                <img
                                    src={sliderItem.image}
                                    alt={sliderItem.title}
                                />
                            </a>
                        </div>
                    </SplideSlide>
                    )
                )}
            </Splide>
        </div>
    );
}

export default HeroSlider;