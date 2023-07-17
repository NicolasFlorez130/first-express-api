export function convertErrorIntoString(error) {
    const aux = {};
    error.error.errors.forEach(error => (aux[`${error.path}`] = error.message));
    return JSON.stringify(aux);
}
//# sourceMappingURL=validation_utils.js.map