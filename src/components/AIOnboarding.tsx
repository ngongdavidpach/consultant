import React, { useState } from 'react';
import { Bot, FileText, Clock, CheckCircle, ArrowRight, Upload, Download, Sparkles } from 'lucide-react';

export const AIOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    type: '',
    sector: '',
    location: '',
    budget: '',
    duration: '',
    beneficiaries: '',
    objectives: '',
    stakeholders: '',
    risks: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocuments, setGeneratedDocuments] = useState<any[]>([]);

  const steps = [
    { id: 1, title: 'Project Information', icon: <FileText className="w-5 h-5" /> },
    { id: 2, title: 'Stakeholder Analysis', icon: <Bot className="w-5 h-5" /> },
    { id: 3, title: 'Risk Assessment', icon: <Clock className="w-5 h-5" /> },
    { id: 4, title: 'Document Generation', icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const documents = [
      {
        id: 1,
        type: 'proposal',
        title: 'Project Proposal',
        description: 'Comprehensive project proposal with objectives, methodology, and timeline',
        pages: 25,
        status: 'generated',
        downloadUrl: '#',
      },
      {
        id: 2,
        type: 'contract',
        title: 'Implementation Contract',
        description: 'Legal contract template with terms, conditions, and deliverables',
        pages: 12,
        status: 'generated',
        downloadUrl: '#',
      },
      {
        id: 3,
        type: 'budget',
        title: 'Budget Breakdown',
        description: 'Detailed budget allocation with cost categories and timelines',
        pages: 8,
        status: 'generated',
        downloadUrl: '#',
      },
      {
        id: 4,
        type: 'risk-matrix',
        title: 'Risk Assessment Matrix',
        description: 'Comprehensive risk analysis with mitigation strategies',
        pages: 6,
        status: 'generated',
        downloadUrl: '#',
      },
    ];

    setGeneratedDocuments(documents);
    setIsGenerating(false);
    setCurrentStep(4);
  };

  const ProjectInfoForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Type
          </label>
          <select
            value={projectData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select project type</option>
            <option value="water-sanitation">Water & Sanitation</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="agriculture">Agriculture</option>
            <option value="infrastructure">Infrastructure</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sector
          </label>
          <select
            value={projectData.sector}
            onChange={(e) => handleInputChange('sector', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select sector</option>
            <option value="public">Public Sector</option>
            <option value="private">Private Sector</option>
            <option value="ngo">NGO/Civil Society</option>
            <option value="multilateral">Multilateral</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <select
            value={projectData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select location</option>
            <option value="central-equatoria">Central Equatoria</option>
            <option value="eastern-equatoria">Eastern Equatoria</option>
            <option value="western-equatoria">Western Equatoria</option>
            <option value="jonglei">Jonglei</option>
            <option value="unity">Unity</option>
            <option value="upper-nile">Upper Nile</option>
            <option value="northern-bahr-el-ghazal">Northern Bahr el Ghazal</option>
            <option value="western-bahr-el-ghazal">Western Bahr el Ghazal</option>
            <option value="lakes">Lakes</option>
            <option value="warrap">Warrap</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget (USD)
          </label>
          <input
            type="number"
            value={projectData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project budget"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (months)
          </label>
          <input
            type="number"
            value={projectData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Project duration"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Beneficiaries
          </label>
          <input
            type="number"
            value={projectData.beneficiaries}
            onChange={(e) => handleInputChange('beneficiaries', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Expected beneficiaries"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Objectives
        </label>
        <textarea
          value={projectData.objectives}
          onChange={(e) => handleInputChange('objectives', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the main objectives and goals of your project..."
        />
      </div>
    </div>
  );

  const StakeholderAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bot className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Stakeholder Analysis</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Our AI analyzes your project context to identify key stakeholders and their engagement strategies.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Stakeholders
        </label>
        <textarea
          value={projectData.stakeholders}
          onChange={(e) => handleInputChange('stakeholders', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="List key stakeholders, their roles, and engagement requirements..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Primary Stakeholders</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Local communities and beneficiaries</li>
            <li>• Government agencies and authorities</li>
            <li>• Donor organizations and funders</li>
            <li>• Implementation partners</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Secondary Stakeholders</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Civil society organizations</li>
            <li>• Private sector partners</li>
            <li>• Academic institutions</li>
            <li>• Media and advocacy groups</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const RiskAssessment = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Automated Risk Assessment</h3>
        </div>
        <p className="text-gray-600 mb-4">
          AI analyzes regional data and project context to identify potential risks and mitigation strategies.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Risk Factors & Mitigation Strategies
        </label>
        <textarea
          value={projectData.risks}
          onChange={(e) => handleInputChange('risks', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Identify potential risks and their mitigation strategies..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3 text-red-600">High Risk</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Security and conflict</li>
            <li>• Weather/climate events</li>
            <li>• Political instability</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3 text-yellow-600">Medium Risk</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Supply chain disruptions</li>
            <li>• Currency fluctuations</li>
            <li>• Regulatory changes</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-gray-900 mb-3 text-green-600">Low Risk</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Technical challenges</li>
            <li>• Staff turnover</li>
            <li>• Equipment maintenance</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const DocumentGeneration = () => (
    <div className="space-y-6">
      {isGenerating ? (
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 animate-spin" />
            <h3 className="text-xl font-semibold text-gray-900">Generating Documents...</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Our AI is creating your project documents. This typically takes 2-3 minutes.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }} />
          </div>
        </div>
      ) : generatedDocuments.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Documents Generated Successfully!</h3>
            </div>
            <p className="text-gray-600">
              Your project documents have been generated and are ready for download.
            </p>
          </div>

          <div className="grid gap-4">
            {generatedDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{doc.pages} pages</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Generated
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 mb-4">Next Steps</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Review and customize generated documents</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Share with stakeholders for feedback</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Submit for approval and implementation</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Generate</h3>
          <p className="text-gray-600 mb-6">
            Click the button below to generate your project documents using AI.
          </p>
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate Documents</span>
          </button>
        </div>
      )}
    </div>
  );

  const isStepComplete = (stepId: number) => {
    switch (stepId) {
      case 1:
        return projectData.type && projectData.sector && projectData.location && projectData.budget;
      case 2:
        return projectData.stakeholders;
      case 3:
        return projectData.risks;
      case 4:
        return generatedDocuments.length > 0;
      default:
        return false;
    }
  };

  const canProceed = () => {
    return isStepComplete(currentStep);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ProjectInfoForm />;
      case 2:
        return <StakeholderAnalysis />;
      case 3:
        return <RiskAssessment />;
      case 4:
        return <DocumentGeneration />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI-Powered Project Onboarding
        </h1>
        <p className="text-gray-600">
          Generate comprehensive project proposals and contracts in under 10 minutes
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-400'
              }`}>
                {isStepComplete(step.id) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </h3>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-8 ${
                  currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </div>

        {currentStep < steps.length ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
              canProceed()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
          >
            Start New Project
          </button>
        )}
      </div>
    </div>
  );
};