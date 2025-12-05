import React from 'react';
import TopNav from '../components/layout/TopNav';
import SideNav from '../components/layout/SideNav';
import '../components/layout/Layout.css';

/**
 * PUBLIC_INTERFACE
 * Layout wrapping all routed pages with TopNav and SideNav.
 */
export default function AppRoutes({ children, activeRoute }) {
  return (
    <div className="app-shell">
      <TopNav />
      <div className="app-body">
        <SideNav activeRoute={activeRoute} />
        <main id="content" className="app-content" role="main" aria-label="Test Monitoring Dashboard">
          {children}
        </main>
      </div>
    </div>
  );
}
