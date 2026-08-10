import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { PopulationStats, YearRange } from '../types/population';

const PDF_FILENAME = 'uzbekistan-population-1991-2026.pdf';
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 14;

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export async function exportDashboardToPdf(
  chartElement: HTMLElement,
  stats: PopulationStats,
  range: YearRange
): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const contentWidth = PAGE_WIDTH - MARGIN * 2;
  let cursorY = MARGIN;

  doc.setFillColor(103, 173, 44);
  doc.rect(0, 0, PAGE_WIDTH, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Uzbekistan Population Dynamics', MARGIN, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Period: ${range.start} - ${range.end}`, MARGIN, 22);

  cursorY = 38;
  doc.setTextColor(16, 20, 15);

  const canvas = await html2canvas(chartElement, {
    scale: 2,
    backgroundColor: '#ffffff',
    logging: false,
  });
  const imgData = canvas.toDataURL('image/png');
  const imgWidth = contentWidth;
  const imgHeight = (canvas.height / canvas.width) * imgWidth;
  doc.addImage(imgData, 'PNG', MARGIN, cursorY, imgWidth, imgHeight);
  cursorY += imgHeight + 10;

  doc.setDrawColor(223, 228, 213);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, cursorY, PAGE_WIDTH - MARGIN, cursorY);
  cursorY += 8;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Key Figures', MARGIN, cursorY);
  cursorY += 8;

  const rows: [string, string][] = [
    [`Population (${stats.currentYear})`, formatNumber(stats.currentPopulation)],
    [`Initial Population (${stats.initialYear})`, formatNumber(stats.initialPopulation)],
    ['Total Growth', formatNumber(stats.totalGrowth)],
    ['Growth %', `${stats.growthPercent.toFixed(2)}%`],
  ];

  const colWidth = contentWidth / 2;
  rows.forEach(([label, value], index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = MARGIN + col * colWidth;
    const y = cursorY + row * 16;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(98, 106, 90);
    doc.text(label, x, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(16, 20, 15);
    doc.text(value, x, y + 6);
  });

  cursorY += Math.ceil(rows.length / 2) * 16 + 6;

  doc.setDrawColor(223, 228, 213);
  doc.line(MARGIN, cursorY, PAGE_WIDTH - MARGIN, cursorY);
  cursorY += 6;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(147, 153, 127);
  doc.text(`Generated on ${formatDate(new Date())}`, MARGIN, cursorY);

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(147, 153, 127);
    doc.text(
      `Page ${i} of ${pageCount}`,
      PAGE_WIDTH - MARGIN,
      PAGE_HEIGHT - 8,
      { align: 'right' }
    );
  }

  doc.save(PDF_FILENAME);
}
