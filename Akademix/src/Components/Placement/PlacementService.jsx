import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';

const StudentPathwayChart = () => {
  // Sample company employment data - replace with your actual data
  const data = [
    { name: 'Google', value: 135000 },
    { name: 'Microsoft', value: 181000 },
    { name: 'Apple', value: 154000 },
    { name: 'Meta', value: 58000 },
    { name: 'other', value: 140000 },
  ];
  
  // Colors for major tech companies - recognizable brand-adjacent colors
  const COLORS = ['#4285F4', '#00A4EF', '#FF9900', '#A2AAAD', '#1877F2'];
  
  // State for active index (for hover effect)
  const [activeIndex, setActiveIndex] = React.useState(null);

  // Calculate total employees
  const totalEmployees = data.reduce((sum, item) => sum + item.value, 0);

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Custom active shape for better visual feedback on hover
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <text x={cx} y={cy-20} textAnchor="middle" fill="#333" fontSize={16} fontWeight="bold">
          {payload.name}
        </text>
        <text x={cx} y={cy+5} textAnchor="middle" fill="#666" fontSize={14}>
          {formatNumber(value)} employees
        </text>
        <text x={cx} y={cy+25} textAnchor="middle" fill="#666" fontSize={14}>
          ({(percent * 100).toFixed(1)}%)
        </text>
      </g>
    );
  };

  // Responsive configuration
  const getChartDimensions = () => {
    const isMobile = window.innerWidth < 640;
    return {
      outerRadius: isMobile ? 60 : 90,
      innerRadius: isMobile ? 30 : 50
    };
  };
  
  const { outerRadius, innerRadius } = getChartDimensions();

  // Custom label renderer
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // Only show labels for segments with enough space
    if (percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.85;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#fff"
        fontWeight="bold"
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="w-full h-96 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-2 text-center  text-orange-400" >Alumini Distribution</h3>
      <div className="text-sm text-center text-gray-500 mb-6">Total Aluminies: {formatNumber(totalEmployees)}</div>
      
      <ResponsiveContainer width="100%" height="75%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [
              `${formatNumber(value)} employees (${((value / totalEmployees) * 100).toFixed(1)}%)`, 
              name
            ]}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              padding: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              border: 'none'
            }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            formatter={(value, entry) => (
              <span className={`text-sm ${activeIndex === entry.payload.index ? 'font-bold' : 'font-medium'}`}>
                {value}
              </span>
            )}
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentPathwayChart;