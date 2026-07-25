import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Search, Filter, Download, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';

interface Node {
  id: string;
  name: string;
  type: 'person' | 'case' | 'location';
  connections: number;
  risk: 'low' | 'medium' | 'high';
}

interface Link {
  source: string;
  target: string;
  type: string;
}

export default function CriminalNetwork() {
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate loading network data
    setTimeout(() => {
      const sampleNodes: Node[] = [
        { id: '1', name: 'Ramesh Kumar', type: 'person', connections: 5, risk: 'high' },
        { id: '2', name: 'Suresh Reddy', type: 'person', connections: 3, risk: 'medium' },
        { id: '3', name: 'Case #CR2024-089', type: 'case', connections: 4, risk: 'high' },
        { id: '4', name: 'Bangalore Central', type: 'location', connections: 6, risk: 'low' },
        { id: '5', name: 'Venkat Rao', type: 'person', connections: 2, risk: 'low' },
        { id: '6', name: 'Case #CR2024-092', type: 'case', connections: 3, risk: 'medium' },
        { id: '7', name: 'Mysore North', type: 'location', connections: 4, risk: 'medium' },
        { id: '8', name: 'Prakash Singh', type: 'person', connections: 4, risk: 'high' },
        { id: '9', name: 'Case #CR2024-095', type: 'case', connections: 2, risk: 'low' },
        { id: '10', name: 'Belgaum West', type: 'location', connections: 3, risk: 'low' },
      ];

      const sampleLinks: Link[] = [
        { source: '1', target: '2', type: 'associate' },
        { source: '1', target: '3', type: 'accused' },
        { source: '1', target: '4', type: 'location' },
        { source: '2', target: '5', type: 'associate' },
        { source: '2', target: '6', type: 'accused' },
        { source: '3', target: '4', type: 'location' },
        { source: '5', target: '7', type: 'location' },
        { source: '6', target: '7', type: 'location' },
        { source: '8', target: '3', type: 'witness' },
        { source: '8', target: '9', type: 'accused' },
        { source: '9', target: '10', type: 'location' },
        { source: '1', target: '8', type: 'associate' },
      ];

      setNodes(sampleNodes);
      setLinks(sampleLinks);
      setLoading(false);
    }, 1500);
  }, []);

  const getNodeColor = (type: string, risk: string) => {
    if (type === 'person') {
      return risk === 'high' ? '#EF4444' : risk === 'medium' ? '#F59E0B' : '#22C55E';
    } else if (type === 'case') {
      return '#8B5CF6';
    } else {
      return '#06B6D4';
    }
  };

  const getNodeIcon = (type: string) => {
    if (type === 'person') return '👤';
    if (type === 'case') return '📋';
    return '📍';
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Network data refreshed successfully!');
    }, 1000);
  };

  const handleExport = () => {
    const csvContent = [
      'ID,Name,Type,Connections,Risk',
      ...nodes.map(n => `"${n.id}","${n.name}","${n.type}",${n.connections},"${n.risk}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `criminal_network_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    alert('Network data exported successfully!');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Filter nodes based on search
    if (e.target.value) {
      const filtered = nodes.filter(node => 
        node.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setNodes(filtered);
    } else {
      // Reset to original data
      setLoading(true);
      setTimeout(() => {
        const sampleNodes: Node[] = [
          { id: '1', name: 'Ramesh Kumar', type: 'person', connections: 5, risk: 'high' },
          { id: '2', name: 'Suresh Reddy', type: 'person', connections: 3, risk: 'medium' },
          { id: '3', name: 'Case #CR2024-089', type: 'case', connections: 4, risk: 'high' },
          { id: '4', name: 'Bangalore Central', type: 'location', connections: 6, risk: 'low' },
          { id: '5', name: 'Venkat Rao', type: 'person', connections: 2, risk: 'low' },
          { id: '6', name: 'Case #CR2024-092', type: 'case', connections: 3, risk: 'medium' },
          { id: '7', name: 'Mysore North', type: 'location', connections: 4, risk: 'medium' },
          { id: '8', name: 'Prakash Singh', type: 'person', connections: 4, risk: 'high' },
          { id: '9', name: 'Case #CR2024-095', type: 'case', connections: 2, risk: 'low' },
          { id: '10', name: 'Belgaum West', type: 'location', connections: 3, risk: 'low' },
        ];
        setNodes(sampleNodes);
        setLoading(false);
      }, 500);
    }
  };

  const handleRiskFilter = () => {
    const filters = ['all', 'high', 'medium', 'low'];
    const currentIndex = filters.indexOf(riskFilter);
    const nextFilter = filters[(currentIndex + 1) % filters.length];
    setRiskFilter(nextFilter);
    
    if (nextFilter === 'all') {
      setLoading(true);
      setTimeout(() => {
        const sampleNodes: Node[] = [
          { id: '1', name: 'Ramesh Kumar', type: 'person', connections: 5, risk: 'high' },
          { id: '2', name: 'Suresh Reddy', type: 'person', connections: 3, risk: 'medium' },
          { id: '3', name: 'Case #CR2024-089', type: 'case', connections: 4, risk: 'high' },
          { id: '4', name: 'Bangalore Central', type: 'location', connections: 6, risk: 'low' },
          { id: '5', name: 'Venkat Rao', type: 'person', connections: 2, risk: 'low' },
          { id: '6', name: 'Case #CR2024-092', type: 'case', connections: 3, risk: 'medium' },
          { id: '7', name: 'Mysore North', type: 'location', connections: 4, risk: 'medium' },
          { id: '8', name: 'Prakash Singh', type: 'person', connections: 4, risk: 'high' },
          { id: '9', name: 'Case #CR2024-095', type: 'case', connections: 2, risk: 'low' },
          { id: '10', name: 'Belgaum West', type: 'location', connections: 3, risk: 'low' },
        ];
        setNodes(sampleNodes);
        setLoading(false);
      }, 500);
    } else {
      const filtered = nodes.filter(node => node.risk === nextFilter);
      setNodes(filtered);
    }
    alert(`Filtered by risk: ${nextFilter.toUpperCase()}`);
  };

  const handleTypeFilter = () => {
    const filters = ['all', 'person', 'case', 'location'];
    const currentIndex = filters.indexOf(typeFilter);
    const nextFilter = filters[(currentIndex + 1) % filters.length];
    setTypeFilter(nextFilter);
    
    if (nextFilter === 'all') {
      setLoading(true);
      setTimeout(() => {
        const sampleNodes: Node[] = [
          { id: '1', name: 'Ramesh Kumar', type: 'person', connections: 5, risk: 'high' },
          { id: '2', name: 'Suresh Reddy', type: 'person', connections: 3, risk: 'medium' },
          { id: '3', name: 'Case #CR2024-089', type: 'case', connections: 4, risk: 'high' },
          { id: '4', name: 'Bangalore Central', type: 'location', connections: 6, risk: 'low' },
          { id: '5', name: 'Venkat Rao', type: 'person', connections: 2, risk: 'low' },
          { id: '6', name: 'Case #CR2024-092', type: 'case', connections: 3, risk: 'medium' },
          { id: '7', name: 'Mysore North', type: 'location', connections: 4, risk: 'medium' },
          { id: '8', name: 'Prakash Singh', type: 'person', connections: 4, risk: 'high' },
          { id: '9', name: 'Case #CR2024-095', type: 'case', connections: 2, risk: 'low' },
          { id: '10', name: 'Belgaum West', type: 'location', connections: 3, risk: 'low' },
        ];
        setNodes(sampleNodes);
        setLoading(false);
      }, 500);
    } else {
      const filtered = nodes.filter(node => node.type === nextFilter);
      setNodes(filtered);
    }
    alert(`Filtered by type: ${nextFilter.toUpperCase()}`);
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
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            Criminal Relationship Network
          </h2>
          <p className="text-sm text-gray-400 mt-1">Visualize connections between suspects, cases, and locations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={ZoomIn} iconPosition="left" onClick={() => setZoom(Math.min(zoom + 0.2, 2))}>
            Zoom In
          </Button>
          <Button variant="outline" icon={ZoomOut} iconPosition="left" onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}>
            Zoom Out
          </Button>
          <Button variant="outline" icon={RefreshCw} iconPosition="left" onClick={handleRefresh}>
            Refresh
          </Button>
          <Button variant="primary" icon={Download} iconPosition="left" onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Network Visualization */}
        <div className="lg:col-span-3">
          <div 
            className="bg-slate-900/50 rounded-lg border border-white/10 relative overflow-hidden"
            style={{ height: '500px' }}
          >
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            >
              {/* Simplified network visualization */}
              <svg width="100%" height="100%" viewBox="0 0 800 500">
                {/* Links */}
                {links.map((link, index) => {
                  const sourceNode = nodes.find(n => n.id === link.source);
                  const targetNode = nodes.find(n => n.id === link.target);
                  if (!sourceNode || !targetNode) return null;
                  
                  const sourceX = (parseInt(sourceNode.id) * 80) % 700 + 50;
                  const sourceY = (parseInt(sourceNode.id) * 50) % 400 + 50;
                  const targetX = (parseInt(targetNode.id) * 80) % 700 + 50;
                  const targetY = (parseInt(targetNode.id) * 50) % 400 + 50;
                  
                  return (
                    <line
                      key={index}
                      x1={sourceX}
                      y1={sourceY}
                      x2={targetX}
                      y2={targetY}
                      stroke={link.type === 'accused' ? '#EF4444' : link.type === 'associate' ? '#F59E0B' : '#06B6D4'}
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                  const x = (parseInt(node.id) * 80) % 700 + 50;
                  const y = (parseInt(node.id) * 50) % 400 + 50;
                  
                  return (
                    <g key={node.id} onClick={() => setSelectedNode(node)}>
                      <circle
                        cx={x}
                        cy={y}
                        r={node.type === 'person' ? 25 : node.type === 'case' ? 20 : 15}
                        fill={getNodeColor(node.type, node.risk)}
                        stroke={selectedNode?.id === node.id ? '#fff' : 'transparent'}
                        strokeWidth={selectedNode?.id === node.id ? 3 : 0}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={node.type === 'person' ? 16 : 12}
                        fill="#fff"
                      >
                        {getNodeIcon(node.type)}
                      </text>
                      <text
                        x={x}
                        y={y + 40}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#9CA3AF"
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 p-3 rounded-lg border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Legend</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-300">High Risk Person</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-gray-300">Medium Risk Person</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-300">Low Risk Person</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-xs text-gray-300">Case</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-xs text-gray-300">Location</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Node Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900/50 rounded-lg border border-white/10 p-4 h-[500px] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Node Details</h3>
            
            {selectedNode ? (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Name</p>
                  <p className="text-white font-medium">{selectedNode.name}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Type</p>
                  <p className="text-white capitalize">{selectedNode.type}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Connections</p>
                  <p className="text-white">{selectedNode.connections}</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-1">Risk Level</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedNode.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                    selectedNode.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedNode.risk.toUpperCase()}
                  </span>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-2">Connected To</h4>
                  <div className="space-y-2">
                    {links
                      .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
                      .map((link, index) => {
                        const connectedId = link.source === selectedNode.id ? link.target : link.source;
                        const connectedNode = nodes.find(n => n.id === connectedId);
                        return connectedNode ? (
                          <div key={index} className="p-2 bg-white/5 rounded text-sm">
                            <p className="text-white">{connectedNode.name}</p>
                            <p className="text-xs text-gray-400 capitalize">{link.type}</p>
                          </div>
                        ) : null;
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Network className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a node to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search persons, cases, or locations..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>
        <Button variant="outline" icon={Filter} iconPosition="left" onClick={handleRiskFilter}>
          Filter by Risk ({riskFilter.toUpperCase()})
        </Button>
        <Button variant="outline" icon={Filter} iconPosition="left" onClick={handleTypeFilter}>
          Filter by Type ({typeFilter.toUpperCase()})
        </Button>
      </div>
    </Card>
  );
}
