// src/pages/JobAnalysis/components/SkillMatchChart/SkillMatchChart.tsx
import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface SkillMatchChartProps {
  matchedSkills: number;
  totalSkills: number;
  matchPercentage: number;
}

const SkillMatchChart: React.FC<SkillMatchChartProps> = ({
  matchedSkills,
  totalSkills,
  matchPercentage,
}) => {
  const data = [
    { name: "Matched Skills", value: matchedSkills },
    { name: "Missing Skills", value: totalSkills - matchedSkills },
  ];

  const COLORS = ["#4caf50", "#f44336"];

  return (
    <Paper sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Skills Match
      </Typography>

      <Box sx={{ height: 200, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Typography variant="h4" sx={{ mt: 1 }} color="primary">
        {matchPercentage}%
      </Typography>
      <Typography variant="body2" color="text.secondary">
        of required skills matched
      </Typography>
    </Paper>
  );
};

export default SkillMatchChart;
