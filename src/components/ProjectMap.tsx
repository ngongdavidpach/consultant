import React, { useState } from 'react';
import { MapPin, Filter, Search, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ProjectMap: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filterSector, setFilterSector] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      name: 'CRISSIP Sanitation Program',
      sector: 'Water & Sanitation',
      status: 'Active',
      riskLevel: 'Medium',
      location: 'Juba',
      coordinates: { lat: 4.8594, lng: 31.5713 },
      budget: '$450K',
      progress: 75,
      description: 'Comprehensive sanitation improvement program targeting urban areas.',
      kpis: {
        'Households Served': '2,450 / 3,000',
        'Facilities Built': '12 / 15',
        'Training Sessions': '24 / 30',
      },
    },
    {
      id: 2,
      name: 'Borehole Development Initiative',
      sector: 'Water Access',
      status: 'Planning',
      riskLevel: 'Low',
      location: 'Malakal',
      coordinates: { lat: 9.5334, lng: 31.6584 },
      budget: '$320K',
      progress: 25,
      description: 'Community-led borehole construction and maintenance program.',
      kpis: {
        'Boreholes Planned': '8 / 20',
        'Communities Engaged': '15 / 25',
        'Water Quality Tests': '5 / 20',
      },
    },
    {
      id: 3,
      name: 'Community Health Centers',
      sector: 'Healthcare',
      status: 'Active',
      riskLevel: 'High',
      location: 'Wau',
      coordinates: { lat: 7.7014, lng: 27.9979 },
      budget: '$680K',
      progress: 60,
      description: 'Establishment of primary healthcare facilities in rural communities.',
      kpis: {
        'Centers Operational': '6 / 10',
        'Staff Trained': '45 / 60',
        'Patients Served': '1,200 / month',
      },
    },
    {
      id: 4,
      name: 'Agricultural Training Program',
      sector: 'Agriculture',
      status: 'Completed',
      riskLevel: 'Low',
      location: 'Yei',
      coordinates: { lat: 4.0939, lng: 30.6781 },
      budget: '$280K',
      progress: 100,
      description: 'Capacity building program for sustainable farming practices.',
      kpis: {
        'Farmers Trained': '500 / 500',
        'Cooperatives Formed': '20 / 20',
        'Yield Improvement': '35%',
      },
    },
  ];

  const filteredProjects = projects.filter(project => {
    return (
      (filterSector === 'all' || project.sector === filterSector) &&
      (filterStatus === 'all' || project.status === filterStatus) &&
      (filterRisk === 'all' || project.riskLevel === filterRisk)
    );
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Planning': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-gray-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          South Sudan Project Map
        </h1>
        <p className="text-gray-600">
          Interactive visualization of development projects with real-time risk indicators
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Sectors</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
            <option value="Water Access">Water Access</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Agriculture">Agriculture</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Planning">Planning</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="High">High Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low Risk</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Interactive Map
            </h2>
            
            {/* Simulated Map */}
            <div className="relative bg-blue-50 rounded-lg overflow-hidden" style={{ height: '600px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                {/* Country outline simulation */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-green-200 rounded-full opacity-30" />
                
                {/* Project markers */}
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${
                      project.riskLevel === 'High' ? 'bg-red-500' :
                      project.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </button>
                ))}
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Risk Levels</h3>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-xs text-gray-600">High Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-xs text-gray-600">Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-xs text-gray-600">Low Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          {selectedProject ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedProject.name}
                  </h3>
                  <p className="text-sm text-gray-600">{selectedProject.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedProject.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedProject.riskLevel)}`}>
                    {selectedProject.riskLevel} Risk
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{selectedProject.description}</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{selectedProject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${selectedProject.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Budget:</span>
                    <p className="font-medium">{selectedProject.budget}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Sector:</span>
                    <p className="font-medium">{selectedProject.sector}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Performance Indicators</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedProject.kpis).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-8">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Project
                </h3>
                <p className="text-gray-600">
                  Click on a project marker to view detailed information
                </p>
              </div>
            </div>
          )}

          {/* Project List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Projects ({filteredProjects.length})
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`w-full text-left border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      selectedProject?.id === project.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {project.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(project.riskLevel)}`}>
                        {project.riskLevel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{project.location} • {project.sector}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(project.status)}
                        <span className="text-xs text-gray-600">{project.status}</span>
                      </div>
                      <span className="text-xs text-gray-600">{project.budget}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};