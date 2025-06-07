import { validateForm } from './form-handler.js';

export function initPreview() {
    const previewBtn = document.getElementById('preview-btn');
    const closePreviewBtn = document.getElementById('close-preview-btn');
    const closePreviewModalBtn = document.getElementById('close-preview-modal');

    if (previewBtn) {
        previewBtn.addEventListener('click', generatePreview);
    }
    if (closePreviewBtn) {
        closePreviewBtn.addEventListener('click', closePreviewSidebar);
    }
    if (closePreviewModalBtn) {
        closePreviewModalBtn.addEventListener('click', closePreviewModal);
    }
}

function generatePreview() {
    if (!validateForm()) return;

    const previewContent = generateReportHTML();
    document.getElementById('report-preview-content').innerHTML = previewContent;
    document.getElementById('modal-preview-content').innerHTML = previewContent;

    // Responsive preview display
    if (window.innerWidth < 768) {
        document.getElementById('preview-modal').classList.remove('hidden');
    } else {
        document.getElementById('preview-sidebar').classList.remove('hidden');
    }
}

function generateReportHTML() {
    const getValue = id => document.getElementById(id)?.value || '';
    const isChecked = id => document.getElementById(id)?.checked || false;

    const date = getValue('report-date');
    const reportNumber = getValue('report-number');
    const summary = getValue('bug-summary');
    const severity = getValue('bug-severity');
    const description = getValue('bug-description');
    const environment = getValue('bug-environment');
    const nextSteps = getValue('next-steps');
    const reportedBy = getValue('reported-by');
    const reportedTo = getValue('reported-to');
    const urgent = isChecked('urgent-flag');
    const confidential = isChecked('confidential-flag');

    // Get all image previews
    const images = Array.from(document.querySelectorAll('#preview-container img'))
        .map(img => `<div class="border rounded-md p-2"><img src="${img.src}" class="w-full max-h-60 object-contain mx-auto"></div>`)
        .join('');

    return `
        <div class="space-y-6">
            <div class="text-center">
                <h1 class="text-2xl font-bold text-gray-800">Bug Report</h1>
                <div class="flex justify-center gap-4 text-sm text-gray-600 mt-2">
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Report #:</strong> ${reportNumber}</p>
                </div>
            </div>
            
            <div class="space-y-2">
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Issue Summary</h2>
                <p><strong>Summary:</strong> ${summary}</p>
                <p><strong>Severity:</strong> ${severity} ${urgent ? '<span class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded ml-2">URGENT</span>' : ''}</p>
                ${confidential ? '<p class="text-red-600 font-medium"><i class="fas fa-lock mr-1"></i> CONFIDENTIAL</p>' : ''}
            </div>
            
            <div class="space-y-2">
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Detailed Description</h2>
                <p>${description.replace(/\n/g, '<br>')}</p>
            </div>
            
            ${environment ? `
            <div class="space-y-2">
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Environment</h2>
                <p>${environment.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}
            
            ${nextSteps ? `
            <div class="space-y-2">
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Recommended Next Steps</h2>
                <p>${nextSteps.replace(/\n/g, '<br>')}</p>
            </div>
            ` : ''}
            
            ${images ? `
            <div class="space-y-2">
                <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Screenshots</h2>
                <div class="grid grid-cols-1 gap-3">${images}</div>
            </div>
            ` : ''}
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div class="space-y-1">
                    <h3 class="font-semibold text-gray-800">Reported By</h3>
                    <p>${reportedBy}</p>
                </div>
                <div class="space-y-1">
                    <h3 class="font-semibold text-gray-800">Assigned To</h3>
                    <p>${reportedTo || 'Not assigned'}</p>
                </div>
            </div>
        </div>
    `;
}

function closePreviewSidebar() {
    document.getElementById('preview-sidebar').classList.add('hidden');
}

function closePreviewModal() {
    document.getElementById('preview-modal').classList.add('hidden');
}
