import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ERROR_TYPEs } from '../utils/constants';
export const validateQueryParam = (schema: Schema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.query);
		if (error) {
			return res.status(400).send({
				data: null,
				error: {
					status: ERROR_TYPEs.VALIDATION_QUERY_PARAMS_ERROR.code,
					name: ERROR_TYPEs.VALIDATION_QUERY_PARAMS_ERROR.name,
					message: error.details.map((err) => err.message).join(', '),
					detail: {},
				},
			});
		}
		next();
	};
};
