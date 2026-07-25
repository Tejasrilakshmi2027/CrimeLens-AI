export interface DashboardSummary {
    total_cases: number;
    pending_cases: number;
    completed_cases: number;
    arrests: number;
}

export interface RecentCase {
    CrimeNo: string;
    Crime: string;
    District: string;
    Status: string;
    Officer: string;
    CrimeRegisteredDate: string;
}