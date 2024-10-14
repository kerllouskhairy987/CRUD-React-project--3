/**
 * Slices a given text to a specified maximum length and appends an ellipsis ("...") if the text exceeds that length.
 * 
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=60] - The maximum length of the text before it is truncated. Defaults to 60 if not provided.
 * @returns {string} - The sliced text, with an ellipsis appended if the original text exceeds the specified length.
 */
export function txtSlicer(txt: string, max: number = 60) {
    if(txt.length >= max) return `${txt.slice(0, max)} ...`;
    return txt;
};
