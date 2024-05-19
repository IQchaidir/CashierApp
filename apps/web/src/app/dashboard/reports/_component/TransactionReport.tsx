import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const TransactionReport = ({ dataSales }: { dataSales: any }) => {
    let labels;
    let data;
    if (dataSales) {
        labels = dataSales.map((item: any) => item.date);
        data = dataSales.map((item: any) => item.totalAmount);
    } else {
        labels = ['tidak ada penjualan'];
        data = [0];
    }

    return (
        <div className="App">
            <div className="dataCard revenueCard   w-[900px]">
                <Line
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total Sales Amount',
                                data: data,
                                backgroundColor: '#064FF0',
                                borderColor: '#064FF0',
                            },
                        ],
                    }}
                    options={{
                        elements: {
                            line: {
                                tension: 0.5,
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Total Sales Amount',
                                font: {
                                    size: 16,
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default TransactionReport;
