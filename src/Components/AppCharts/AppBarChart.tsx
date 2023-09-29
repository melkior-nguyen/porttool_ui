import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2'
import { appColor } from '../../AppColor';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function AppBarChart() {
    const options = {
        scales: {
            x: {
                grid: {
                    display: false, // Tắt lưới dọc (trục y)
                    color: 'red',
                    tickColor: 'red'
                },
                ticks: {
                    color: appColor.text.main,
                },
            },
            y: {
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.00)',
                },
                ticks: {
                },
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true, // tắt label
            },
        },
    };
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Fail',
                data: [2, 1, 2, 3, 4, 2, 1],
                backgroundColor: '#bf0000',
            },
            {
                label: 'Pass',
                data: [7, 5, 8, 9, 6, 11, 4],
                backgroundColor: '#005169',
            },
        ],
    };
    return (
        <Bar options={options} data={data} />
    )
}

export default AppBarChart
