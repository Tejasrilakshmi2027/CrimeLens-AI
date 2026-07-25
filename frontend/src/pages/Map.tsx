import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { useAuth } from '../contexts/AuthContext';
import type { CrimeLocation } from '../types';
import 'leaflet/dist/leaflet.css';

// Component to fit bounds when locations change
const MapBounds = ({ locations }: { locations: CrimeLocation[] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map(loc => [loc.latitude, loc.longitude] as [number, number]);
      // Use fitBounds with padding to ensure all markers are visible
      map.fitBounds(bounds, { 
        padding: [80, 80], 
        maxZoom: 9,
        animate: true 
      });
    }
  }, [locations, map]);
  
  return null;
};

const MapPage = () => {
  const { token } = useAuth();
  const [crimeLocations, setCrimeLocations] = useState<CrimeLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    const fetchCrimeLocations = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/crime/locations', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setCrimeLocations(data);
        } else {
          // Fallback to sample data if API fails
          setCrimeLocations([
            {
              id: '1',
              crime_number: 'CR2024001',
              crime_type: 'Theft',
              latitude: 12.9716,
              longitude: 77.5946,
              district: 'Bangalore Urban',
              status: 'Pending',
              date: '2024-01-15',
            },
            {
              id: '2',
              crime_number: 'CR2024002',
              crime_type: 'Assault',
              latitude: 13.0827,
              longitude: 80.2707,
              district: 'Chennai',
              status: 'Solved',
              date: '2024-01-16',
            },
            {
              id: '3',
              crime_number: 'CR2024003',
              crime_type: 'Fraud',
              latitude: 12.9141,
              longitude: 74.8560,
              district: 'Mangalore',
              status: 'In Progress',
              date: '2024-01-17',
            },
            {
              id: '4',
              crime_number: 'CR2024004',
              crime_type: 'Robbery',
              latitude: 12.3052,
              longitude: 76.6494,
              district: 'Mysore',
              status: 'Pending',
              date: '2024-01-18',
            },
            {
              id: '5',
              crime_number: 'CR2024005',
              crime_type: 'Theft',
              latitude: 15.4909,
              longitude: 74.4876,
              district: 'Belgaum',
              status: 'Solved',
              date: '2024-01-19',
            },
            {
              id: '6',
              crime_number: 'CR2024006',
              crime_type: 'Assault',
              latitude: 13.3409,
              longitude: 77.1009,
              district: 'Tumkur',
              status: 'In Progress',
              date: '2024-01-20',
            },
            {
              id: '7',
              crime_number: 'CR2024007',
              crime_type: 'Fraud',
              latitude: 14.7148,
              longitude: 75.9657,
              district: 'Davangere',
              status: 'Closed',
              date: '2024-01-21',
            },
            {
              id: '8',
              crime_number: 'CR2024008',
              crime_type: 'Robbery',
              latitude: 12.9689,
              longitude: 77.6006,
              district: 'Bangalore Urban',
              status: 'Pending',
              date: '2024-01-22',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch crime locations:', error);
        // Fallback to sample data
        setCrimeLocations([
          {
            id: '1',
            crime_number: 'CR2024001',
            crime_type: 'Theft',
            latitude: 12.9716,
            longitude: 77.5946,
            district: 'Bangalore Urban',
            status: 'Pending',
            date: '2024-01-15',
          },
          {
            id: '2',
            crime_number: 'CR2024002',
            crime_type: 'Assault',
            latitude: 13.0827,
            longitude: 80.2707,
            district: 'Chennai',
            status: 'Solved',
            date: '2024-01-16',
          },
          {
            id: '3',
            crime_number: 'CR2024003',
            crime_type: 'Fraud',
            latitude: 12.9141,
            longitude: 74.8560,
            district: 'Mangalore',
            status: 'In Progress',
            date: '2024-01-17',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCrimeLocations();
    }
  }, [token]);

  const getMarkerColor = (status: string, isImportant: boolean = false) => {
    const colors: Record<string, string> = {
      Pending: '#F59E0B',
      'In Progress': '#06B6D4',
      Solved: '#22C55E',
      Closed: '#6B7280',
    };
    
    // Important cases get a red accent
    if (isImportant) {
      return '#EF4444';
    }
    
    return colors[status] || '#EF4444';
  };

  const getMarkerRadius = (isImportant: boolean = false) => {
    return isImportant ? 12 : 8;
  };

  const filteredLocations = selectedFilter === 'all' 
    ? crimeLocations 
    : crimeLocations.filter(loc => loc.status === selectedFilter);

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
          <h1 className="text-3xl font-bold text-white mb-2">Crime Map</h1>
          <p className="text-gray-400">Geographic visualization of crime incidents across Karnataka</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-[#06B6D4]/50 focus:outline-none text-white"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Solved">Solved</option>
            <option value="Closed">Closed</option>
          </select>
          <Button variant="outline" icon={Layers} iconPosition="left">
            Layers
          </Button>
        </div>
      </div>

      <Card className="!p-0 !overflow-hidden">
        <div className="h-[600px] w-full">
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={8}
            style={{ height: '100%', width: '100%' }}
            className="bg-[#0F172A]"
          >
            <MapBounds locations={filteredLocations} />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {filteredLocations.map((location) => (
              <CircleMarker
                key={location.id}
                center={[location.latitude, location.longitude]}
                radius={getMarkerRadius(location.isImportant)}
                pathOptions={{
                  color: getMarkerColor(location.status, location.isImportant),
                  fillColor: getMarkerColor(location.status, location.isImportant),
                  fillOpacity: location.isImportant ? 0.9 : 0.7,
                  weight: location.isImportant ? 3 : 2,
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-[#0F172A]">{location.crime_type}</h3>
                      {location.isImportant && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                          IMPORTANT
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Crime No:</strong> {location.crime_number}</p>
                      <p><strong>District:</strong> {location.district}</p>
                      <p><strong>Status:</strong> 
                        <span 
                          className="ml-1 px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: `${getMarkerColor(location.status, location.isImportant)}20`,
                            color: getMarkerColor(location.status, location.isImportant),
                          }}
                        >
                          {location.status}
                        </span>
                      </p>
                      <p><strong>Date:</strong> {location.date}</p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['Pending', 'In Progress', 'Solved', 'Closed'].map((status) => (
          <Card key={status} className="!p-4">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getMarkerColor(status) }}
              />
              <div>
                <p className="text-sm text-gray-400">{status}</p>
                <p className="text-xl font-bold text-white">
                  {crimeLocations.filter((loc) => loc.status === status).length}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default MapPage;
