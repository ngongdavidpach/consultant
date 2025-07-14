import React, { useState } from 'react';
import { ArrowRight, Shield, Users, TrendingUp, MapPin, Database, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<'client' | 'employee' | 'partner'>('client');
  const [showLogin, setShowLogin] = useState(false);
  const { t } = useLanguage();
  const { login } = useAuth();

  const handleRoleLogin = (role: 'client' | 'employee' | 'partner') => {
    setSelectedRole(role);
    setShowLogin(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login('demo@example.com', 'password', selectedRole);
    onNavigate('dashboard');
  };

  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Interactive Project Mapping',
      description: 'Visualize South Sudan projects with real-time risk indicators and geospatial analysis',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Data Marketplace',
      description: 'Access and monetize development data with digital licensing and outcome-based pricing',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Onboarding',
      description: 'Generate proposals and contracts in under 10 minutes with our intelligent automation',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security-First Design',
      description: 'Built for South Sudan conditions with bandwidth optimization and security alerts',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Stakeholder Collaboration',
      description: 'Role-based portals for seamless collaboration between clients, employees, and partners',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'RBM & KPI Tracking',
      description: 'Comprehensive toolkits for results-based monitoring and performance tracking',
    },
  ];

  const roles = [
    {
      id: 'client' as const,
      title: t('role.client'),
      description: 'Access project insights, tender opportunities, and collaboration tools',
      color: 'bg-blue-600',
    },
    {
      id: 'employee' as const,
      title: t('role.employee'),
      description: 'Manage projects, track KPIs, and collaborate with stakeholders',
      color: 'bg-green-600',
    },
    {
      id: 'partner' as const,
      title: t('role.partner'),
      description: 'Share data, access marketplace, and expand your network',
      color: 'bg-orange-600',
    },
  ];

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {roles.find(r => r.id === selectedRole)?.title}
            </h2>
            <p className="text-gray-600">
              {roles.find(r => r.id === selectedRole)?.description}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <button
            onClick={() => setShowLogin(false)}
            className="mt-4 w-full text-center text-sm text-gray-600 hover:text-blue-600"
          >
            Back to role selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('welcome.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t('welcome.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('onboarding')}
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Start AI Onboarding
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                Explore Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for successful development projects in South Sudan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Portal
            </h2>
            <p className="text-xl text-gray-600">
              Access role-specific features and dashboards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div key={role.id} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {role.description}
                </p>
                <button
                  onClick={() => handleRoleLogin(role.id)}
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
                >
                  Access Portal
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};