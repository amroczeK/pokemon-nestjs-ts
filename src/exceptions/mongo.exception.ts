import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000: {
        const response = host.switchToHttp().getResponse();
        response.status(409).json({
          statusCode: 409,
          message: 'A document with the same pokedex id already exists.',
        });
        break;
      }
      default: {
        throw exception;
      }
    }
  }
}
