import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { format } from 'date-fns-tz'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter)
  await app.listen(3000);

  Date.prototype.toJSON = function(): any {
    return format(this, 'yyyy-MM-dd HH:mm:ss.SSS', { timeZone: 'America/Sao_Paulo' })
  }

}
bootstrap();
