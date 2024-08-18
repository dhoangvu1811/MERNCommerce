import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ renderActiveShape, order }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    const convertDataChart = (data, type) => {
        const result = [];
        //duyệt qua mảng data, nếu item[type] chưa tồn tại trong mảng result thì thêm vào mảng result với value = 1, nếu đã tồn tại thì tăng value lên 1
        data.forEach((item) => {
            const index = result.findIndex((x) => x.name === item[type]);
            if (index === -1) {
                result.push({ name: item[type], value: 1 });
            } else {
                result[index].value++;
            }
        });
        return result;
    };
    const dataChart = convertDataChart(order.data, 'paymentMethod');
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={400} height={400}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={dataChart}
                    cx='50%'
                    cy='50%'
                    innerRadius={60}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ChartComponent;
