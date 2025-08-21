
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';

interface OutcomeData {
  treatment: string;
  metric: string;
  value: number;
  confidenceInterval?: [number, number];
  studySize?: number;
  followUpTime?: string;
  evidenceLevel?: string;
  reference?: string;
}

interface ComparisonMetric {
  id: string;
  name: string;
  unit: string;
  description: string;
  higherIsBetter: boolean;
  color: string;
}

interface TreatmentOption {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string;
  category: string;
}

interface OutcomesChartProps {
  title?: string;
  cancerType: string;
  stage?: string;
  treatments: TreatmentOption[];
  metrics: ComparisonMetric[];
  data: OutcomeData[];
  selectedMetric?: string;
  selectedTreatments?: string[];
  showConfidenceIntervals?: boolean;
  chartType?: 'bar' | 'line' | 'forest';
  className?: string;
  onTreatmentToggle?: (treatmentId: string) => void;
  onMetricChange?: (metricId: string) => void;
}

const OutcomesChart: React.FC<OutcomesChartProps> = ({
  title = "Treatment Outcomes Comparison",
  cancerType,
  stage,
  treatments,
  metrics,
  data,
  selectedMetric = metrics[0]?.id,
  selectedTreatments = treatments.map(t => t.id),
  showConfidenceIntervals = true,
  chartType = 'bar',
  className = '',
  onTreatmentToggle,
  onMetricChange
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'absolute' | 'relative'>('absolute');
  const [currentChartType, setChartType] = useState<'bar' | 'line' | 'forest'>(chartType);

  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 60, left: 80 };

  const currentMetric = useMemo(() => 
    metrics.find(m => m.id === selectedMetric) || metrics[0],
    [metrics, selectedMetric]
  );

  const filteredData = useMemo(() => {
    return data.filter(d => 
      d.metric === selectedMetric && 
      selectedTreatments.includes(d.treatment)
    );
  }, [data, selectedMetric, selectedTreatments]);

  const chartData = useMemo(() => {
    return filteredData.map(d => {
      const treatment = treatments.find(t => t.id === d.treatment);
      return {
        ...d,
        treatmentName: treatment?.name || d.treatment,
        treatmentColor: treatment?.color || '#6b7280'
      };
    });
  }, [filteredData, treatments]);

  useEffect(() => {
    if (!svgRef.current || chartData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    if (currentChartType === 'bar') {
      const xScale = d3.scaleBand()
        .domain(chartData.map(d => d.treatmentName))
        .range([0, innerWidth])
        .padding(0.2);

      const yExtent = d3.extent(chartData, d => d.value) as [number, number];
      const yScale = d3.scaleLinear()
        .domain([0, Math.max(yExtent[1] * 1.1, 100)])
        .range([innerHeight, 0]);

      const bars = g.selectAll(".bar")
        .data(chartData)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", d => `translate(${xScale(d.treatmentName)},0)`);

      bars.append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.value))
        .attr("y", d => yScale(d.value))
        .attr("fill", d => d.treatmentColor)
        .attr("opacity", 0.8)
        .attr("rx", 4)
        .on("mouseover", function(event, d) {
          setHoveredBar(d.treatment);
          d3.select(this).attr("opacity", 1);
        })
        .on("mouseout", function() {
          setHoveredBar(null);
          d3.select(this).attr("opacity", 0.8);
        });

      if (showConfidenceIntervals) {
        bars.each(function(d) {
          if (!d.confidenceInterval) return;
          
          const x = xScale.bandwidth() / 2;
          const [lower, upper] = d.confidenceInterval;
          
          d3.select(this)
            .append("line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", yScale(lower))
            .attr("y2", yScale(upper))
            .attr("stroke", "#374151")
            .attr("stroke-width", 2);
          
          d3.select(this)
            .append("line")
            .attr("x1", x - 5)
            .attr("x2", x + 5)
            .attr("y1", yScale(lower))
            .attr("y2", yScale(lower))
            .attr("stroke", "#374151")
            .attr("stroke-width", 2);
          
          d3.select(this)
            .append("line")
            .attr("x1", x - 5)
            .attr("x2", x + 5)
            .attr("y1", yScale(upper))
            .attr("y2", yScale(upper))
            .attr("stroke", "#374151")
            .attr("stroke-width", 2);
        });
      }

      bars.append("text")
        .attr("x", xScale.bandwidth() / 2)
        .attr("y", d => yScale(d.value) - 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .attr("fill", "#374151")
        .text(d => `${d.value}${currentMetric.unit}`);

      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)")
        .attr("font-size", "12px");

      g.append("g")
        .call(d3.axisLeft(yScale))
        .attr("font-size", "12px");

      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (innerHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .text(`${currentMetric.name} (${currentMetric.unit})`);
    }

  }, [chartData, currentMetric, showConfidenceIntervals, currentChartType, width, height, margin]);

  const toggleTreatment = (treatmentId: string) => {
    onTreatmentToggle?.(treatmentId);
  };

  const changeMetric = (metricId: string) => {
    onMetricChange?.(metricId);
  };

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-600">
          <span><strong>Cancer Type:</strong> {cancerType}</span>
          {stage && <span><strong>Stage:</strong> {stage}</span>}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Metric:</label>
              <select
                value={selectedMetric}
                onChange={(e) => changeMetric(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {metrics.map(metric => (
                  <option key={metric.id} value={metric.id}>
                    {metric.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Chart Type:</label>
              <select
                value={currentChartType}
                onChange={(e) => setChartType(e.target.value as 'bar' | 'line' | 'forest')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="forest">Forest Plot</option>
              </select>
            </div>
          </div>

          {currentMetric && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>{currentMetric.name}:</strong> {currentMetric.description}
                {currentMetric.higherIsBetter ? " (Higher values indicate better outcomes)" : " (Lower values indicate better outcomes)"}
              </p>
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Treatments to Compare:</h4>
            <div className="flex flex-wrap gap-2">
              {treatments.map(treatment => (
                <motion.button
                  key={treatment.id}
                  onClick={() => toggleTreatment(treatment.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border-2 transition-all ${
                    selectedTreatments.includes(treatment.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {treatment.shortName}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="border border-gray-200 rounded"
            viewBox={`0 0 ${width} ${height}`}
          />
        </div>

        {hoveredBar && (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-sm">
              {(() => {
                const data = chartData.find(d => d.treatment === hoveredBar);
                if (!data) return null;
                return (
                  <div>
                    <div className="font-medium">{data.treatmentName}</div>
                    <div className="text-gray-600">
                      {currentMetric.name}: {data.value}{currentMetric.unit}
                      {data.confidenceInterval && (
                        <span className="ml-2">
                          (95% CI: {data.confidenceInterval[0]}-{data.confidenceInterval[1]})
                        </span>
                      )}
                    </div>
                    {data.studySize && (
                      <div className="text-gray-500 text-xs">Study size: {data.studySize} patients</div>
                    )}
                    {data.followUpTime && (
                      <div className="text-gray-500 text-xs">Follow-up: {data.followUpTime}</div>
                    )}
                    {data.evidenceLevel && (
                      <div className="text-gray-500 text-xs">Evidence level: {data.evidenceLevel}</div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Treatment Details</h5>
            <div className="space-y-1">
              {treatments.filter(t => selectedTreatments.includes(t.id)).map(treatment => (
                <div key={treatment.id} className="flex items-start space-x-2">
                  <div 
                    className="w-3 h-3 rounded mt-0.5"
                    style={{ backgroundColor: treatment.color }}
                  />
                  <div>
                    <div className="font-medium">{treatment.name}</div>
                    <div className="text-gray-600">{treatment.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Data Sources</h5>
            <div className="space-y-1 text-gray-600">
              {chartData.map((d, index) => d.reference && (
                <div key={index}>• {d.reference}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h6 className="text-sm font-semibold text-yellow-800 mb-1">Clinical Decision Notice</h6>
                <p className="text-xs text-yellow-700">
                  These outcome comparisons are for educational purposes and should not replace individual 
                  clinical assessment. Treatment decisions should always be made in consultation with qualified 
                  oncologists considering patient-specific factors, comorbidities, and preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OutcomesChart;
