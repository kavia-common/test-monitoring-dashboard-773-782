export function getEnvStatic() {
  const env = typeof process !== 'undefined' ? process.env || {} : {};
  return {
    API_BASE: env.REACT_APP_API_BASE || '',
    BACKEND_URL: env.REACT_APP_BACKEND_URL || '',
    FRONTEND_URL: env.REACT_APP_FRONTEND_URL || '',
    WS_URL: env.REACT_APP_WS_URL || '',
    NODE_ENV: env.REACT_APP_NODE_ENV || env.NODE_ENV || 'development',
    NEXT_TELEMETRY_DISABLED: env.REACT_APP_NEXT_TELEMETRY_DISABLED || 'true',
    ENABLE_SOURCE_MAPS: env.REACT_APP_ENABLE_SOURCE_MAPS || 'false',
    PORT: env.REACT_APP_PORT || '3000',
    TRUST_PROXY: env.REACT_APP_TRUST_PROXY || 'false',
    LOG_LEVEL: env.REACT_APP_LOG_LEVEL || 'info',
    HEALTHCHECK_PATH: env.REACT_APP_HEALTHCHECK_PATH || '/healthz',
    FEATURE_FLAGS: env.REACT_APP_FEATURE_FLAGS || '',
    EXPERIMENTS_ENABLED: env.REACT_APP_EXPERIMENTS_ENABLED || 'false',
  };
}
