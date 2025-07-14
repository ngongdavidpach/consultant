import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSector, setFilterSector] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMechanism, setFilterMechanism] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      name: 'CRISSIP Sanitation Program',
      sector: 'Water & Sanitation',
      status: 'Active',
      mechanism: 'Co-Design',
      budget: 450000,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      location: 'Juba',
      riskLevel: 'Medium',
      progress: 75,
      donor: 'World Bank',
      implementer: 'Local NGO Consortium',
      description: 'Comprehensive sanitation improvement program targeting urban areas with community participation.',
    },
    {
      id: 2,
      name: 'Borehole Development Initiative',
      sector: 'Water Access',
      status: 'Planning',
      mechanism: 'RBM',
      budget: 320000,
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      location: 'Malakal',
      riskLevel: 'Low',
      progress: 25,
      donor: 'USAID',
      implementer: 'Water for South Sudan',
      description: 'Community-led borehole construction and maintenance program using results-based monitoring.',
    },
    {
      id: 3,
      name: 'Community Health Centers',
      sector: 'Healthcare',
      status: 'Active',
      mechanism: 'GTA',
      budget: 680000,
      startDate: '2023-08-01',
      endDate: '2024-07-31',
      location: 'Wau',
      riskLevel: 'High',
      progress: 60,
      donor: 'Global Fund',
      implementer: 'International Medical Corps',
      description: 'Establishment of primary healthcare facilities using gender-transformative approaches.',
    },
    {
      id: 4,
      name: 'Agricultural Training Program',
      sector: 'Agriculture',
      status: 'Completed',
      mechanism: 'Co-Design',
      budget: 280000,
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      location: 'Yei',
      riskLevel: 'Low',
      progress: 100,
      donor: 'FAO',
      implementer: 'Farmers Association',
      description: 'Capacity building program for sustainable farming practices with community co-design.',
    },
    {
      id: 5,
      name: 'Education Infrastructure',
      sector: 'Education',
      status: 'Planning',
      mechanism: 'RBM',
      budget: 550000,
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      location: 'Bentiu',
      riskLevel: 'Medium',
      progress: 10,
      donor: 'UNICEF',
      implementer: 'Education Partnership',
      description: 'Construction and rehabilitation of schools with results-based monitoring framework.',
    },
    {
      id: 6,
      name: 'Livestock Vaccination Campaign',
      sector: 'Agriculture',
      status: 'Active',
      mechanism: 'GTA',
      budget: 180000,
      startDate: '2024-02-01',
      endDate: '2024-11-30',
      location: 'Rumbek',
      riskLevel: 'Low',
      progress: 85,
      donor: 'EU',
      implementer: 'Veterinary Sans Frontières',
      description: 'Mass vaccination campaign for livestock with gender-inclusive approach.',
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.implementer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = filterSector === 'all' || project.sector === filterSector;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesMechanism = filterMechanism === 'all' || project.mechanism === filterMechanism;

    return matchesSearch && matchesSector && matchesStatus && matchesMechanism;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'budget':
        return b.budget - a.budget;
      case 'startDate':
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case 'progress':
        return b.progress - a.progress;
      default:
        return 0;
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Planning':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Project Database
        </h1>
        <p className="text-gray-600">
          Comprehensive database of development projects with advanced filtering and search capabilities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sectors</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
            <option value="Water Access">Water Access</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Agriculture">Agriculture</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={filterMechanism}
            onChange={(e) => setFilterMechanism(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Mechanisms</option>
            <option value="RBM">RBM</option>
            <option value="GTA">GTA</option>
            <option value="Co-Design">Co-Design</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Sort by Name</option>
            <option value="budget">Sort by Budget</option>
            <option value="startDate">Sort by Start Date</option>
            <option value="progress">Sort by Progress</option>
          </select>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {sortedProjects.length} of {projects.length} projects
          </span>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Project</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Sector</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Mechanism</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Risk</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-600">{project.location}</div>
                      <div className="text-sm text-gray-500">{project.implementer}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {project.sector}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <span className="text-sm text-gray-900">{project.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{project.mechanism}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(project.budget)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                      {project.riskLevel}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tender Alerts */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Automated Tender Alerts
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Latest opportunities from DGMarket and other sources
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                title: 'Rural Water Supply Enhancement',
                source: 'DGMarket',
                deadline: '2024-02-15',
                amount: '$750,000',
                sector: 'Water & Sanitation',
                status: 'New',
              },
              {
                title: 'Community Health Worker Training',
                source: 'World Bank',
                deadline: '2024-02-28',
                amount: '$420,000',
                sector: 'Healthcare',
                status: 'Updated',
              },
              {
                title: 'Agricultural Equipment Distribution',
                source: 'FAO',
                deadline: '2024-03-10',
                amount: '$280,000',
                sector: 'Agriculture',
                status: 'New',
              },
            ].map((tender, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{tender.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {tender.source} • {tender.sector} • Deadline: {formatDate(tender.deadline)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{tender.amount}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tender.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tender.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Set Alert
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};