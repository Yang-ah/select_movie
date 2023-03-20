import React from "react";
//yarn add recharts
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "1",
    amt: 5
  },
  {
    name: "2",
    amt: 3
  },
  {
    name: "3",
    amt: 2
  },
  {
    name: "4",
    amt: 1
  },
  {
    name: "ㅇㅁㄴ",
    amt: 4
  },
];

const Chart=()=> {
  return (
    <BarChart width={500} height={200} data={data}
    margin={{top: 25, right: 10, bottom: 15, left: 20}}>
      <XAxis dataKey='name'/>

      <Tooltip wrapperStyle={{width:100, backgroundColor:'#000000'}}/>
      <Bar dataKey="amt" fill="#635985" />
    </BarChart>
  );
}

export default Chart;