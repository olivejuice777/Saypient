
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, LineChart, Line, ResponsiveContainer
} from 'recharts';

interface Props {
  brandColor?: string;
  logoUrl?: string;
}

const CompetitiveAnalysisToolComponent: React.FC<Props> = ({
  brandColor = "#0066CC",
  logoUrl = "https://yourdomain.com/logo.svg"
}) => {
  const [selectedMonth, setSelectedMonth] = useState('2024-02');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('monthly');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');

  const sampleMediaTypes = [
    { type: 'TV', spend: 855824, percentage: 73, color: brandColor },
    { type: 'Radio', spend: 244865, percentage: 21, color: brandColor },
    { type: 'Display', spend: 70203, percentage: 6, color: brandColor },
  ];

  
const exportPDF = () => {
  const input = document.getElementById('dashboard');
  if (input) {
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160, undefined, 'FAST');
      pdf.save('dashboard-report.pdf');
    });
  }
};


  return (
    <div style={{ fontFamily: 'Arial', padding: '1rem' }}>
      <img src={logoUrl} alt="Brand Logo" style={{ height: '50px', marginBottom: '1rem' }} />
      <button onClick={exportPDF} style={{ marginBottom: '1rem', backgroundColor: brandColor, color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '5px' }}>📄 Download PDF</button>
      <div id="dashboard">
        {/* Charts and analysis content here */}
        <h2 style={{ color: brandColor }}>Sample Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie dataKey="percentage" data={sampleMediaTypes} cx="50%" cy="50%" outerRadius={80} label>
              {sampleMediaTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompetitiveAnalysisToolComponent;
