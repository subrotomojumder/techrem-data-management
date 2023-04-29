import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'January',
        Expenses: 4000,
        Sales: 2400,
        amt: 2400,
    },
    {
        name: 'February',
        Expenses: 3000,
        Sales: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        Expenses: 2000,
        Sales: 9800,
        amt: 2290,
    },
    {
        name: 'April',
        Expenses: 2780,
        Sales: 3908,
        amt: 2000,
    },
    {
        name: ' May',
        Expenses: 1890,
        Sales: 4800,
        amt: 2181,
    },
    {
        name: 'June',
        Expenses: 2390,
        Sales: 3800,
        amt: 2500,
    },
    {
        name: 'July',
        Expenses: 3490,
        Sales: 4300,
        amt: 2100,
    },
];
const Chart = () => {
    return (
        <div className='h-72 xl:h-[400px] w-[100%] py-4 my-2 border-2 bg-blue-200'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 5,
                        bottom: 1,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Sales" fill="#8884d8" />
                    <Bar dataKey="Expenses" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
