// DRAG AND DROP FUNCTIONALITY

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.getElementById('drop-area').addEventListener(eventName, preventDefaults, false)
});

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight the drop area when dragging files over it
['dragenter', 'dragover'].forEach(eventName => {
    document.getElementById('drop-area').addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
    document.getElementById('drop-area').addEventListener(eventName, unhighlight, false)
});

function highlight(e) {
    document.getElementById('drop-area').classList.add('dragover');
}

function unhighlight(e) {
    document.getElementById('drop-area').classList.remove('dragover');
}

// Handle dropped files
document.getElementById('drop-area').addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    // Process the files array
    console.log(files);

    // Example: Append files to form
    let input = document.getElementById('main_file');
    let fileList = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
        fileList.items.add(files[i]);
    }

    input.files = fileList.files;
}