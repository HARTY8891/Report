import { DOM } from './dom.js';
import { updateReportDate } from './main.js';

export function initFormHandlers() {
    // Date format change
    document.getElementById('date-format')?.addEventListener('change', updateReportDate);

    // Form buttons
    document.getElementById('clear-form-btn')?.addEventListener('click', clearForm);
}

function clearForm() {
    if (confirm('Are you sure you want to clear all fields?')) {
        document.getElementById('bug-summary').value = '';
        document.getElementById('bug-severity').value = '';
        document.getElementById('bug-description').value = '';
        document.getElementById('bug-environment').value = '';
        document.getElementById('next-steps').value = '';
        document.getElementById('reported-by').value = '';
        document.getElementById('reported-to').value = '';
        document.getElementById('urgent-flag').checked = false;
        document.getElementById('confidential-flag').checked = false;

        // Reset preview
        document.getElementById('report-preview-content').innerHTML = 
            '<p class="text-gray-500 italic">Fill out the form to see the preview</p>';
        
        // Reset date
        updateReportDate();
    }
}

export function validateForm() {
    const requiredFields = [
        { id: 'bug-summary', name: 'Summary' },
        { id: 'bug-severity', name: 'Severity' },
        { id: 'bug-description', name: 'Description' },
        { id: 'reported-by', name: 'Reported By' }
    ];

    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element?.value.trim()) {
            alert(`Please fill in the "${field.name}" field`);
            element?.focus();
            return false;
        }
    }
    return true;
}
