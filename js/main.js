import { DOM } from './dom.js';
import { initFileUpload } from './file-upload.js';
import { initFormHandlers } from './form-handler.js';
import { initPreview } from './preview.js';
import { initExport } from './export.js';
import { initStorage } from './storage.js';

// Initialize DOM elements
document.addEventListener('DOMContentLoaded', () => {
    // Render main structure
    const formContainer = document.getElementById('form-container');
    const previewSidebar = document.getElementById('preview-sidebar');
    
    if (formContainer) {
        formContainer.innerHTML = DOM.initFormContainer();
        
        // Insert form sections
        const formSections = document.getElementById('form-sections');
        if (formSections) {
            formSections.innerHTML = `
                ${DOM.getHeaderSection()}
                ${DOM.getImageUploadSection()}
                ${DOM.getBugDetailsSection()}
                ${DOM.getReporterSection()}
            `;
        }
    }
    
    if (previewSidebar) {
        previewSidebar.innerHTML = DOM.initPreviewSidebar();
    }
    
    // Initialize functionality
    updateReportDate();
    initFileUpload();
    initFormHandlers();
    initPreview();
    initExport();
    initStorage();
});

// Update report date based on selected format
export function updateReportDate() {
    const formatSelect = document.getElementById('date-format');
    const dateField = document.getElementById('report-date');
    const reportNumberField = document.getElementById('report-number');
    
    if (!formatSelect || !dateField || !reportNumberField) return;
    
    const format = formatSelect.value;
    const today = new Date();
    let formattedDate;
    
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    
    if (format === 'DD/MM/YYYY') {
        formattedDate = `${day}/${month}/${year}`;
    } else if (format === 'MM/DD/YYYY') {
        formattedDate = `${month}/${day}/${year}`;
    } else {
        formattedDate = `${year}-${month}-${day}`;
    }
    
    dateField.value = formattedDate;
    
    // Generate report number
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    reportNumberField.value = `BR-${year}${month}${day}-${randomNum}`;
}
