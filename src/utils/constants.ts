export const ERROR_TYPEs = {
	VALIDATION_BODY_ERROR: {
		name: 'VALIDATION_BODY_ERROR',
		message: 'Invalid Body',
		code: 400,
	},
	VALIDATION_QUERY_PARAMS_ERROR: {
		name: 'VALIDATION_QUERY_PARAMS_ERROR',
		code: 400,
		message: 'Invalid Query Params',
	},
	SERVER_ERROR: {
		name: 'SERVER_ERROR',
		code: 500,
		message: 'Server Error',
	},
	NOT_FOUND: {
		name: 'NOT_FOUND',
		code: 404,
		message: 'Not Found',
	},
	URL_NOT_FOUND_URL: {
		name: 'URL_NOT_FOUND',
		code: 404,
		message: 'Url Not Found',
	},
	BAD_REQUEST: {
		name: 'BAD_REQUEST',
		code: 400,
		message: 'Bad Request',
	},
	EXISTED_ERROR: {
		name: 'EXISTED_ERROR',
		code: 409,
		message: 'Resource existed',
	},
	UNAUTHORIZED: {
		name: 'UNAUTHORIZED',
		code: 401,
		message: 'Unauthorized',
	},
	ACCESS_DENIED: {
		name: 'ACCESS_DENIED',
		code: 403,
		message: 'Your current role not allow to access this resource',
	},
	BLOCKING: {
		name: 'BLOCKING',
		code: 400,
		message: 'Account is blocking',
	},
};
