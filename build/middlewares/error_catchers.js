import { internal } from '@hapi/boom';
export function errorHandler(error, req, res, _next) {
    if (error.isBoom) {
        let errors = error.output.payload.message;
        try {
            errors = JSON.parse(error.output.payload.message);
        }
        catch (error) { }
        res.status(error.output.statusCode).json({
            errors,
            data: req.body,
        });
    }
    else {
        res.status(500).json({
            message: internal().message,
            data: req.body,
        });
    }
    // next(error);
}
//# sourceMappingURL=error_catchers.js.map