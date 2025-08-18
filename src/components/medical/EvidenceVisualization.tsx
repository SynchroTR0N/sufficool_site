import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { EvidenceVisualizationProps, MetaAnalysisData, EvidenceQualityData, TrendData } from './types/evidence.types';

const EvidenceVisualization: React.FC<EvidenceVisualizationProps> = ({
  type,
  data,
  width = 800,
  height = 400,
  interactive = true,
  showLegend = true,
  title,
  subtitle,
  className = ''
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedDataPoint, setSelectedDataPoint] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    switch (type) {
      case 'forest-plot':
        renderForestPlot(g, data as MetaAnalysisData[], innerWidth, innerHeight);
        break;
      case 'evidence-quality':
        renderEvidenceQuality(g, data as EvidenceQualityData[], innerWidth, innerHeight);
        break;
      case 'publication-trends':
        renderPublicationTrends(g, data as TrendData[], innerWidth, innerHeight);
        break;
      case 'effect-size':
        renderEffectSize(g, data as MetaAnalysisData[], innerWidth, innerHeight);
        break;
      case 'risk-of-bias':
        renderRiskOfBias(g, data as any[], innerWidth, innerHeight);
        break;
      default:
        renderDefaultChart(g, data as any[], innerWidth, innerHeight);
    }
  }, [data, type, width, height]);

  // Forest Plot for Meta-Analysis
  const renderForestPlot = (g: any, data: MetaAnalysisData[], width: number, height: number) => {
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.studyName))
      .range([0, height])
      .paddingInner(0.2);

    const xExtent = d3.extent(data.flatMap(d => [d.lowerCI, d.upperCI])) as [number, number];
    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([0, width]);

    // Add axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(d3.axisLeft(yScale));

    // Add null line
    const nullLine = data[0]?.nullValue || 1;
    g.append("line")
      .attr("x1", xScale(nullLine))
      .attr("x2", xScale(nullLine))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#666")
      .attr("stroke-dasharray", "3,3");

    // Add confidence intervals
    g.selectAll(".confidence-interval")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "confidence-interval")
      .attr("x1", (d: MetaAnalysisData) => xScale(d.lowerCI))
      .attr("x2", (d: MetaAnalysisData) => xScale(d.upperCI))
      .attr("y1", (d: MetaAnalysisData) => yScale(d.studyName)! + yScale.bandwidth() / 2)
      .attr("y2", (d: MetaAnalysisData) => yScale(d.studyName)! + yScale.bandwidth() / 2)
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2);

    // Add effect size points
    g.selectAll(".effect-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "effect-point")
      .attr("cx", (d: MetaAnalysisData) => xScale(d.effectSize))
      .attr("cy", (d: MetaAnalysisData) => yScale(d.studyName)! + yScale.bandwidth() / 2)
      .attr("r", (d: MetaAnalysisData) => Math.sqrt(d.weight || 1) * 3)
      .attr("fill", "#2563eb")
      .attr("stroke", "#1e40af")
      .attr("stroke-width", 1)
      .style("cursor", interactive ? "pointer" : "default")
      .on("mouseover", interactive ? handleMouseOver : null)
      .on("mouseout", interactive ? handleMouseOut : null);

    // Add labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Studies");

    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Effect Size");
  };

  // Evidence Quality Assessment
  const renderEvidenceQuality = (g: any, data: EvidenceQualityData[], width: number, height: number) => {
    const categories = ['Risk of Bias', 'Inconsistency', 'Indirectness', 'Imprecision', 'Publication Bias'];
    const levels = ['Low', 'Moderate', 'High', 'Very High'];
    
    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, width])
      .paddingInner(0.1);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.studyName))
      .range([0, height])
      .paddingInner(0.1);

    const colorScale = d3.scaleOrdinal()
      .domain(levels)
      .range(['#10b981', '#f59e0b', '#ef4444', '#7c2d12']);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)");

    g.append("g")
      .call(d3.axisLeft(yScale));

    // Create heatmap cells
    categories.forEach((category, catIndex) => {
      data.forEach((study, studyIndex) => {
        const value = study.qualityAssessment[category] || 'Low';
        
        g.append("rect")
          .attr("x", xScale(category))
          .attr("y", yScale(study.studyName))
          .attr("width", xScale.bandwidth())
          .attr("height", yScale.bandwidth())
          .attr("fill", colorScale(value))
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .style("cursor", interactive ? "pointer" : "default")
          .on("mouseover", interactive ? (event: any) => {
            setSelectedDataPoint({ category, study: study.studyName, value });
            setTooltipPosition({ x: event.pageX, y: event.pageY });
          } : null)
          .on("mouseout", interactive ? () => setSelectedDataPoint(null) : null);

        // Add text labels
        g.append("text")
          .attr("x", xScale(category)! + xScale.bandwidth() / 2)
          .attr("y", yScale(study.studyName)! + yScale.bandwidth() / 2)
          .attr("dy", ".35em")
          .style("text-anchor", "middle")
          .style("font-size", "10px")
          .style("fill", value === 'Very High' ? "#fff" : "#000")
          .text(value);
      });
    });
  };

  // Publication Trends Over Time
  const renderPublicationTrends = (g: any, data: TrendData[], width: number, height: number) => {
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.year, 0)) as [Date, Date])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count) || 0])
      .range([height, 0]);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")));

    g.append("g")
      .call(d3.axisLeft(yScale));

    // Create line generator
    const line = d3.line<TrendData>()
      .x(d => xScale(new Date(d.year, 0)))
      .y(d => yScale(d.count))
      .curve(d3.curveMonotoneX);

    // Add the line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add data points
    g.selectAll(".data-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", (d: TrendData) => xScale(new Date(d.year, 0)))
      .attr("cy", (d: TrendData) => yScale(d.count))
      .attr("r", 4)
      .attr("fill", "#2563eb")
      .style("cursor", interactive ? "pointer" : "default")
      .on("mouseover", interactive ? handleMouseOver : null)
      .on("mouseout", interactive ? handleMouseOut : null);

    // Add labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Number of Publications");

    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Year");
  };

  // Effect Size Distribution
  const renderEffectSize = (g: any, data: MetaAnalysisData[], width: number, height: number) => {
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.effectSize) as [number, number])
      .range([0, width]);

    const histogram = d3.histogram<MetaAnalysisData, number>()
      .value(d => d.effectSize)
      .domain(xScale.domain() as [number, number])
      .thresholds(20);

    const bins = histogram(data);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 0])
      .range([height, 0]);

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    g.append("g")
      .call(d3.axisLeft(yScale));

    // Add bars
    g.selectAll(".bar")
      .data(bins)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: any) => xScale(d.x0))
      .attr("width", (d: any) => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
      .attr("y", (d: any) => yScale(d.length))
      .attr("height", (d: any) => height - yScale(d.length))
      .attr("fill", "#3b82f6")
      .attr("opacity", 0.7)
      .style("cursor", interactive ? "pointer" : "default")
      .on("mouseover", interactive ? handleMouseOver : null)
      .on("mouseout", interactive ? handleMouseOut : null);

    // Add labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Frequency");

    g.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom})`)
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Effect Size");
  };

  // Risk of Bias Assessment
  const renderRiskOfBias = (g: any, data: any[], width: number, height: number) => {
    // Implementation for risk of bias visualization
    // This would show traffic light plots for different bias domains
    const domains = ['Random sequence generation', 'Allocation concealment', 'Blinding of participants', 'Blinding of outcome assessment', 'Incomplete outcome data', 'Selective reporting'];
    const judgments = ['Low risk', 'Unclear risk', 'High risk'];
    
    const colorScale = d3.scaleOrdinal()
      .domain(judgments)
      .range(['#10b981', '#f59e0b', '#ef4444']);

    // Similar implementation to evidence quality but for risk of bias
    renderEvidenceQuality(g, data, width, height);
  };

  // Default chart fallback
  const renderDefaultChart = (g: any, data: any[], width: number, height: number) => {
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#6b7280")
      .text("Visualization type not supported");
  };

  const handleMouseOver = (event: any, d: any) => {
    setSelectedDataPoint(d);
    setTooltipPosition({ x: event.pageX, y: event.pageY });
  };

  const handleMouseOut = () => {
    setSelectedDataPoint(null);
  };

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="p-4 border-b border-gray-100">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Visualization */}
      <div className="p-4">
        <div className="relative">
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="w-full h-auto"
            viewBox={`0 0 ${width} ${height}`}
          />
          
          {/* Tooltip */}
          {selectedDataPoint && interactive && (
            <motion.div
              className="absolute z-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 pointer-events-none"
              style={{
                left: tooltipPosition.x - width / 2,
                top: tooltipPosition.y - height / 2
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="space-y-1">
                {Object.entries(selectedDataPoint).map(([key, value]) => (
                  <div key={key} className="flex justify-between space-x-2">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Legend */}
        {showLegend && type === 'evidence-quality' && (
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="text-sm text-gray-600">Quality Assessment:</div>
            {['Low', 'Moderate', 'High', 'Very High'].map((level, index) => (
              <div key={level} className="flex items-center space-x-1">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#7c2d12'][index] }}
                ></div>
                <span className="text-xs text-gray-600">{level}</span>
              </div>
            ))}
          </div>
        )}

        {/* Download Options */}
        <div className="mt-4 flex items-center justify-end space-x-2">
          <button
            onClick={() => {
              // Export as SVG
              const svgElement = svgRef.current;
              if (svgElement) {
                const svgData = new XMLSerializer().serializeToString(svgElement);
                const blob = new Blob([svgData], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `evidence-visualization-${type}.svg`;
                a.click();
                URL.revokeObjectURL(url);
              }
            }}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            📊 Export SVG
          </button>
          <button
            onClick={() => {
              // Export data as CSV
              if (data) {
                const csv = d3.csvFormat(data);
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `evidence-data-${type}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }
            }}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            📄 Export Data
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EvidenceVisualization;