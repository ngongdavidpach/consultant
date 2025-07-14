import React, { useState } from 'react';
import { Database, FolderSync as Sync, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useNinoxProjects, useNinoxKPIs, useNinoxTenderAlerts } from '../hooks/useNinox';

export const NinoxDashboard: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const { projects, loading: projectsLoading, error: projectsError } = useNinoxProjects();
  const { kpis, loading: kpisLoading, error: kpisError } = useNinoxKPIs();
  const { tenderAlerts, loading: tendersLoading, error: tendersError } = useNinoxTenderAlerts();

  const handleSync = async () => {
    setSyncStatus('syncing');
    try {
      // Simulate sync process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <Sync className="w-4 h-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Database className="w-4 h-4" />;
    }
  };

  const getSyncButtonClass = () => {
    switch (syncStatus) {
      case 'syncing':
        return 'bg-blue-600 text-white cursor-not-allowed';
      case 'success':
        return 'bg-green-600 text-white';
      case 'error':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white hover:bg-gray-700';
    }
  };

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      change: '+12%',
      icon: <Database className="w-6 h-6" />,
      color: 'bg-blue-600',
      loading: projectsLoading,
      error: projectsError,
    },
    {
      title: 'Active KPIs',
      value: kpis.filter(kpi => kpi.fields.Status === 'Active').length,
      change: '+8%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-600',
      loading: kpisLoading,
      error: kpisError,
    },
    {
      title: 'New Tenders',
      value: tenderAlerts.filter(tender => tender.fields.Status === 'New').length,
      change: '+25%',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'bg-orange-600',
      loading: tendersLoading,
      error: tendersError,
    },
    {
      title: 'Sync Status',
      value: syncStatus === 'success' ? 'Synced' : 'Pending',
      change: syncStatus === 'success' ? 'Just now' : '5 min ago',
      icon: getSyncIcon(),
      color: syncStatus === 'success' ? 'bg-green-600' : 'bg-gray-600',
      loading: false,
      error: null,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ninox Integration Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time data synchronization and workflow management
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncStatus === 'syncing'}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${getSyncButtonClass()}`}
        >
          {getSyncIcon()}
          <span>
            {syncStatus === 'syncing' ? 'Syncing...' : 
             syncStatus === 'success' ? 'Synced' :
             syncStatus === 'error' ? 'Sync Failed' : 'Sync Now'}
          </span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-right">
                {stat.loading ? (
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                ) : stat.error ? (
                  <div className="text-red-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </>
                )}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Data Tables */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Recent Projects (Ninox)
            </h2>
          </div>
          <div className="p-6">
            {projectsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : projectsError ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-600">{projectsError}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{project.fields.Name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.fields.Status === 'Active' ? 'bg-green-100 text-green-800' :
                        project.fields.Status === 'Planning' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.fields.Status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{project.fields.Sector}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{project.fields.Location}</span>
                      <span>${project.fields.Budget?.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active KPIs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Active KPIs (Ninox)
            </h2>
          </div>
          <div className="p-6">
            {kpisLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : kpisError ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-600">{kpisError}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {kpis.slice(0, 5).map((kpi) => (
                  <div key={kpi.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{kpi.fields.Name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        kpi.fields.Status === 'On Track' ? 'bg-green-100 text-green-800' :
                        kpi.fields.Status === 'At Risk' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {kpi.fields.Status}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{kpi.fields.Current} / {kpi.fields.Target} {kpi.fields.Unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((kpi.fields.Current / kpi.fields.Target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Updated: {new Date(kpi.fields['Last Updated']).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workflow Status */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Workflow Automation Status
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Project Creation</h3>
              <p className="text-sm text-blue-700 mb-2">Automated project setup and stakeholder notification</p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">KPI Monitoring</h3>
              <p className="text-sm text-green-700 mb-2">Real-time KPI updates and alert triggers</p>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-medium text-orange-900 mb-2">Tender Alerts</h3>
              <p className="text-sm text-orange-700 mb-2">Automated tender scraping and notifications</p>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600">Scheduled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};