export function initStorage() {
    const saveDraftBtn = document.getElementById('save-draft-btn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', saveAsDraft);
    }
    loadDrafts();
}

function saveAsDraft() {
    if (!validateForm()) return;

    const draft = {
        date: document.getElementById('report-date').value,
        reportNumber: document.getElementById('report-number').value,
        summary: document.getElementById('bug-summary').value,
        severity: document.getElementById('bug-severity').value,
        description: document.getElementById('bug-description').value,
        environment: document.getElementById('bug-environment').value,
        nextSteps: document.getElementById('next-steps').value,
        reportedBy: document.getElementById('reported-by').value,
        reportedTo: document.getElementById('reported-to').value,
        urgent: document.getElementById('urgent-flag').checked,
        confidential: document.getElementById('confidential-flag').checked,
        timestamp: new Date().toISOString()
    };

    let drafts = JSON.parse(localStorage.getItem('bugReportDrafts') || '[]');
    drafts.unshift(draft);
    if (drafts.length > 5) drafts = drafts.slice(0, 5);
    localStorage.setItem('bugReportDrafts', JSON.stringify(drafts));

    alert('Draft saved successfully!');
    loadDrafts();
}

function loadDrafts() {
    const drafts = JSON.parse(localStorage.getItem('bugReportDrafts') || '[]');
    const draftsList = document.getElementById('drafts-list');
    const draftsSection = document.getElementById('drafts-section');

    if (!draftsList) return;

    draftsList.innerHTML = '';

    if (drafts.length) {
        draftsSection.classList.remove('hidden');
        drafts.forEach((draft, index) => {
            const draftItem = document.createElement('div');
            draftItem.className = 'p-3 border rounded-md hover:bg-gray-50 cursor-pointer';
            draftItem.innerHTML = `
                <h3 class="font-medium text-gray-800 truncate">${draft.reportNumber} - ${draft.summary}</h3>
                <p class="text-sm text-gray-600">${new Date(draft.timestamp).toLocaleString()}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-xs px-2 py-1 rounded ${getSeverityClass(draft.severity)}">${draft.severity}</span>
                    <button class="text-red-500 hover:text-red-700 text-sm delete-draft" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            draftItem.addEventListener('click', () => loadDraft(draft));
            draftItem.querySelector('.delete-draft').addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Delete this draft?')) deleteDraft(index);
            });
            
            draftsList.appendChild(draftItem);
        });
    } else {
        draftsSection.classList.add('hidden');
    }
}

function loadDraft(draft) {
    document.getElementById('report-date').value = draft.date;
    document.getElementById('report-number').value = draft.reportNumber;
    document.getElementById('bug-summary').value = draft.summary;
    document.getElementById('bug-severity').value = draft.severity;
    document.getElementById('bug-description').value = draft.description;
    document.getElementById('bug-environment').value = draft.environment;
    document.getElementById('next-steps').value = draft.nextSteps;
    document.getElementById('reported-by').value = draft.reportedBy;
    document.getElementById('reported-to').value = draft.reportedTo;
    document.getElementById('urgent-flag').checked = draft.urgent;
    document.getElementById('confidential-flag').checked = draft.confidential;

    generatePreview();
}

function deleteDraft(index) {
    let drafts = JSON.parse(localStorage.getItem('bugReportDrafts') || '[]');
    drafts.splice(index, 1);
    localStorage.setItem('bugReportDrafts', JSON.stringify(drafts));
    loadDrafts();
}

function getSeverityClass(severity) {
    switch (severity) {
        case 'Low': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'High': return 'bg-orange-100 text-orange-800';
        case 'Critical': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function validateForm() {
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
