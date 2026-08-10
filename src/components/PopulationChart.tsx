import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useTheme } from '../context/ThemeContext';
import type { PopulationPoint } from '../types/population';

interface PopulationChartProps {
  data: PopulationPoint[];
}

function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return String(value);
}

export function PopulationChart({ data }: PopulationChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const option: EChartsOption = useMemo(() => {
    const years = data.map((point) => point.year);
    const populations = data.map((point) => point.population);
    const axisColor = isDark ? '#232b22' : '#dfe4d5';
    const textColor = isDark ? '#9aa68f' : '#626a5a';

    return {
      backgroundColor: 'transparent',
      grid: { left: 56, right: 24, top: 24, bottom: 40 },
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? '#141a15' : '#ffffff',
        borderColor: isDark ? '#232b22' : '#dfe4d5',
        textStyle: { color: isDark ? '#eaf0e3' : '#10140f' },
        formatter: (params: unknown) => {
          const p = (params as Array<{ axisValue: string; data: number }>)[0];
          return `<div style="font-family: Manrope, sans-serif;"><strong>${p.axisValue}</strong><br/>Population: ${new Intl.NumberFormat('en-US').format(p.data)}</div>`;
        },
      },
      xAxis: {
        type: 'category',
        data: years,
        boundaryGap: false,
        axisLine: { lineStyle: { color: axisColor } },
        axisLabel: { color: textColor, fontFamily: 'IBM Plex Mono' },
        axisTick: { alignWithLabel: true },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: axisColor, type: 'dashed' } },
        axisLabel: {
          color: textColor,
          fontFamily: 'IBM Plex Mono',
          formatter: (value: number) => formatCompact(value),
        },
      },
      series: [
        {
          name: 'Population',
          type: 'line',
          data: populations,
          smooth: 0.3,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: false,
          lineStyle: { width: 3, color: '#67ad2c' },
          itemStyle: { color: '#67ad2c', borderWidth: 2, borderColor: '#ffffff' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: isDark ? 'rgba(103,173,44,0.5)' : 'rgba(103,173,44,0.22)' },
                { offset: 1, color: 'rgba(103,173,44,0)' },
              ],
            },
          },
          emphasis: {
            focus: 'series',
            itemStyle: { color: '#7cc93f', borderColor: '#ffffff', borderWidth: 2 },
          },
        },
      ],
      animationDuration: 700,
      animationEasing: 'cubicOut',
    };
  }, [data, isDark]);

  return (
    <ReactECharts
      option={option}
      style={{ height: 380, width: '100%' }}
      notMerge
      lazyUpdate
    />
  );
}
