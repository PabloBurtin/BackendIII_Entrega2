export class HttpError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = "HttpError";
        this.status = status;
    }
}

export const handleError = (res, error) => {
    const isMongooseInputError = error.name === "CastError" || error.name === "ValidationError";
    const status = error.status || (isMongooseInputError ? 400 : 500);

    res.status(status).json({ status: "error", message: error.message });
};
