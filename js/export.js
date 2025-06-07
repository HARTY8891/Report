import { validateForm } from './form-handler.js';
import { generateReportHTML } from './preview.js';

export function initExport() {
    const exportBtn = document.getElementById('export-btn');
    const exportDropdown = document.getElementById('export-dropdown');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportDocxBtn = document.getElementById('export-docx-btn');

    if (exportBtn) {
        exportBtn.addEventListener('click', toggleExportDropdown);
    }
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exportReport('pdf');
            hideExportDropdown();
        });
    }
    if (exportDocxBtn) {
        exportDocxBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exportReport('docx');
            hideExportDropdown();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.relative') && !e.target.classList.contains('export-dropdown-item')) {
            hideExportDropdown();
        }
    });
}

function toggleExportDropdown() {
    document.getElementById('export-dropdown').classList.toggle('hidden');
}

function hideExportDropdown() {
    document.getElementById('export-dropdown').classList.add('hidden');
}

function exportReport(format) {
    if (!validateForm()) return;

    const reportHtml = generateReportHTML();
    const reportNumber = document.getElementById('report-number').value;

    if (format === 'pdf') {
        // Create a temporary element for PDF generation
        const element = document.createElement('div');
        element.innerHTML = reportHtml;

        // Add title
        const title = document.createElement('h1');
        title.textContent = 'Bug Report';
        title.style.textAlign = 'center';
        title.style.fontSize = '24px';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '20px';
        element.insertBefore(title, element.firstChild);

        // PDF options
        const opt = {
            margin: 10,
            filename: `${reportNumber}_bug_report.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Generate PDF
        html2pdf().set(opt).from(element).save();
    } else {
        alert('Word export would be implemented here. For this demo, we only provide PDF export.');
        // In a real implementation, you might use docx.js or similar library
    }
}
