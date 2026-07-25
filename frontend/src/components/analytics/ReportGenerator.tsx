import { useState } from 'react';
import { FileText, Download, Calendar, Filter, FileSpreadsheet, Printer, Share2 } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { exportCrimeData } from '../../api/crime';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

export default function ReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'crime-statistics',
      name: 'Crime Statistics Report',
      description: 'Comprehensive overview of crime statistics with trends and analysis',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'district-analysis',
      name: 'District-wise Analysis',
      description: 'Detailed crime analysis by district with comparative data',
      icon: <FileSpreadsheet className="w-5 h-5" />,
    },
    {
      id: 'monthly-summary',
      name: 'Monthly Summary',
      description: 'Monthly crime summary with year-over-year comparisons',
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 'officer-performance',
      name: 'Officer Performance',
      description: 'Performance metrics for police officers and stations',
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const districts = ['Bengaluru Urban', 'Mysuru', 'Belagavi', 'Dharwad', 'Shivamogga'];
  const categories = ['Theft', 'Robbery', 'Assault', 'Fraud', 'Cyber Crime', 'Murder'];

  const handleGenerateReport = async () => {
    if (!selectedTemplate) {
      alert('Please select a report template');
      return;
    }

    setIsGenerating(true);

    try {
      // Use real API to export crime data
      await exportCrimeData();
      alert('Crime data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleDistrict = (district: string) => {
    setSelectedDistricts(prev =>
      prev.includes(district)
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Automated Report Generation
          </h2>
          <p className="text-sm text-gray-400 mt-1">Generate PDF and Excel reports with crime analytics data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={Printer} iconPosition="left">
            Print Preview
          </Button>
          <Button variant="outline" icon={Share2} iconPosition="left">
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Report Templates</h3>
          <div className="space-y-3">
            {reportTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'bg-cyan-500/20 border-cyan-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    selectedTemplate === template.id ? 'bg-cyan-500/30' : 'bg-white/10'
                  }`}>
                    {template.icon}
                  </div>
                  <span className="text-white font-medium">{template.name}</span>
                </div>
                <p className="text-sm text-gray-400">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date Range */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </h3>
            <div className="flex gap-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range as any)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    dateRange === range
                      ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : range === '90d' ? 'Last 90 Days' : 'Last Year'}
                </button>
              ))}
            </div>
          </div>

          {/* District Filter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Districts
            </h3>
            <div className="flex flex-wrap gap-2">
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => toggleDistrict(district)}
                  className={`px-3 py-2 rounded-lg border transition-all ${
                    selectedDistricts.includes(district)
                      ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>

          {/* Crime Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Crime Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-2 rounded-lg border transition-all ${
                    selectedCategories.includes(category)
                      ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Buttons */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button
              variant="primary"
              icon={Download}
              iconPosition="left"
              onClick={() => handleGenerateReport()}
              disabled={isGenerating || !selectedTemplate}
              className="flex-1"
            >
              {isGenerating ? 'Generating...' : 'Export Crime Data (CSV)'}
            </Button>
          </div>

          {/* Report Preview */}
          {selectedTemplate && (
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-white/10">
              <h4 className="text-white font-semibold mb-3">Report Preview</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Template:</span>
                  <span className="text-white">{reportTemplates.find(t => t.id === selectedTemplate)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date Range:</span>
                  <span className="text-white">{dateRange === '7d' ? 'Last 7 Days' : dateRange === '30d' ? 'Last 30 Days' : dateRange === '90d' ? 'Last 90 Days' : 'Last Year'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Districts:</span>
                  <span className="text-white">{selectedDistricts.length > 0 ? selectedDistricts.join(', ') : 'All Districts'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Categories:</span>
                  <span className="text-white">{selectedCategories.length > 0 ? selectedCategories.join(', ') : 'All Categories'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Pages:</span>
                  <span className="text-white">~12-15 pages</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Reports</h3>
        <div className="space-y-2">
          {[
            { name: 'Crime Statistics - January 2024', date: '2024-01-31', format: 'PDF', size: '2.4 MB' },
            { name: 'District Analysis - Q4 2023', date: '2024-01-15', format: 'Excel', size: '1.8 MB' },
            { name: 'Monthly Summary - December 2023', date: '2024-01-02', format: 'PDF', size: '3.1 MB' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${report.format === 'PDF' ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                  {report.format === 'PDF' ? <FileText className="w-4 h-4 text-red-400" /> : <FileSpreadsheet className="w-4 h-4 text-green-400" />}
                </div>
                <div>
                  <p className="text-white font-medium">{report.name}</p>
                  <p className="text-xs text-gray-400">{report.date} • {report.size}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" icon={Download} iconPosition="left">
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
