import { useState, useEffect, useCallback } from 'react';
import ninoxService from '../services/ninoxService';
import { NinoxRecord } from '../services/types/ninox';

export const useNinoxProjects = (filters?: any) => {
  const [projects, setProjects] = useState<NinoxRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ninoxService.getProjects(filters);
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (projectData: any) => {
    try {
      const newProject = await ninoxService.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    }
  };

  const updateProject = async (recordId: string, updates: any) => {
    try {
      const updatedProject = await ninoxService.updateProject(recordId, updates);
      setProjects(prev => prev.map(p => p.id === recordId ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
  };
};

export const useNinoxKPIs = (projectId?: string) => {
  const [kpis, setKPIs] = useState<NinoxRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKPIs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ninoxService.getKPIs(projectId);
      setKPIs(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch KPIs');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchKPIs();
  }, [fetchKPIs]);

  const createKPI = async (kpiData: any) => {
    try {
      const newKPI = await ninoxService.createKPI(kpiData);
      setKPIs(prev => [...prev, newKPI]);
      return newKPI;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create KPI');
      throw err;
    }
  };

  const updateKPI = async (recordId: string, current: number, status?: string) => {
    try {
      const updatedKPI = await ninoxService.updateKPI(recordId, current, status);
      setKPIs(prev => prev.map(k => k.id === recordId ? updatedKPI : k));
      return updatedKPI;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update KPI');
      throw err;
    }
  };

  return {
    kpis,
    loading,
    error,
    refetch: fetchKPIs,
    createKPI,
    updateKPI,
  };
};

export const useNinoxDatasets = (filters?: any) => {
  const [datasets, setDatasets] = useState<NinoxRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ninoxService.getDatasets(filters);
      setDatasets(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch datasets');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  const createDataset = async (datasetData: any) => {
    try {
      const newDataset = await ninoxService.createDataset(datasetData);
      setDatasets(prev => [...prev, newDataset]);
      return newDataset;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create dataset');
      throw err;
    }
  };

  return {
    datasets,
    loading,
    error,
    refetch: fetchDatasets,
    createDataset,
  };
};

export const useNinoxStakeholders = (projectId?: string) => {
  const [stakeholders, setStakeholders] = useState<NinoxRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStakeholders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ninoxService.getStakeholders(projectId);
      setStakeholders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stakeholders');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchStakeholders();
  }, [fetchStakeholders]);

  const createStakeholder = async (stakeholderData: any) => {
    try {
      const newStakeholder = await ninoxService.createStakeholder(stakeholderData);
      setStakeholders(prev => [...prev, newStakeholder]);
      return newStakeholder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create stakeholder');
      throw err;
    }
  };

  return {
    stakeholders,
    loading,
    error,
    refetch: fetchStakeholders,
    createStakeholder,
  };
};

export const useNinoxTenderAlerts = () => {
  const [tenderAlerts, setTenderAlerts] = useState<NinoxRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenderAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ninoxService.getTenderAlerts();
      setTenderAlerts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tender alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenderAlerts();
  }, [fetchTenderAlerts]);

  const createTenderAlert = async (tenderData: any) => {
    try {
      const newTender = await ninoxService.createTenderAlert(tenderData);
      setTenderAlerts(prev => [...prev, newTender]);
      return newTender;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tender alert');
      throw err;
    }
  };

  return {
    tenderAlerts,
    loading,
    error,
    refetch: fetchTenderAlerts,
    createTenderAlert,
  };
};

export const useNinoxWorkflow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerWorkflow = async (workflowName: string, data: any) => {
    try {
      setLoading(true);
      const result = await ninoxService.triggerWorkflow(workflowName, data);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to trigger workflow');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    triggerWorkflow,
  };
};