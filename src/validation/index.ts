/**
 * Validates a product object by checking its title, description, imageURL, and price.
 * Returns an object containing error messages for any invalid fields.
 * 
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product. Must be between 10 and 80 characters.
 * @param {string} product.description - The description of the product. Must be between 10 and 900 characters.
 * @param {string} product.imageURL - The URL of the product image. Must be a valid image URL (png, jpg, jpeg, gif, bmp, webp, svg).
 * @param {string} product.price - The price of the product. Must be a valid number.
 * 
 * @returns {Object} - An object containing error messages for each invalid field. If a field is valid, its corresponding error message will be an empty string.
 * @returns {string} errors.title - Error message for the product title, or an empty string if valid.
 * @returns {string} errors.description - Error message for the product description, or an empty string if valid.
 * @returns {string} errors.imageURL - Error message for the image URL, or an empty string if valid.
 * @returns {string} errors.price - Error message for the product price, or an empty string if valid.
 */

export const productValidation = (product: { title: string; description: string; imageURL: string; price: string }) => {
    const errors: { title: string; description: string; imageURL: string; price: string } = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    };

    const valideURL = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg)/ig.test(product.imageURL);

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Product title must be between 10 and 80 character";
    }

    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = "Product description must be between 10 and 900 character";
    }

    if (!product.imageURL.trim() || !valideURL) {
        errors.imageURL = "Valide Image URL is required";
    }

    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valide price is required";
    }

    return errors;
};
