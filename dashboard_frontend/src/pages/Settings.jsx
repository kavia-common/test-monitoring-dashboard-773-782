import React from 'react';
import Card from '../components/common/Card';
import { useTheme } from '../components/common/ThemeProvider';
import { useEnv } from '../hooks/useEnv';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const env = useEnv();

  const clearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    alert('Local cache cleared.');
  };

  return (
    <div className="container">
      <Card title="Preferences">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>Theme: <strong>{theme}</strong></div>
          <button className="btn secondary" onClick={toggleTheme}>Toggle Theme</button>
        </div>
      </Card>

      <div style={{ height: 12 }} />

      <Card title="Environment">
        <ul>
          <li>Feature Flags: {env.FEATURE_FLAGS || 'N/A'}</li>
          <li>Experiments Enabled: {String(env.EXPERIMENTS_ENABLED === 'true')}</li>
          <li>Log Level: {env.LOG_LEVEL}</li>
          <li>Telemetry Disabled: {String(env.NEXT_TELEMETRY_DISABLED === 'true')}</li>
          <li>API URL: {env.API_BASE || env.BACKEND_URL || 'Not set (using mocks)'}</li>
          <li>WS URL: {env.WS_URL || 'Not set (no-op)'}</li>
          <li>Frontend URL: {env.FRONTEND_URL || 'N/A'}</li>
        </ul>
      </Card>

      <div style={{ height: 12 }} />

      <Card title="Maintenance" actions={<button className="btn secondary" onClick={clearCache}>Clear local cache</button>}>
        <div>Use the action to clear local storage and cached preferences.</div>
      </Card>
    </div>
  );
}
