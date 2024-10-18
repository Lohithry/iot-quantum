import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { LayoutDashboard, Thermometer, Droplets, Wind, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface IoTData {
  timestamp: Date;
  temperature: number;
  humidity: number;
  waterFlow: number;
}

const Dashboard: React.FC = () => {
  const [iotData, setIoTData] = useState<IoTData[]>([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    generateSampleData();
    const interval = setInterval(generateSampleData, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateSampleData = () => {
    const newData: IoTData = {
      timestamp: new Date(),
      temperature: Math.random() * 30 + 10,
      humidity: Math.random() * 60 + 20,
      waterFlow: Math.random() * 10 + 1,
    };
    setIoTData(prevData => [...prevData.slice(-11), newData]);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  const temperatureData = {
    labels: iotData.map(data => format(data.timestamp, 'HH:mm:ss')),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: iotData.map(data => data.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const humidityData = {
    labels: iotData.map(data => format(data.timestamp, 'HH:mm:ss')),
    datasets: [
      {
        label: 'Humidity (%)',
        data: iotData.map(data => data.humidity),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const waterFlowData = {
    labels: iotData.map(data => format(data.timestamp, 'HH:mm:ss')),
    datasets: [
      {
        label: 'Water Flow (L/min)',
        data: iotData.map(data => data.waterFlow),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <LayoutDashboard className="mr-2" /> Quantum IoT Dashboard
          </h1>
          <button onClick={handleLogout} className="btn flex items-center">
            <LogOut className="mr-2" /> Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Thermometer className="mr-2" /> Temperature
            </h2>
            <Line options={chartOptions} data={temperatureData} />
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Droplets className="mr-2" /> Humidity
            </h2>
            <Line options={chartOptions} data={humidityData} />
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Wind className="mr-2" /> Water Flow
            </h2>
            <Bar options={chartOptions} data={waterFlowData} />
          </div>
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Quantum Output</h2>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://lohith.blob.core.windows.net/lohith-images/quantumpic.jpeg" alt="Quantum Output 1" className="w-full rounded-lg" />
              <img src="https://lohith.blob.core.windows.net/lohith-images/1%20image.jpeg" alt="Quantum Output 2" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;