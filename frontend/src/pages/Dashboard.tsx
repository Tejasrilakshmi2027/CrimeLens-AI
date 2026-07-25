import DashboardCards from "../components/dashboard/DashboardCards";

import CrimeTrend from "../components/dashboard/CrimeTrend";

import RecentCases from "../components/dashboard/RecentCases";

export default function Dashboard(){

return(

<div className="space-y-8">

<DashboardCards/>

<CrimeTrend/>

<RecentCases/>

</div>

);

}