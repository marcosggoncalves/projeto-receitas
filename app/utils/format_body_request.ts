export const formatBodyRequest = (errors: any) => {
    let errorFormat: { [key: string]: string } = {};

    errors.forEach((error: any) => {
        errorFormat[error.field] = error.message;
    });

    return errorFormat;
};
