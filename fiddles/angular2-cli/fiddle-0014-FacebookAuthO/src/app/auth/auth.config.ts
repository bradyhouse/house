import { ENV } from './../core/env.config';

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
};

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'CLIENT_ID',
  CLIENT_DOMAIN: 'CLIENT_DOMAIN',
  AUDIENCE: 'http://localhost:8083/api/',
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: 'openid profile'
};
