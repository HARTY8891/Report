export function initFileUpload() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const clearImagesBtn = document.getElementById('clear-images-btn');

    if (!dropzone) return;

    // Event listeners
    dropzone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFiles);
    clearImagesBtn.addEventListener('click', clearAllImages);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        dropzone.addEventListener(event, preventDefaults);
    });

    ['dragenter', 'dragover'].forEach(event => {
        dropzone.addEventListener(event, highlight);
    });

    ['dragleave', 'drop'].forEach(event => {
        dropzone.addEventListener(event, unhighlight);
    });

    dropzone.addEventListener('drop', handleDrop);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropzone.classList.add('active');
    }

    function unhighlight() {
        dropzone.classList.remove('active');
    }

    function handleDrop(e) {
        const files = e.dataTransfer.files;
        handleFiles({ target: { files } });
    }

    function handleFiles(e) {
        const files = e.target.files;
        if (!files.length) return;

        previewContainer.classList.remove('hidden');
        clearImagesBtn.classList.remove('hidden');

        Array.from(files).forEach(file => {
            if (!file.type.match('image.*')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const previewItem = createPreviewItem(e.target.result);
                previewContainer.appendChild(previewItem);
            };
            reader.readAsDataURL(file);
        });
    }

    function createPreviewItem(imageSrc) {
        const previewItem = document.createElement('div');
        previewItem.className = 'relative group';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.className = 'w-full h-auto rounded object-cover';

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        removeBtn.className = 'absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity';
        removeBtn.addEventListener('click', () => {
            previewItem.remove();
            if (!previewContainer.children.length) {
                previewContainer.classList.add('hidden');
                clearImagesBtn.classList.add('hidden');
            }
        });

        previewItem.append(img, removeBtn);
        return previewItem;
    }

    function clearAllImages() {
        previewContainer.innerHTML = '';
        previewContainer.classList.add('hidden');
        clearImagesBtn.classList.add('hidden');
        fileInput.value = '';
    }
}
