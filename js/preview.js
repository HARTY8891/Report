function initPreview() {
    document.getElementById('previewBtn').addEventListener('click', generatePreview);
    document.getElementById('closePreviewBtn').addEventListener('click', closePreviewSidebar);
    document.getElementById('closePreviewModalBtn').addEventListener('click', closePreviewModal);
    
    function generatePreview() {
        if (!validateForm()) return;
        
        const previewContent = generateReportHTML();
        
        // Update preview in sidebar and modal
        document.getElementById('reportPreviewContent').innerHTML = previewContent;
        document.getElementById('modalPreviewContent').innerHTML = previewContent;
        
        // Show preview in responsive way
        if (window.innerWidth < 768) {
            document.getElementById('previewModal').classList.remove('hidden');
        } else {
            document.getElementById('previewSidebar').classList.remove('hidden');
        }
    }
    
    function closePreviewSidebar() {
        document.getElementById('previewSidebar').classList.add('hidden');
    }
    
    function closePreviewModal() {
        document.getElementById('previewModal').classList.add('hidden');
    }
    
    function generateReportHTML() {
        const date = document.getElementById('reportDate').value;
        const reportNumber = document.getElementById('reportNumber').value;
        const summary = document.getElementById('bugSummary').value;
        const severity = document.getElementById('bugSeverity').value;
        const description = document.getElementById('bugDescription').value;
        const environment = document.getElementById('bugEnvironment').value;
        const nextSteps = document.getElementById('nextSteps').value;
        const reportedBy = document.getElementById('reportedBy').value;
        const reportedTo = document.getElementById('reportedTo').value;
        const urgent = document.getElementById('urgentFlag').checked;
        const confidential = document.getElementById('confidentialFlag').checked;
        
        let html = `
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
                    <p><strong>Reported By:</strong> ${reportedBy}</p>
                    <p><strong>Assigned To:</strong> ${reportedTo || 'Not assigned'}</p>
                </div>
                
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Detailed Description</h2>
                    <p style="white-space: pre-wrap;">${description.replace(/\n/g, '<br>')}</p>
                </div>
        `;
        
        if (environment) {
            html += `
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Environment</h2>
                    <p style="white-space: pre-wrap;">${environment.replace(/\n/g, '<br>')}</p>
                </div>
            `;
        }
        
        if (nextSteps) {
            html += `
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Recommended Next Steps</h2>
                    <p style="white-space: pre-wrap;">${nextSteps.replace(/\n/g, '<br>')}</p>
                </div>
            `;
        }
        
        // Add screenshots if any
        const images = document.getElementById('previewContainer').querySelectorAll('img');
        if (images.length > 0) {
            html += `
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold text-gray-800 border-b pb-1">Screenshots</h2>
                    <div class="grid grid-cols-1 gap-3">
            `;
            
            images.forEach(img => {
                html += `<div class="border rounded-md p-2"><img src="${img.src}" class="w-full max-h-[500px] object-contain mx-auto"></div>`;
            });
            
            html += `</div></div>`;
        }
        
        html += `</div>`;
        
        return html;
    }
}
