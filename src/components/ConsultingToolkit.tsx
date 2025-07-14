import React, { useState } from 'react';
import { Target, Users, BarChart3, CheckCircle, Plus, Edit, Trash2, Calendar, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ConsultingToolkit: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rbm' | 'gta' | 'codesign'>('rbm');
  const [showKPIForm, setShowKPIForm] = useState(false);
  const { t } = useLanguage();

  const rbmKPIs = [
    {
      id: 1,
      name: 'Households with Access to Clean Water',
      target: 3000,
      current: 2450,
      unit: 'households',
      status: 'on-track',
      lastUpdated: '2024-01-15',
      trend: 'up',
    },
    {
      id: 2,
      name: 'Sanitation Facilities Constructed',
      target: 15,
      current: 12,
      unit: 'facilities',
      status: 'on-track',
      lastUpdated: '2024-01-14',
      trend: 'up',
    },
    {
      id: 3,
      name: 'Community Training Sessions',
      target: 30,
      current: 24,
      unit: 'sessions',
      status: 'at-risk',
      lastUpdated: '2024-01-13',
      trend: 'down',
    },
  ];

  const genderAuditItems = [
    {
      id: 1,
      category: 'Leadership & Decision Making',
      questions: [
        {
          question: 'Are women represented in project leadership positions?',
          response: 'Yes - 60% of leadership positions held by women',
          score: 4,
          evidence: 'Leadership roster, meeting minutes',
        },
        {
          question: 'Do women participate in decision-making processes?',
          response: 'Partially - increasing participation through targeted outreach',
          score: 3,
          evidence: 'Participation logs, feedback sessions',
        },
      ],
    },
    {
      id: 2,
      category: 'Resource Access & Control',
      questions: [
        {
          question: 'Do women have equal access to project resources?',
          response: 'Yes - equal access ensured through quotas',
          score: 4,
          evidence: 'Resource allocation records',
        },
        {
          question: 'Are women involved in resource management?',
          response: 'Yes - women lead resource committees',
          score: 5,
          evidence: 'Committee records, financial reports',
        },
      ],
    },
  ];

  const codesignActivities = [
    {
      id: 1,
      title: 'Community Water Needs Assessment',
      type: 'workshop',
      date: '2024-01-20',
      participants: 45,
      status: 'completed',
      outcomes: ['Priority water sources identified', 'Community maintenance plan developed'],
    },
    {
      id: 2,
      title: 'Sanitation Design Co-Creation',
      type: 'design-session',
      date: '2024-01-25',
      participants: 32,
      status: 'in-progress',
      outcomes: ['Facility designs approved', 'Implementation timeline agreed'],
    },
    {
      id: 3,
      title: 'Feedback & Iteration Session',
      type: 'feedback',
      date: '2024-01-30',
      participants: 28,
      status: 'planned',
      outcomes: [],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-yellow-100 text-yellow-800';
      case 'off-track': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const RBMTracker = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Results-Based Monitoring</h2>
        <button
          onClick={() => setShowKPIForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add KPI</span>
        </button>
      </div>

      <div className="grid gap-6">
        {rbmKPIs.map((kpi) => (
          <div key={kpi.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{kpi.name}</h3>
                <p className="text-sm text-gray-600">
                  Last updated: {new Date(kpi.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                  {kpi.status.replace('-', ' ')}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{kpi.current} / {kpi.target} {kpi.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    kpi.status === 'on-track' ? 'bg-green-500' :
                    kpi.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${getProgressPercentage(kpi.current, kpi.target)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {getProgressPercentage(kpi.current, kpi.target).toFixed(1)}%
                </span> complete
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Update Progress
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
            <div className="text-sm text-gray-600">Active KPIs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">1</div>
            <div className="text-sm text-gray-600">At Risk</div>
          </div>
        </div>
      </div>
    </div>
  );

  const GenderAudit = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Gender Audit Module</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
          Generate Report
        </button>
      </div>

      <div className="grid gap-6">
        {genderAuditItems.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
            
            <div className="space-y-4">
              {category.questions.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                  <p className="text-gray-700 mb-2">{item.response}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Score:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            key={star}
                            className={`w-4 h-4 rounded-full ${
                              star <= item.score ? 'bg-yellow-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">Evidence: {item.evidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Audit Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.1</div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Assessments</div>
          </div>
        </div>
      </div>
    </div>
  );

  const CoDesignWorkspace = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Co-Design Workspace</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Activity</span>
        </button>
      </div>

      <div className="grid gap-6">
        {codesignActivities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {activity.participants} participants
                  </span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                {activity.status.replace('-', ' ')}
              </span>
            </div>

            {activity.outcomes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Outcomes:</h4>
                <ul className="space-y-1">
                  {activity.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  Add Feedback
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Co-Design Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">105</div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3</div>
            <div className="text-sm text-gray-600">Activities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Key Outcomes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">92%</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'rbm', label: 'RBM Tracker', icon: <Target className="w-5 h-5" /> },
    { id: 'gta', label: 'Gender Audit', icon: <Users className="w-5 h-5" /> },
    { id: 'codesign', label: 'Co-Design', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Consulting Toolkit
        </h1>
        <p className="text-gray-600">
          Comprehensive tools for RBM, gender-transformative approaches, and co-design methodologies
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'rbm' && <RBMTracker />}
        {activeTab === 'gta' && <GenderAudit />}
        {activeTab === 'codesign' && <CoDesignWorkspace />}
      </div>
    </div>
  );
};