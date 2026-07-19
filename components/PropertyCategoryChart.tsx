"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Property } from "@/lib/properties";

const PALETTE = [
  "#b89a5a", // gold-600
  "#1c1c1c", // luxury-charcoal
  "#d4b483", // gold-400
  "#6b6b6b", // charcoal-light
  "#f5efe6", // luxury-cream (for contrast — won't show on white bg)
  "#8a7340", // gold-800
];

interface Props {
  properties: Property[];
}

interface CategoryCount {
  category: string;
  count: number;
}

// Custom tooltip rendered for the Pie chart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { category, count } = payload[0].payload;
    return (
      <div className="bg-luxury-dark/90 border border-white/10 rounded-sm px-3 py-2 text-xs text-white shadow-lg">
        <span className="text-gold-300 font-bold uppercase tracking-wider block">
          {category}
        </span>
        <span className="text-white/70">
          {count} {count === 1 ? "listing" : "listings"}
        </span>
      </div>
    );
  }
  return null;
};

// Custom tooltip for the Bar chart
const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-luxury-dark/90 border border-white/10 rounded-sm px-3 py-2 text-xs text-white shadow-lg">
        <span className="text-gold-300 font-bold uppercase tracking-wider block">
          {label}
        </span>
        <span className="text-white/70">{payload[0].value} listings</span>
      </div>
    );
  }
  return null;
};

export default function PropertyCategoryChart({ properties }: Props) {
  const data: CategoryCount[] = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const prop of properties) {
      const cat = prop.category || "Uncategorized";
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [properties]);

  if (data.length === 0) return null;

  return (
    <div className="bg-white border border-luxury-sand/20 rounded-xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-8 mt-10">
      {/* Section header */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gold-600 uppercase block">
          PORTFOLIO ANALYTICS
        </span>
        <h2 className="font-serif text-xl font-light text-luxury-charcoal">
          Listings by Category
        </h2>
        <p className="text-xs text-luxury-charcoal/50 font-light">
          Distribution of your {properties.length} active{" "}
          {properties.length === 1 ? "estate" : "estates"} across property types.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Pie chart */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-luxury-charcoal/40 font-bold text-center mb-4">
            Category Share
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
                paddingAngle={3}
                strokeWidth={0}
              >
                {data.map((_, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={PALETTE[idx % PALETTE.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {data.map((entry, idx) => (
              <div key={entry.category} className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: PALETTE[idx % PALETTE.length] }}
                />
                <span className="text-[10px] text-luxury-charcoal/70 uppercase tracking-wider font-medium">
                  {entry.category} ({entry.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-luxury-charcoal/40 font-bold text-center mb-4">
            Count by Type
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={data}
              margin={{ top: 4, right: 16, left: -16, bottom: 0 }}
              barCategoryGap="35%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e8dfd3"
                vertical={false}
              />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 9, fill: "#8a7a6a", letterSpacing: 1, textAnchor: "middle" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 9, fill: "#8a7a6a" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(184,154,90,0.06)" }} />
              <Bar dataKey="count" name="Listings" radius={[4, 4, 0, 0]}>
                {data.map((_, idx) => (
                  <Cell
                    key={`bar-cell-${idx}`}
                    fill={PALETTE[idx % PALETTE.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
