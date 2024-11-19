import { env } from '$env/dynamic/private';
import {
	ClientBuilder,

	// Import middlewares
	type AuthMiddlewareOptions, // Required for auth
	type HttpMiddlewareOptions // Required for sending HTTP requests
} from '@commercetools/ts-client';

const projectKey = env.CTP_PROJECT_KEY!;
const scopes = [env.CTP_SCOPES!];
const region = env.CTP_REGION!;

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
	host: `https://auth.${region}.commercetools.com`,
	projectKey: projectKey,
	credentials: {
		clientId: env.CTP_CLIENT_ID!,
		clientSecret: env.CTP_CLIENT_SECRET!
	},
	scopes,
	httpClient: fetch
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
	host: `https://api.${region}.commercetools.com`,
	httpClient: fetch
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
	.withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
	.withClientCredentialsFlow(authMiddlewareOptions)
	.withHttpMiddleware(httpMiddlewareOptions)
	.withLoggerMiddleware() // Include middleware for logging
	.build();
