/**
 * The function `getErrorMessage` takes an error object as input and returns the error message, or a
 * default error message if none is found.
 * @param error - The `error` parameter is an object that can have any keys and values. It is used to
 * represent an error object.
 * @returns The function `getErrorMessage` returns a string.
 */
const getErrorMessage = (error: { [key: string]: any }): string => {
    const defaultError = "An error has occurred!";
    if (error.errors && error.errors.length > 0) {
        return error.errors[0].message || defaultError;
    }
    if (error.message) {
        return error.message;
    }
    return defaultError;
};

export default getErrorMessage;