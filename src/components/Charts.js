import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { getCategoryLabel } from '../utils/helpers';
import { getMonth, getYear } from 'date-fns';

const COLORS = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280'];

export default function Charts({ transactions }) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const categoryData = useMemo(() => {
    const breakdown = {};
    
    transactions
      .filter(t => t.type === 'expense' && getMonth(new Date(t.date)) === currentMonth && getYear(new Date(t.date)) === currentYear)
      .forEach(t => {
        const label = getCategoryLabel(t.category, 'expense');
        breakdown[label] = (breakdown[label] || 0) + t.amount;
      });
    
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  }, [transactions, currentMonth, currentYear]);

  const monthlyData = useMemo(() => {
    const months = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[key]) {
        months[key] = { month: new Date(date.getFullYear(), date.getMonth()).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }), income: 0, expense: 0 };
      }
      
      if (t.type === 'income') {
        months[key].income += t.amount;
      } else {
        months[key].expense += t.amount;
      }
    });
    
    return Object.values(months).slice(-12);
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart - Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">Spending by Category</h3>
        
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                }}
                formatter={(value) => `₹${value.toFixed(0)}`}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center text-slate-500">
            No expense data yet
          </div>
        )}

        {/* Legend */}
        {categoryData.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-slate-700">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Line Chart - Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4">Monthly Trends</h3>
        
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" style={{ fontSize: '12px' }} />
              <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                }}
                formatter={(value) => `₹${value.toFixed(0)}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: '#EF4444', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center text-slate-500">
            No transaction data yet
          </div>
        )}
      </motion.div>
    </div>
  );
}
