import { Boom } from '@hapi/boom';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export function parsingFailHandler(err: any, _: Request, res: Response, _next: NextFunction) {
   res.status(err.status).send(err.type);
}

export function errorHandler(err: Boom, req: Request, res: Response, _next: NextFunction) {
   if (err.isBoom) {
      let errors: string;

      try {
         errors = JSON.parse(err.output.payload.message);
      } catch (error) {
         errors = err.output.payload.message;
      }

      res.status(err.output.statusCode).json({
         errors,
         data: req.body,
      });
   } else {
      const error = err as any;
      res.status(error.status ?? 500).json({
         message: error.type,
         data: req.body,
      });
   }

   // next(error);
}
