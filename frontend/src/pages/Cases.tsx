import { motion } from 'framer-motion';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { PaginationModule } from 'ag-grid-community';
import { RowSelectionModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useEffect, useState, useRef } from 'react';
import Card from '../components/common/Card';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import { Download, Filter } from 'lucide-react';
import type { Case } from '../types';
import { getStatusColor, formatDate } from '../utils/formatters';

export default function Cases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<AgGridReact>(null);

  // Register AG Grid modules once on mount
  useEffect(() => {
    try {
      ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule, RowSelectionModule]);
    } catch (e) {
      // Modules might already be registered
      console.debug('AG Grid modules already registered');
    }
  }, []);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('https://crimelens-ai-wg4k.onrender.com/api/crime/cases', {
          headers: token ? {
            'Authorization': `Bearer ${token}`,
          } : {},
        });
        
        if (response.ok) {
          const data = await response.json();
          setCases(data);
        } else {
          console.error('Failed to fetch cases:', response.status);
          // Set fallback data if API fails
          setCases([
            {
              id: '1',
              crime_number: 'CR2024001',
              case_number: 'CASE-2024-001',
              crime_type: 'Theft',
              district: 'Bengaluru Urban',
              station: 'Central',
              officer: 'Rajesh Kumar',
              status: 'Pending',
              date: '2024-01-15',
            },
            {
              id: '2',
              crime_number: 'CR2024002',
              case_number: 'CASE-2024-002',
              crime_type: 'Assault',
              district: 'Mysuru',
              station: 'North',
              officer: 'Sunita Sharma',
              status: 'Solved',
              date: '2024-01-16',
            },
            {
              id: '3',
              crime_number: 'CR2024003',
              case_number: 'CASE-2024-003',
              crime_type: 'Fraud',
              district: 'Belagavi',
              station: 'West',
              officer: 'Ramesh Gupta',
              status: 'In Progress',
              date: '2024-01-17',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch cases:', error);
        // Set fallback data if API fails
        setCases([
          {
            id: '1',
            crime_number: 'CR2024001',
            case_number: 'CASE-2024-001',
            crime_type: 'Theft',
            district: 'Bengaluru Urban',
            station: 'Central',
            officer: 'Rajesh Kumar',
            status: 'Pending',
            date: '2024-01-15',
          },
          {
            id: '2',
            crime_number: 'CR2024002',
            case_number: 'CASE-2024-002',
            crime_type: 'Assault',
            district: 'Mysuru',
            station: 'North',
            officer: 'Sunita Sharma',
            status: 'Solved',
            date: '2024-01-16',
          },
          {
            id: '3',
            crime_number: 'CR2024003',
            case_number: 'CASE-2024-003',
            crime_type: 'Fraud',
            district: 'Belagavi',
            station: 'West',
            officer: 'Ramesh Gupta',
            status: 'In Progress',
            date: '2024-01-17',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const columnDefs: ColDef<Case>[] = [
    {
      headerName: 'Crime Number',
      field: 'crime_number',
      cellRenderer: (params: any) => (
        <span className="font-mono text-[#06B6D4] font-medium">{params.value}</span>
      ),
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Case Number',
      field: 'case_number',
      cellRenderer: (params: any) => <span className="font-mono">{params.value}</span>,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Crime Type',
      field: 'crime_type',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'District',
      field: 'district',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Station',
      field: 'station',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Officer',
      field: 'officer',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: any) => (
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${getStatusColor(params.value)}20`,
            color: getStatusColor(params.value),
            border: `1px solid ${getStatusColor(params.value)}40`,
          }}
        >
          {params.value}
        </span>
      ),
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Date',
      field: 'date',
      cellRenderer: (params: any) => formatDate(params.value),
      sortable: true,
      filter: true,
    },
  ];

  const defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 120,
  };

  const onExportCSV = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv({
        fileName: 'crime_cases_export.csv',
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="h-[600px] flex items-center justify-center">
          <Loader size="lg" />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Case Management</h1>
          <p className="text-gray-400">View and manage all crime cases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={Filter} iconPosition="left">
            Filters
          </Button>
          <Button variant="secondary" icon={Download} iconPosition="left" onClick={onExportCSV}>
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="!p-0 !overflow-hidden">
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            rowData={cases}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination
            paginationPageSize={20}
            rowSelection="single"
            animateRows
            enableCellTextSelection
          />
        </div>
      </Card>
    </motion.div>
  );
}