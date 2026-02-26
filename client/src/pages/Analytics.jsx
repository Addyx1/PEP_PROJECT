import { useState, useEffect } from 'react';
import api from '../utils/api';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/analytics');
                setData(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div>Loading Analytics...</div>;
    if (!data) return <div>Failed to load data</div>;

    const languageChartData = {
        labels: data.languageStats.map((stat) => stat._id),
        datasets: [
            {
                label: '# of Explanations',
                data: data.languageStats.map((stat) => stat.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <div className="card">
                    <h2 className="text-xl font-bold mb-4">Total Explanations</h2>
                    <p className="font-bold" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>{data.totalExplanations}</p>
                </div>

                <div className="card">
                    <h2 className="text-xl font-bold mb-4">Language Distribution</h2>
                    <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
                        {data.languageStats.length > 0 ? (
                            <Doughnut data={languageChartData} />
                        ) : (
                            <p className="text-gray-500" style={{ alignSelf: 'center' }}>No data available</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <ul style={{ listStyle: 'none' }}>
                    {data.recentActivity.map((log) => (
                        <li key={log._id} style={{ padding: '1rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                            <div className="flex gap-4">
                                <div style={{ flex: 1 }}>
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 style={{ fontSize: '0.875rem', fontWeight: 500 }}>{log.action}</h3>
                                        <p className="text-gray-500" style={{ fontSize: '0.875rem' }}>{new Date(log.timestamp).toLocaleString()}</p>
                                    </div>
                                    <p className="text-gray-500" style={{ fontSize: '0.875rem' }}>
                                        {log.explanationId ? `Explanation: ${log.explanationId.title || 'Untitled'}` : 'System Action'}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                    {data.recentActivity.length === 0 && <p className="text-gray-500">No recent activity.</p>}
                </ul>
            </div>
        </div>
    );
};

export default Analytics;
