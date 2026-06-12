import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from "recharts";

const data = [
  { name: "Jan", amount: 1800000 },
  { name: "Feb", amount: 1900000 },
  { name: "Mar", amount: 1750000 },
  { name: "Apr", amount: 2000000 },
  { name: "May", amount: 1950000 },
  { name: "Jun", amount: 1850000 },
  { name: "Jul", amount: 2100000 },
  { name: "Aug", amount: 2050000 },
  { name: "Sep", amount: 2300000 },
  { name: "Oct", amount: 2200000 },
  { name: "Nov", amount: 2500000 },
  { name: "Dec", amount: 2800000 },
];

const formatYAxis = (value: number) => {
  if (value === 8000000) return "8m";
  if (value === 4000000) return "4m";
  if (value === 2000000) return "2m";
  if (value === 1000000) return "1m";
  if (value === 500000) return "500k";
  return "0";
};

export default function MonthlySubscriptionChart() {
  return (
    <div className="w-full h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 20, right: 10, left: 40, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A30B1E" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#A30B1E" stopOpacity={0.0}/>
            </linearGradient>
          </defs>
          
         
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F1F4" />
          
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
            tickFormatter={formatYAxis}
            domain={[0, 8000000]}
            ticks={[0, 500000, 1000000, 2000000, 4000000, 8000000]}
            scale="sqrt"
            tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 500 }}
            dx={-5}
            interval={0} 
            label={{ 
              value: "Amount Made", 
              angle: -90, 
              position: "insideLeft", 
              offset: -25, 
              style: { textAnchor: 'middle', fill: '#A1A1AA', fontSize: 11, fontWeight: 600 } 
            }}
          />
          
          <Tooltip 
            contentStyle={{ backgroundColor: '#0C0C0D', borderRadius: '12px', border: 'none', color: '#fff' }}
            formatter={(value: any) => [`₦${Number(value).toLocaleString()}`, 'Amount Made']}
          />
          
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#A30B1E" 
            strokeWidth={2.5} 
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}