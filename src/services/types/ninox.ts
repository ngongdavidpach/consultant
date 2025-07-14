export interface NinoxClient {
  baseUrl: string;
  headers: Record<string, string>;
}

export interface NinoxRecord {
  id: string;
  fields: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface NinoxTable {
  id: string;
  name: string;
  fields: NinoxField[];
}

export interface NinoxField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  options?: string[];
}

export interface ProjectRecord extends NinoxRecord {
  fields: {
    Name: string;
    Sector: string;
    Status: string;
    Budget: number;
    Location: string;
    'Start Date': string;
    'End Date': string;
    Description: string;
    'Risk Level': string;
    Implementer: string;
    Donor: string;
    'Created Date': string;
    Progress?: number;
  };
}

export interface KPIRecord extends NinoxRecord {
  fields: {
    Name: string;
    Target: number;
    Current: number;
    Unit: string;
    'Project ID': string;
    Status: string;
    Category: string;
    'Last Updated': string;
  };
}

export interface StakeholderRecord extends NinoxRecord {
  fields: {
    Name: string;
    Organization: string;
    Role: string;
    'Contact Info': string;
    'Project ID': string;
    'Engagement Level': string;
    Influence: string;
    'Created Date': string;
  };
}

export interface RiskRecord extends NinoxRecord {
  fields: {
    Title: string;
    Description: string;
    Probability: string;
    Impact: string;
    Mitigation: string;
    'Project ID': string;
    Status: string;
    'Created Date': string;
  };
}

export interface DatasetRecord extends NinoxRecord {
  fields: {
    Title: string;
    Description: string;
    Category: string;
    Provider: string;
    Price: number;
    'Data Points': number;
    Format: string;
    License: string;
    Geographical: string;
    Timeframe: string;
    'Created Date': string;
    Downloads: number;
    Rating: number;
  };
}

export interface SubscriptionRecord extends NinoxRecord {
  fields: {
    'User ID': string;
    Plan: string;
    Status: string;
    'Start Date': string;
    'End Date': string;
    Amount: number;
    'Created Date': string;
  };
}

export interface TenderAlertRecord extends NinoxRecord {
  fields: {
    Title: string;
    Source: string;
    Deadline: string;
    Amount: string;
    Sector: string;
    Description: string;
    URL: string;
    Status: string;
    'Created Date': string;
  };
}

export interface WorkflowTrigger {
  name: string;
  data: Record<string, any>;
  timestamp: string;
}

export interface NinoxReport {
  type: string;
  data: any[];
  generatedAt: string;
  filters?: Record<string, any>;
}