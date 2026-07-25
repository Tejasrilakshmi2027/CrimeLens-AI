import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, AlertCircle, TrendingUp, Sparkles, Filter, Download } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';

interface SimilarCase {
  id: string;
  crimeNumber: string;
  caseNumber: string;
  similarityScore: number;
  crimeType: string;
  district: string;
  date: string;
  status: string;
  briefFacts: string;
  matchedFactors: string[];
}

export default function CaseSimilaritySearch() {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [similarCases, setSimilarCases] = useState<SimilarCase[]>([]);
  const [selectedCase, setSelectedCase] = useState<SimilarCase | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleExport = () => {
    if (similarCases.length === 0) {
      alert('No results to export. Please search for similar cases first.');
      return;
    }

    // Create CSV content
    const csvContent = [
      'Crime Number,Case Number,Similarity Score,Crime Type,District,Date,Status,Brief Facts,Matched Factors',
      ...similarCases.map(c => 
        `"${c.crimeNumber}","${c.caseNumber}",${c.similarityScore},"${c.crimeType}","${c.district}","${c.date}","${c.status}","${c.briefFacts}","${c.matchedFactors.join('; ')}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `similar_cases_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Export completed successfully!');
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    // Simulate AI similarity search
    setTimeout(() => {
      const mockResults: SimilarCase[] = [
        {
          id: '1',
          crimeNumber: 'CR2024-0045',
          caseNumber: 'CASE-2024-045',
          similarityScore: 92,
          crimeType: 'Theft',
          district: 'Bengaluru Urban',
          date: '2024-01-15',
          status: 'Solved',
          briefFacts: 'Theft of electronic goods from residential property during daytime. Suspect gained entry through unlocked window.',
          matchedFactors: ['Modus Operandi', 'Time of Day', 'Target Type', 'Entry Method'],
        },
        {
          id: '2',
          crimeNumber: 'CR2024-0032',
          caseNumber: 'CASE-2024-032',
          similarityScore: 87,
          crimeType: 'Theft',
          district: 'Bengaluru Urban',
          date: '2024-01-08',
          status: 'Pending',
          briefFacts: 'Residential burglary involving electronic equipment. Occurred between 10 AM - 2 PM.',
          matchedFactors: ['Modus Operandi', 'Time of Day', 'Location Pattern'],
        },
        {
          id: '3',
          crimeNumber: 'CR2024-0028',
          caseNumber: 'CASE-2024-028',
          similarityScore: 78,
          crimeType: 'Theft',
          district: 'Mysuru',
          date: '2024-01-05',
          status: 'Solved',
          briefFacts: 'Theft from apartment complex. Suspect posed as maintenance worker.',
          matchedFactors: ['Modus Operandi', 'Target Type'],
        },
        {
          id: '4',
          crimeNumber: 'CR2024-0019',
          caseNumber: 'CASE-2024-019',
          similarityScore: 72,
          crimeType: 'Robbery',
          district: 'Belagavi',
          date: '2023-12-28',
          status: 'Solved',
          briefFacts: 'Armed robbery at electronics store. Multiple suspects involved.',
          matchedFactors: ['Target Type', 'Crime Category'],
        },
        {
          id: '5',
          crimeNumber: 'CR2024-0012',
          caseNumber: 'CASE-2024-012',
          similarityScore: 68,
          crimeType: 'Theft',
          district: 'Bengaluru Urban',
          date: '2023-12-20',
          status: 'Closed',
          briefFacts: 'Series of thefts from residential buildings in same neighborhood.',
          matchedFactors: ['Location Pattern', 'Crime Category'],
        },
      ];

      setSimilarCases(mockResults);
      setLoading(false);
    }, 1500);
  };

  const getSimilarityColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (score >= 75) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  };

  const handleAdvancedFilters = () => {
    setShowFilters(!showFilters);
    alert('Advanced filters panel would open here. This feature allows filtering by date range, district, crime type, and similarity threshold.');
  };

  const handleViewFullCase = () => {
    if (selectedCase) {
      alert(`Viewing full case details for ${selectedCase.crimeNumber}. This would navigate to the detailed case view.`);
    }
  };

  const handleLinkCases = () => {
    if (selectedCase) {
      alert(`Linking case ${selectedCase.crimeNumber} to current investigation. This would create a relationship between cases.`);
    }
  };

  const handleCopyDetails = () => {
    if (selectedCase) {
      const details = `Crime Number: ${selectedCase.crimeNumber}\nCase Number: ${selectedCase.caseNumber}\nCrime Type: ${selectedCase.crimeType}\nDistrict: ${selectedCase.district}\nDate: ${selectedCase.date}\nStatus: ${selectedCase.status}\nBrief Facts: ${selectedCase.briefFacts}\nMatched Factors: ${selectedCase.matchedFactors.join(', ')}`;
      navigator.clipboard.writeText(details);
      alert('Case details copied to clipboard!');
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            AI-Powered Case Similarity Search
          </h2>
          <p className="text-sm text-gray-400 mt-1">Find similar cases using AI embeddings and semantic analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={Filter} iconPosition="left" onClick={handleAdvancedFilters}>
            Advanced Filters
          </Button>
          <Button variant="primary" icon={Download} iconPosition="left" onClick={handleExport}>
            Export Results
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <textarea
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter case details, crime description, or modus operandi to find similar cases..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            rows={3}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-2">
            <span className="text-xs text-gray-400">AI Model: BERT Embeddings</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">Similarity Threshold: 70%</span>
          </div>
          <Button 
            variant="primary" 
            icon={Search} 
            iconPosition="left"
            onClick={handleSearch}
            disabled={!searchQuery.trim() || loading}
          >
            {loading ? 'Analyzing...' : 'Find Similar Cases'}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader size="lg" />
          <p className="ml-4 text-gray-400">Analyzing case similarities using AI embeddings...</p>
        </div>
      )}

      {!loading && similarCases.length > 0 && (
        <div className="space-y-4">
          {/* Results Summary */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-medium">Found {similarCases.length} similar cases</span>
            </div>
            <div className="flex-1" />
            <span className="text-sm text-gray-400">
              Average similarity: {Math.round(similarCases.reduce((acc, c) => acc + c.similarityScore, 0) / similarCases.length)}%
            </span>
          </div>

          {/* Similar Cases List */}
          <div className="space-y-3">
            {similarCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedCase?.id === caseItem.id
                    ? 'bg-cyan-500/10 border-cyan-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setSelectedCase(caseItem)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-white font-medium">{caseItem.crimeNumber}</p>
                      <p className="text-sm text-gray-400">{caseItem.caseNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSimilarityColor(caseItem.similarityScore)}`}>
                      {caseItem.similarityScore}% Similar
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-400">Crime Type</p>
                    <p className="text-white text-sm">{caseItem.crimeType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">District</p>
                    <p className="text-white text-sm">{caseItem.district}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-white text-sm">{caseItem.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-white text-sm">{caseItem.status}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-1">Brief Facts</p>
                  <p className="text-gray-300 text-sm">{caseItem.briefFacts}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">Matched Factors</p>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.matchedFactors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {!loading && similarCases.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-400">No similar cases found</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting your search query or filters</p>
        </div>
      )}

      {/* Selected Case Details Panel */}
      {selectedCase && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-white/10"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Case Details: {selectedCase.crimeNumber}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Similarity Score</p>
              <p className="text-2xl font-bold text-cyan-400">{selectedCase.similarityScore}%</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-gray-400 mb-1">Case Status</p>
              <p className="text-white font-medium">{selectedCase.status}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="primary" size="sm" onClick={handleViewFullCase}>
              View Full Case
            </Button>
            <Button variant="outline" size="sm" onClick={handleLinkCases}>
              Link Cases
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyDetails}>
              Copy Details
            </Button>
          </div>
        </motion.div>
      )}
    </Card>
  );
}
