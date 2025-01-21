import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const error = exception instanceof HttpException ? exception.getResponse() : '';
		const message = (error as HttpException).message ? (error as HttpException).message : 'Internal server error';

		const errorMessage = {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message,
		};

		// Logging the exception
		this.logger.error(`${request.method} ${request.url}`, JSON.stringify(errorMessage));

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message,
		});
	}
}
