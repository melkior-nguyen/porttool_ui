import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement,
} from 'chart.js';
import { appColor } from '../../AppColor';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, ArcElement, Tooltip, Legend)

const createGradient = (index: number) => {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return
    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    if (index === 1) {
        gradient.addColorStop(0, '#005169')
        gradient.addColorStop(0.2, '#005169')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)')
    }
    if (index === 2) {
        gradient.addColorStop(0, '#18a495')
        gradient.addColorStop(0.2, '#18a495')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)')
    }
    return gradient
}
type lineDataType = {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        fill: boolean,
        borderColor: string,
        pointRadius?: number,
        pointHoverRadius?: number,
        pointHoverBackgroundColor?: string,
        backgroundColor: CanvasGradient | undefined,
        pointBorderColor: string,
        pointBackgroundColor: string,
        pointHoverBorderColor?: string,
        tension: number,
    }[]
}

function AppLineChart() {
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
    const data: lineDataType = {
        labels,
        datasets: [
            {
                label: 'Data 1',
                data: [80, 25, 65, 10, 100, 10, 2],
                borderColor: 'transparent',
                backgroundColor: createGradient(1),
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                pointHoverBorderColor: '#005169',
                pointHoverBackgroundColor: '#005169',
                tension: 0.5
            },
            {
                label: 'Data 2',
                data: [30, 75, 10, 40, 20, 80, 5],
                borderColor: 'transparent',
                backgroundColor: createGradient(2),
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
                pointHoverBorderColor: '#18a495',
                pointHoverBackgroundColor: '#18a495',
                tension: 0.5
            },
        ],
    };
    return (
        <Line options={options} data={data} />
    )
}

export default AppLineChart
