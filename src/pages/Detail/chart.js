import React from "react";
//yarn add recharts
import { BarChart, Bar, XAxis, Tooltip } from "recharts";


const data = [
  { name: "0", starData: 5 },
  { name: "0.5", starData: 10 },
  { name: "1", starData: 13 },
  { name: "1.5", starData: 8 },
  { name: "2", starData: 1 },
  { name: "2.5", starData: 5 },
  { name: "3", starData: 4 },
  { name: "4", starData: 17 },
  { name: "4.5", starData: 24 },
  { name: "5", starData: 20 },
];

const Chart=()=> {
  return (
    <BarChart 
    width={500} height={200} data={data}
    >
      <XAxis dataKey='name'/>
      <Tooltip 
      wrapperStyle={{width:100}}/>

      <Bar dataKey= "starData" fill="#635985" />
    </BarChart>
  );
}

export default Chart;