export const useScrollToTop = () => {
    const scrollToTop = () => {
        document.querySelector("body").scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return { scrollToTop };
}