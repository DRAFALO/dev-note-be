import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerPath = 'api/v1';

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle('Dev-note API Documentation')
  .setDescription(
    'Here is the api for dev-note project \n\n## Congratulations! Your service resource is ready.\n',
  )
  .addBearerAuth()
  .build();

export const swaggerSetupOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  // customCssUrl: "../swagger/swagger.css",
  // customfavIcon: "../swagger/favicon.png",
  customSiteTitle: 'Devnote API Documentation',
};
