export const useCutText = () => {
    const changeText = (text, textLength) => {
        if (text.length < textLength) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        } else {
            return text.charAt(0).toUpperCase() + text.split("").splice(1, textLength - 1).join("") + "...";
        }
    }

    return {
        changeText,
    }
}