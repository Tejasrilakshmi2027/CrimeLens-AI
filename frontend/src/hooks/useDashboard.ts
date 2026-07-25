import { useEffect, useState } from "react";

import api from "../api/axios";

export interface DashboardSummary {

    total_cases:number;

    pending_cases:number;

    completed_cases:number;

    arrests:number;

    investigation_cases?:number;

}

export function useDashboard(){

    const [summary,setSummary]=useState<DashboardSummary>();

    const [loading,setLoading]=useState(true);

    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const fetchData = async () => {
        console.log('Fetching dashboard summary...');
        api.get("/dashboard/summary")

        .then(res=>{
            console.log('Dashboard summary received:', res.data);
            setSummary(res.data);
        })

        .catch(err=>{
            console.error('Failed to fetch dashboard summary:', err);
            console.error('Error details:', err.response?.data || err.message);
        })

        .finally(()=>setLoading(false));
    };

    useEffect(()=>{
        fetchData();

        // Auto-refresh every 30 seconds for real-time data
        const interval = setInterval(() => {
            fetchData();
            setLastUpdated(new Date());
        }, 30000);

        return () => clearInterval(interval);
    },[]);

    return{

        summary,

        loading,

        lastUpdated

    };

}