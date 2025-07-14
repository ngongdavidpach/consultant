import React, { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ProjectMap } from './components/ProjectMap';
import { ProjectDatabase } from './components/ProjectDatabase';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { DataMarketplace } from './components/DataMarketplace';
import { ConsultingToolkit } from './components/ConsultingToolkit';
import { AIOnboarding } from './components/AIOnboarding';
import { NinoxDashboard } from './components/NinoxDashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectDatabase />;
      case 'map':
        return <ProjectMap />;
      case 'marketplace':
        return <DataMarketplace />;
      case 'toolkit':
        return <ConsultingToolkit />;
      case 'onboarding':
        return <AIOnboarding />;
      case 'pricing':
        return <SubscriptionPlans />;
      case 'ninox':
        return <NinoxDashboard />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
          <main>
            {renderPage()}
          </main>
        </div>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;