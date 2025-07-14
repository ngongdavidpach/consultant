import React, { useState } from 'react';
import { Save, X, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { useNinoxProjects, useNinoxWorkflow } from '../hooks/useNinox';

interface NinoxProjectFormProps {
  onClose: () => void;
  onSuccess?: (project: any) => void;
}

export const NinoxProjectForm: React.FC<NinoxProjectFormProps> = ({ onClose, onSuccess }) => {
  const { createProject } = useNinoxProjects();
  const { triggerWorkflow } = useNinoxWorkflow();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    status: 'Planning',
    budget: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    riskLevel: 'Medium',
    implementer: '',
    donor: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create project in Ninox
      const projectData = {
        ...formData,
        budget: parseFloat(formData.budget) || 0,
      };

      const newProject = await createProject(projectData);

      // Trigger workflow automation
      await triggerWorkflow('project-creation', {
        projectId: newProject.id,
        projectName: formData.name,
        stakeholders: ['project-manager', 'donor-representative'],
        notifications: true,
      });

      setSuccess(true);
      onSuccess?.(newProject);
      
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Created!</h2>
          <p className="text-gray-600 mb-4">
            Your project has been successfully created in Ninox and workflow automation has been triggered.
          </p>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">
              ✓ Project record created<br/>
              ✓ Stakeholders notified<br/>
              ✓ Workflow automation started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Create Project in Ninox</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sector *
              </label>
              <select
                required
                value={formData.sector}
                onChange={(e) => handleInputChange('sector', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select sector</option>
                <option value="Water & Sanitation">Water & Sanitation</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Social Protection">Social Protection</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Planning">Planning</option>
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget (USD) *
              </label>
              <input
                type="number"
                required
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter budget amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                <option value="Central Equatoria">Central Equatoria</option>
                <option value="Eastern Equatoria">Eastern Equatoria</option>
                <option value="Western Equatoria">Western Equatoria</option>
                <option value="Jonglei">Jonglei</option>
                <option value="Unity">Unity</option>
                <option value="Upper Nile">Upper Nile</option>
                <option value="Northern Bahr el Ghazal">Northern Bahr el Ghazal</option>
                <option value="Western Bahr el Ghazal">Western Bahr el Ghazal</option>
                <option value="Lakes">Lakes</option>
                <option value="Warrap">Warrap</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Risk Level
              </label>
              <select
                value={formData.riskLevel}
                onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Implementer *
              </label>
              <input
                type="text"
                required
                value={formData.implementer}
                onChange={(e) => handleInputChange('implementer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter implementing organization"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donor *
              </label>
              <input
                type="text"
                required
                value={formData.donor}
                onChange={(e) => handleInputChange('donor', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter donor organization"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project description and objectives"
            />
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};