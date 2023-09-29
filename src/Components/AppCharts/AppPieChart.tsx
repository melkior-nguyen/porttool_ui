import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function AppPieChart() {
    const data = {
        labels: ['Email', 'Sms', 'Telegram', 'Skype', 'Zalo', 'Messenger'],
        datasets: [
            {
                label: '',
                data:  [10, 8, 3, 7, 2, 3],
                backgroundColor: [
                    '#d138f9',
                    '#3bf938',
                    '#5ea2f4',
                    '#5ecdf4',
                    '#5ef4dc',
                    '#5e7ef4'
                ],
                borderColor: [
                    '#d138f9',
                    '#3bf938',
                    '#5ea2f4',
                    '#5ecdf4',
                    '#5ef4dc',
                    '#5e7ef4'
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Pie data={data} />
    )
}

export default AppPieChart
