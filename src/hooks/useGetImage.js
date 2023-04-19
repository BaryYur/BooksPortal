import React, { useState } from "react";

export const useGetImage = () => {
    const [image, setImage] = useState("");

    const changeImage = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();

        if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png") {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            }

            console.log(image);
        } else {
            setImage("");
            e.target.value = "";
        }
    }

    return {
        changeImage,
        image
    }
}