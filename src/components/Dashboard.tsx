import React from 'react';
import { BarChart3, TrendingUp, Users, MapPin, Calendar, AlertTriangle, DollarSign, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNinoxProjects, useNinoxKPIs } from '../hooks/useNinox';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { projects, loading: projectsLoading } = useNinoxProjects();
  const { kpis, loading: kpisLoading } = useNinoxKPIs();

  const stats = [
    {
      title: 'Active Projects',
      value: projectsLoading ? '...' : projects.filter(p => p.fields.Status === 'Active').length.toString(),
      change: '+12%',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-blue-600',
    },
    {
      title: 'Total Budget',
      value: projectsLoading ? '...' : `$${(projects.reduce((sum, p) => sum + (p.fields.Budget || 0), 0) / 1000000).toFixed(1)}M`,
      change: '+18%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-600',
    },
    {
      title: 'Team Members',
      value: '156',
      change: '+5%',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-purple-600',
    },
    {
      title: 'KPI Score',
      value: kpisLoading ? '...' : `${Math.round(kpis.reduce((sum, k) => sum + ((k.fields.Current / k.fields.Target) * 100), 0) / kpis.length || 0)}%`,
      change: '+3%',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-orange-600',
    },
  ];

  const recentProjects = projectsLoading ? [] : projects.slice(0, 3).map(p => ({
    id: p.id,
    name: p.fields.Name,
    sector: p.fields.Sector,
    status: p.fields.Status,
    progress: p.fields.Progress || Math.floor(Math.random() * 100),
    budget: `$${(p.fields.Budget / 1000).toFixed(0)}K`,
    riskLevel: p.fields['Risk Level'],
  }));

  const alerts = [
    {
      id: 1,
      type: 'security',
      message: 'Security alert: Increased risk level in Central Equatoria',
      time: '2 hours ago',
      severity: 'high',
    },
    {
      id: 2,
      type: 'tender',
      message: 'New tender opportunity: Rural Education Development',
      time: '4 hours ago',
      severity: 'medium',
    },
    {
      id: 3,
      type: 'kpi',
      message: 'KPI milestone reached: Water access target 90% complete',
      time: '1 day ago',
      severity: 'low',
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600">
          {user?.role === 'client' && 'Monitor your projects and access development opportunities'}
          {user?.role === 'employee' && 'Manage projects and track performance metrics'}
          {user?.role === 'partner' && 'Collaborate on projects and explore data opportunities'}
        </p>
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
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Recent Projects
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {projectsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                recentProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.sector}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                        {project.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Budget: {project.budget}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Alerts & Notifications
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100' :
                      alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-500' :
                        alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <TrendingUp className="w-5 h-5" />
            <span>Start New Project</span>
          </button>
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Schedule Meeting</span>
          </button>
          <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span>View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};