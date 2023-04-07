import React from 'react';
//yarn add recharts
import { BarChart, Bar } from 'recharts';

const data = [
  { name: '10대', starData: 5 },
  { name: '20대', starData: 10 },
  { name: '30대', starData: 13 },
  { name: '40대', starData: 8 },
  { name: '50대', starData: 1 },
];

const Chart = ({ className }) => {
  return (
    <BarChart
      width={80}
      height={60}
      data={data}
      fill="white"
      className={className}
    >
      {/*<XAxis dataKey="name" fontSize="12px" fontWeight="600" /> */}
      {/* <Tooltip wrapperStyle={{ width: 100 }} /> */}
      <Bar dataKey="starData" fill="#ff9900" />
    </BarChart>
  );
};

export default Chart;
