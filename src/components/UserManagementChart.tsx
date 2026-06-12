import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", active: 520, inactive: 300 }, 
  { name: "Feb", active: 600, inactive: 400 }, 
  { name: "Mar", active: 330, inactive: 250 }, 
  { name: "Apr", active: 470, inactive: 410 }, 
  { name: "May", active: 420, inactive: 200 }, 
  { name: "Jun", active: 530, inactive: 390 }, 
  { name: "Jul", active: 460, inactive: 320 }, 
  { name: "Aug", active: 500, inactive: 350 }, 
  { name: "Sep", active: 570, inactive: 330 }, 
  { name: "Oct", active: 620, inactive: 380 }, 
  { name: "Nov", active: 480, inactive: 300 }, 
  { name: "Dec", active: 530, inactive: 280 }, 
];

export default function UserManagementChart() {
  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      <div className="w-full h-[260px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 35, bottom: 15 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 500 }} 
              dy={10}
              label={{ 
                value: "Month", 
                position: "insideBottom", 
                offset: -10, 
                style: { fill: '#A1A1AA', fontSize: 11, fontWeight: 600 } 
              }}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              domain={[0, 1000]}
              ticks={[0, 200, 400, 600, 800, 1000]}
              tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 500 }}
              dx={-5}
             
              label={{ 
                value: "Total Users", 
                angle: -90, 
                position: "insideLeft", 
                offset: -20, 
                style: { textAnchor: 'middle', fill: '#A1A1AA', fontSize: 11, fontWeight: 600 } 
              }}
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#0C0C0D', borderRadius: '12px', border: 'none', color: '#fff' }}
            />

            <Bar 
              dataKey="inactive" 
              stackId="userStack"
              fill="#A30B1E" 
              maxBarSize={28}
            />
            <Bar 
              dataKey="active" 
              stackId="userStack"
              fill="#E4E4E7" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}