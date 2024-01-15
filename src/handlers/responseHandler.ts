import { Response } from 'express';

const response = (res: Response, statusCode: number, data: unknown) => {
  res.status(statusCode).json(data);
};

export default {
  ok: (res: Response, data: unknown) =>
    response(res, 200, {
      status: 'success',
      data,
    }),
  created: (res: Response, data: unknown) =>
    response(res, 201, {
      status: 'success',
      data,
    }),
  badRequest: (res: Response, message: string) =>
    response(res, 400, {
      status: 'error',
      message,
    }),
  unauthorized: (res: Response) =>
    response(res, 401, {
      status: 'error',
      message: 'Unauthorized',
    }),
  forbidden: (res: Response) =>
    response(res, 403, {
      status: 'error',
      message: 'You not have permission to access this resource',
    }),
  notFound: (res: Response) =>
    response(res, 404, {
      status: 'error',
      message: 'The resource you are looking for was not found',
    }),
  error: (res: Response) =>
    response(res, 500, {
      status: 'error',
      message: 'Ops! Something went wrong!',
    }),
};
