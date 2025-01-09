import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { UserModule } from './application/user/user.module';
import sequilzeObj from './database/sequilze.obj';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false, // Enable GraphQL Playground
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // For Apollo Studio
      introspection: true,
      context: ({ req }) => ({ req }),
      formatError: (error) => {
        return {
          message: error.message,
          code: error.extensions?.code,
          path: error.path,
        };
      },
    }),
    sequilzeObj,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
