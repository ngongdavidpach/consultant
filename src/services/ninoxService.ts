import { NinoxClient, NinoxRecord, NinoxTable } from './types/ninox';

class NinoxService {
  private client: NinoxClient;
  private baseUrl: string;
  private apiKey: string;
  private teamId: string;
  private databaseId: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_NINOX_API_URL || 'https://api.ninox.com/v1';
    this.apiKey = import.meta.env.VITE_NINOX_API_KEY || '';
    this.teamId = import.meta.env.VITE_NINOX_TEAM_ID || '';
    this.databaseId = import.meta.env.VITE_NINOX_DATABASE_ID || '';
    
    this.client = {
      baseUrl: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    };
  }

  // Generic API request method
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.client.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Ninox API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Projects Management
  async getProjects(filters?: {
    sector?: string;
    status?: string;
    location?: string;
    riskLevel?: string;
  }): Promise<NinoxRecord[]> {
    let endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Projects/records`;
    
    if (filters) {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      if (queryParams.toString()) {
        endpoint += `?${queryParams.toString()}`;
      }
    }

    return this.request<NinoxRecord[]>(endpoint);
  }

  async createProject(projectData: {
    name: string;
    sector: string;
    status: string;
    budget: number;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    riskLevel: string;
    implementer: string;
    donor: string;
  }): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Projects/records`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          Name: projectData.name,
          Sector: projectData.sector,
          Status: projectData.status,
          Budget: projectData.budget,
          Location: projectData.location,
          'Start Date': projectData.startDate,
          'End Date': projectData.endDate,
          Description: projectData.description,
          'Risk Level': projectData.riskLevel,
          Implementer: projectData.implementer,
          Donor: projectData.donor,
          'Created Date': new Date().toISOString(),
        },
      }),
    });
  }

  async updateProject(recordId: string, updates: Partial<any>): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Projects/records/${recordId}`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'PUT',
      body: JSON.stringify({ fields: updates }),
    });
  }

  // KPI Management
  async getKPIs(projectId?: string): Promise<NinoxRecord[]> {
    let endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/KPIs/records`;
    
    if (projectId) {
      endpoint += `?projectId=${projectId}`;
    }

    return this.request<NinoxRecord[]>(endpoint);
  }

  async createKPI(kpiData: {
    name: string;
    target: number;
    current: number;
    unit: string;
    projectId: string;
    status: string;
    category: string;
  }): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/KPIs/records`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          Name: kpiData.name,
          Target: kpiData.target,
          Current: kpiData.current,
          Unit: kpiData.unit,
          'Project ID': kpiData.projectId,
          Status: kpiData.status,
          Category: kpiData.category,
          'Last Updated': new Date().toISOString(),
        },
      }),
    });
  }

  async updateKPI(recordId: string, current: number, status?: string): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/KPIs/records/${recordId}`;
    
    const updates: any = {
      Current: current,
      'Last Updated': new Date().toISOString(),
    };

    if (status) {
      updates.Status = status;
    }

    return this.request<NinoxRecord>(endpoint, {
      method: 'PUT',
      body: JSON.stringify({ fields: updates }),
    });
  }

  // Stakeholder Management
  async getStakeholders(projectId?: string): Promise<NinoxRecord[]> {
    let endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Stakeholders/records`;
    
    if (projectId) {
      endpoint += `?projectId=${projectId}`;
    }

    return this.request<NinoxRecord[]>(endpoint);
  }

  async createStakeholder(stakeholderData: {
    name: string;
    organization: string;
    role: string;
    contactInfo: string;
    projectId: string;
    engagementLevel: string;
    influence: string;
  }): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Stakeholders/records`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          Name: stakeholderData.name,
          Organization: stakeholderData.organization,
          Role: stakeholderData.role,
          'Contact Info': stakeholderData.contactInfo,
          'Project ID': stakeholderData.projectId,
          'Engagement Level': stakeholderData.engagementLevel,
          Influence: stakeholderData.influence,
          'Created Date': new Date().toISOString(),
        },
      }),
    });
  }

  // Risk Management
  async getRisks(projectId?: string): Promise<NinoxRecord[]> {
    let endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Risks/records`;
    
    if (projectId) {
      endpoint += `?projectId=${projectId}`;
    }

    return this.request<NinoxRecord[]>(endpoint);
  }

  async createRisk(riskData: {
    title: string;
    description: string;
    probability: string;
    impact: string;
    mitigation: string;
    projectId: string;
    status: string;
  }): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Risks/records`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          Title: riskData.title,
          Description: riskData.description,
          Probability: riskData.probability,
          Impact: riskData.impact,
          Mitigation: riskData.mitigation,
          'Project ID': riskData.projectId,
          Status: riskData.status,
          'Created Date': new Date().toISOString(),
        },
      }),
    });
  }

  // Data Marketplace
  async getDatasets(filters?: {
    category?: string;
    priceRange?: string;
    provider?: string;
  }): Promise<NinoxRecord[]> {
    let endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Datasets/records`;
    
    if (filters) {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      if (queryParams.toString()) {
        endpoint += `?${queryParams.toString()}`;
      }
    }

    return this.request<NinoxRecord[]>(endpoint);
  }

  async createDataset(datasetData: {
    title: string;
    description: string;
    category: string;
    provider: string;
    price: number;
    dataPoints: number;
    format: string;
    license: string;
    geographical: string;
    timeframe: string;
  }): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Datasets/records`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          Title: datasetData.title,
          Description: datasetData.description,
          Category: datasetData.category,
          Provider: datasetData.provider,
          Price: datasetData.price,
          'Data Points': datasetData.dataPoints,
          Format: datasetData.format,
          License: datasetData.license,
          Geographical: datasetData.geographical,
          Timeframe: datasetData.timeframe,
          'Created Date': new Date().toISOString(),
          Downloads: 0,
          Rating: 0,
        },
      }),
    });
  }

  // Workflow Automation
  async triggerWorkflow(workflowName: string, data: any): Promise<any> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/workflows/${workflowName}/trigger`;
    
    return this.request<any>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Reports and Analytics
  async generateReport(reportType: string, filters?: any): Promise<any> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/reports/${reportType}`;
    
    return this.request<any>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ filters }),
    });
  }

  // Subscription Management
  async getSubscriptions(): Promise<NinoxRecord[]> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Subscriptions/records`;
    return this.request<NinoxRecord[]>(endpoint);
  }

  async createSubscription(subscriptionData: {
    userId: string;
    plan: string;
    status: string;
    startDate: string;
    endDate: string;
    amount: number;
  }): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/Subscriptions/records`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          'User ID': subscriptionData.userId,
          Plan: subscriptionData.plan,
          Status: subscriptionData.status,
          'Start Date': subscriptionData.startDate,
          'End Date': subscriptionData.endDate,
          Amount: subscriptionData.amount,
          'Created Date': new Date().toISOString(),
        },
      }),
    });
  }

  // Tender Alerts
  async getTenderAlerts(): Promise<NinoxRecord[]> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/TenderAlerts/records`;
    return this.request<NinoxRecord[]>(endpoint);
  }

  async createTenderAlert(tenderData: {
    title: string;
    source: string;
    deadline: string;
    amount: string;
    sector: string;
    description: string;
    url: string;
  }): Promise<NinoxRecord> {
    const endpoint = `/teams/${this.teamId}/databases/${this.databaseId}/tables/TenderAlerts/records`;
    
    return this.request<NinoxRecord>(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        fields: {
          Title: tenderData.title,
          Source: tenderData.source,
          Deadline: tenderData.deadline,
          Amount: tenderData.amount,
          Sector: tenderData.sector,
          Description: tenderData.description,
          URL: tenderData.url,
          Status: 'New',
          'Created Date': new Date().toISOString(),
        },
      }),
    });
  }
}

export const ninoxService = new NinoxService();
export default ninoxService;