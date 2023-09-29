import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function AppDoughnutChart() {
    const data = {
        labels: ['Email', 'Sms', 'Telegram', 'Skype', 'Zalo', 'Messenger'],
        datasets: [
            {
                label: '# of Votes',
                data: [10, 8, 3, 7, 2, 3],
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
        <Doughnut data={data} />
    )
}

export default AppDoughnutChart
