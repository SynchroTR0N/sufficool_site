
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';

interface DosePoint {
  x: number;
  y: number;
  z: number;
  dose: number; // In Gy
  organType?: string;
}

interface Organ {
  id: string;
  name: string;
  type: 'target' | 'oar' | 'normal'; // target volume, organ at risk, normal tissue
  color: string;
  opacity: number;
  maxDose?: number;
  meanDose?: number;
  volume?: number; // in cc
  constraint?: string;
}

interface DoseVolumePoint {
  volume: number; // percentage 0-100
  dose: number; // in Gy
  organId: string;
}

interface DoseDistributionProps {
  title?: string;
  dosePoints: DosePoint[];
  organs: Organ[];
  doseVolumeData: DoseVolumePoint[];
  maxDose: number;
  prescriptionDose: number;
  className?: string;
  showDVH?: boolean;
  showIsodoses?: boolean;
  view?: '2d' | '3d';
}

const DoseDistribution: React.FC<DoseDistributionProps> = ({
  title = "Dose Distribution",
  dosePoints,
  organs,
  doseVolumeData,
  maxDose,
  prescriptionDose,
  className = '',
  showDVH = true,
  showIsodoses = true,
  view = '2d'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dvhRef = useRef<SVGSVGElement>(null);
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [currentSlice, setCurrentSlice] = useState(0);
  const [doseOpacity, setDoseOpacity] = useState(0.7);

  const width = 400;
  const height = 400;
  const dvhWidth = 350;
  const dvhHeight = 250;

  // Create dose color scale
  const doseColorScale = useMemo(() => {
    return d3.scaleSequential(d3.interpolateViridis)
      .domain([0, maxDose]);
  }, [maxDose]);

  // Calculate isodose levels
  const isodoseLevels = useMemo(() => {
    const levels = [];
    const increment = prescriptionDose * 0.1; // 10% increments
    for (let i = 0.1; i <= 1.2; i += 0.1) {
      levels.push({
        level: i,
        dose: prescriptionDose * i,
        color: doseColorScale(prescriptionDose * i),
        label: `${(i * 100).toFixed(0)}%`
      });
    }
    return levels;
  }, [prescriptionDose, doseColorScale]);

  // Filter dose points for current slice (for 2D view)
  const currentSliceData = useMemo(() => {
    const sliceThickness = 5; // mm
    return dosePoints.filter(point => 
      Math.abs(point.z - currentSlice) <= sliceThickness
    );
  }, [dosePoints, currentSlice]);

  // Calculate organ statistics
  const organStats = useMemo(() => {
    return organs.map(organ => {
      const organData = doseVolumeData.filter(d => d.organId === organ.id);
      const maxDose = Math.max(...organData.map(d => d.dose));
      const meanDose = organData.reduce((sum, d) => sum + d.dose, 0) / organData.length;
      
      // Calculate V95, V107, etc. based on prescription dose
      const v95 = organData.filter(d => d.dose >= prescriptionDose * 0.95).length / organData.length * 100;
      const v107 = organData.filter(d => d.dose >= prescriptionDose * 1.07).length / organData.length * 100;
      
      return {
        ...organ,
        maxDose: maxDose || 0,
        meanDose: meanDose || 0,
        v95,
        v107
      };
    });
  }, [organs, doseVolumeData, prescriptionDose]);

  // Render 2D dose distribution
  useEffect(() => {
    if (!svgRef.current || view !== '2d') return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xExtent = d3.extent(currentSliceData, d => d.x) as [number, number];
    const yExtent = d3.extent(currentSliceData, d => d.y) as [number, number];
    
    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([innerHeight, 0]);

    // Draw dose points
    g.selectAll(".dose-point")
      .data(currentSliceData)
      .enter()
      .append("circle")
      .attr("class", "dose-point")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 2)
      .attr("fill", d => doseColorScale(d.dose))
      .attr("opacity", doseOpacity);

    // Draw isodose lines if enabled
    if (showIsodoses) {
      isodoseLevels.forEach(level => {
        const contourData = currentSliceData.filter(d => 
          Math.abs(d.dose - level.dose) <= level.dose * 0.05
        );
        
        g.selectAll(`.isodose-${level.level}`)
          .data(contourData)
          .enter()
          .append("circle")
          .attr("class", `isodose-${level.level}`)
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
          .attr("r", 1.5)
          .attr("fill", "none")
          .attr("stroke", level.color)
          .attr("stroke-width", 2)
          .attr("opacity", 0.8);
      });
    }

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 35)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("X (mm)");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("x", -innerHeight / 2)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("Y (mm)");

  }, [currentSliceData, xScale, yScale, doseColorScale, doseOpacity, showIsodoses, isodoseLevels, view]);

  // Render Dose-Volume Histogram
  useEffect(() => {
    if (!dvhRef.current || !showDVH) return;

    const svg = d3.select(dvhRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = dvhWidth - margin.left - margin.right;
    const innerHeight = dvhHeight - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, maxDose])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);

    // Group data by organ
    const organGroups = d3.group(doseVolumeData, d => d.organId);

    // Create line generator
    const line = d3.line<DoseVolumePoint>()
      .x(d => xScale(d.dose))
      .y(d => yScale(d.volume))
      .curve(d3.curveMonotoneX);

    // Draw DVH curves for each organ
    organGroups.forEach((data, organId) => {
      const organ = organs.find(o => o.id === organId);
      if (!organ) return;

      const sortedData = data.sort((a, b) => a.dose - b.dose);
      
      g.append("path")
        .datum(sortedData)
        .attr("fill", "none")
        .attr("stroke", organ.color)
        .attr("stroke-width", selectedOrgan === organId ? 3 : 2)
        .attr("opacity", selectedOrgan && selectedOrgan !== organId ? 0.3 : 1)
        .attr("d", line)
        .style("cursor", "pointer")
        .on("click", () => setSelectedOrgan(selectedOrgan === organId ? null : organId));
    });

    // Add prescription dose line
    g.append("line")
      .attr("x1", xScale(prescriptionDose))
      .attr("x2", xScale(prescriptionDose))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#ef4444")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    // Add axes
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", 35)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("Dose (Gy)");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -35)
      .attr("x", -innerHeight / 2)
      .style("text-anchor", "middle")
      .style("fill", "black")
      .text("Volume (%)");

  }, [doseVolumeData, organs, maxDose, prescriptionDose, selectedOrgan, showDVH]);

  const maxSlice = Math.max(...dosePoints.map(p => p.z));
  const minSlice = Math.min(...dosePoints.map(p => p.z));

  return (
    <motion.div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="font-medium">Prescription:</span>
              <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                {prescriptionDose} Gy
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Max Dose:</span>
              <span className="ml-2 bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                {maxDose.toFixed(1)} Gy
              </span>
            </div>
          </div>
          
          {/* View Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView(view === '2d' ? '3d' : '2d')}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
            >
              {view === '2d' ? '3D View' : '2D View'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dose Distribution Visualization */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Dose Distribution</h4>
              
              {view === '2d' && (
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">Slice:</label>
                  <input
                    type="range"
                    min={minSlice}
                    max={maxSlice}
                    step={1}
                    value={currentSlice}
                    onChange={(e) => setCurrentSlice(parseInt(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">{currentSlice}mm</span>
                </div>
              )}
            </div>

            <div className="relative">
              <svg
                ref={svgRef}
                width={width}
                height={height}
                className="border border-gray-200 rounded"
                viewBox={`0 0 ${width} ${height}`}
              />
              
              {/* Dose opacity control */}
              <div className="mt-2 flex items-center space-x-2">
                <label className="text-xs text-gray-600">Opacity:</label>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.1}
                  value={doseOpacity}
                  onChange={(e) => setDoseOpacity(parseFloat(e.target.value))}
                  className="w-16"
                />
                <span className="text-xs text-gray-600">{(doseOpacity * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* Dose-Volume Histogram */}
          {showDVH && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Dose-Volume Histogram</h4>
              <svg
                ref={dvhRef}
                width={dvhWidth}
                height={dvhHeight}
                className="border border-gray-200 rounded"
                viewBox={`0 0 ${dvhWidth} ${dvhHeight}`}
              />
            </div>
          )}
        </div>

        {/* Isodose Legend */}
        {showIsodoses && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h5 className="text-sm font-semibold text-gray-800 mb-3">Isodose Lines</h5>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {isodoseLevels.map((level) => (
                <div key={level.level} className="flex items-center space-x-1">
                  <div 
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: level.color }}
                  ></div>
                  <span className="text-xs text-gray-600">{level.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organ Statistics */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h5 className="text-sm font-semibold text-gray-800 mb-3">Organ Statistics</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3">Organ</th>
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Max Dose (Gy)</th>
                  <th className="text-left py-2 px-3">Mean Dose (Gy)</th>
                  <th className="text-left py-2 px-3">V95%</th>
                  <th className="text-left py-2 px-3">V107%</th>
                  <th className="text-left py-2 px-3">Constraint</th>
                </tr>
              </thead>
              <tbody>
                {organStats.map((organ) => (
                  <tr 
                    key={organ.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      selectedOrgan === organ.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedOrgan(selectedOrgan === organ.id ? null : organ.id)}
                  >
                    <td className="py-2 px-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: organ.color }}
                        ></div>
                        <span>{organ.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        organ.type === 'target' ? 'bg-green-100 text-green-800' :
                        organ.type === 'oar' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {organ.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-3">{organ.maxDose.toFixed(1)}</td>
                    <td className="py-2 px-3">{organ.meanDose.toFixed(1)}</td>
                    <td className="py-2 px-3">{organ.v95.toFixed(1)}%</td>
                    <td className="py-2 px-3">{organ.v107.toFixed(1)}%</td>
                    <td className="py-2 px-3 text-gray-600">{organ.constraint || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showIsodoses}
                onChange={(e) => setShowIsodoses(e.target.checked)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Show Isodoses</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showDVH}
                onChange={(e) => setShowDVH(e.target.checked)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Show DVH</span>
            </label>
          </div>
          
          <button
            onClick={() => {
              setSelectedOrgan(null);
              setCurrentSlice(0);
              setDoseOpacity(0.7);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
          >
            Reset View
          </button>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h6 className="text-sm font-semibold text-yellow-800 mb-1">Treatment Planning Notice</h6>
                <p className="text-xs text-yellow-700">
                  This dose distribution visualization is for educational purposes only. 
                  Actual treatment planning requires qualified medical physicists and radiation oncologists 
                  using certified treatment planning systems with proper QA procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoseDistribution;
