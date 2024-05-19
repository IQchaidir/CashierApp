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
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const ProductReport = ({ dataProduct }: { dataProduct: any }) => {
    let labels;
    let data;
    if (dataProduct) {
        labels = dataProduct.map((item: any) => item.productName);
        data = dataProduct.map((item: any) => item.count);
    } else {
        labels = ['tidak ada penjualan'];
        data = [0];
    }

    const colors = [
        'rgba(6, 79, 240, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
    ];

    return (
        <div className="App">
            <div className=" min-h-[500px] w-[900px]">
                <Bar
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                label: 'Total Sales Amount',
                                data: data,
                                backgroundColor: colors,
                                borderColor: colors,
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Total Sales Product',
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

export default ProductReport;
