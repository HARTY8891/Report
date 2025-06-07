import { DATE_FORMATS, SEVERITY_LEVELS } from './config.js';

export const DOM = {
    initFormContainer() {
        return `
        <div class="bg-white rounded-xl shadow-md p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Bug Report Generator</h1>
            <p class="text-gray-600 mb-6">Fill in the details below to generate a professional bug report</p>
            
            <!-- Form sections will be dynamically inserted here -->
            <div id="form-sections"></div>
            
            <div class="flex flex-wrap gap-3">
                <button id="preview-btn" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2">
                    <i class="fas fa-eye"></i> Preview Report
                </button>
                <button id="save-draft-btn" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition flex items-center gap-2">
                    <i class="fas fa-save"></i> Save Draft
                </button>
                <button id="clear-form-btn" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition flex items-center gap-2">
                    <i class="fas fa-trash-alt"></i> Clear Form
                </button>
                <div class="relative">
                    <button id="export-btn" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2">
                        <i class="fas fa-file-export"></i> Export Report
                    </button>
                    <div id="export-dropdown" class="absolute hidden right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-10">
                        <a href="#" id="export-pdf-btn" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><i class="fas fa-file-pdf mr-2 text-red-500"></i>PDF</a>
                        <a href="#" id="export-docx-btn" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><i class="fas fa-file-word mr-2 text-blue-500"></i>Word</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    initPreviewSidebar() {
        return `
        <div class="sticky top-4">
            <div class="bg-white rounded-xl shadow-md p-6 report-preview">
                <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between">
                    <span>Report Preview</span>
                    <button id="close-preview-btn" class="text-gray-400 hover:text-gray-600 md:hidden">
                        <i class="fas fa-times"></i>
                    </button>
                </h2>
                <div id="report-preview-content" class="prose max-w-none">
                    <p class="text-gray-500 italic">Fill out the form to see the preview</p>
                </div>
            </div>
            
            <div id="drafts-section" class="bg-white rounded-xl shadow-md p-6 mt-4 hidden">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Recent Drafts</h2>
                <div id="drafts-list" class="space-y-2"></div>
            </div>
        </div>
        `;
    },

    getHeaderSection() {
        return `
        <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-800">Report Information</h2>
                <div class="flex items-center gap-2">
                    <label class="text-sm text-gray-600">Date Format:</label>
                    <select id="date-format" class="rounded-md border-gray-300 text-sm py-1 px-2 shadow-sm">
                        ${Object.entries(DATE_FORMATS).map(([key, value]) => 
                            `<option value="${value}">${key}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Report Date</label>
                    <input type="text" id="report-date" class="w-full rounded-md border-gray-300 shadow-sm bg-gray-50" readonly>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Report Number</label>
                    <input type="text" id="report-number" class="w-full rounded-md border-gray-300 shadow-sm bg-gray-50" readonly>
                </div>
            </div>
        </div>
        `;
    },

    getImageUploadSection() {
        return `
        <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Screenshot Attachments</h2>
            <div id="dropzone" class="dropzone rounded-lg p-8 text-center cursor-pointer mb-4">
                <i class="fas fa-cloud-upload-alt text-4xl text-blue-500 mb-3"></i>
                <p class="font-medium text-gray-700">Drag & drop your screenshot here</p>
                <p class="text-sm text-gray-500 mt-1">or click to browse files (JPEG, PNG)</p>
                <input type="file" id="file-input" class="hidden" accept="image/*">
            </div>
            <div id="preview-container" class="grid grid-cols-2 md:grid-cols-3 gap-3 hidden"></div>
            <button id="clear-images-btn" class="mt-3 text-sm text-red-600 hover:text-red-800 hidden">
                <i class="fas fa-trash-alt mr-1"></i> Remove all images
            </button>
        </div>
        `;
    },

    getBugDetailsSection() {
        return `
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Bug Details</h2>
            
            <div class="mb-4">
                <label for="bug-summary" class="block text-sm font-medium text-gray-700 mb-1">Summary*</label>
                <input type="text" id="bug-summary" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
            </div>
            
            <div class="mb-4">
                <label for="bug-severity" class="block text-sm font-medium text-gray-700 mb-1">Severity Level*</label>
                <select id="bug-severity" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
                    <option value="">Select severity</option>
                    ${SEVERITY_LEVELS.map(level => 
                        `<option value="${level.value}">${level.label}</option>`
                    ).join('')}
                </select>
            </div>
            
            <div class="mb-4">
                <label for="bug-description" class="block text-sm font-medium text-gray-700 mb-1">Detailed Description*</label>
                <textarea id="bug-description" rows="4" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required></textarea>
            </div>
            
            <div class="mb-4">
                <label for="bug-environment" class="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                <textarea id="bug-environment" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>
            
            <div class="mb-4">
                <label for="next-steps" class="block text-sm font-medium text-gray-700 mb-1">Recommended Next Steps</label>
                <textarea id="next-steps" rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>
        </div>
        `;
    },

    getReporterSection() {
        return `
        <div class="mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Reporting Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="reported-by" class="block text-sm font-medium text-gray-700 mb-1">Reported By*</label>
                    <input type="text" id="reported-by" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
                </div>
                <div>
                    <label for="reported-to" class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <input type="text" id="reported-to" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
            </div>
            <div class="flex items-center gap-4 mt-4">
                <div class="flex items-center">
                    <input type="checkbox" id="urgent-flag" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="urgent-flag" class="ml-2 block text-sm text-gray-700">Urgent</label>
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="confidential-flag" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                    <label for="confidential-flag" class="ml-2 block text-sm text-gray-700">Confidential</label>
                </div>
            </div>
        </div>
        `;
    }
};
