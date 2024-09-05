console.log('JavaScript is working');

// Get the form and file input elements
const form = document.getElementById('upload-form');
const fileInput = document.getElementById('main_file');

// When a file is selected from the file input, automatically submit the form
fileInput.addEventListener('change', () => {
    form.submit(); // Automatically submits the form when a file is selected
});

// Optional: If you want drag-and-drop functionality
const dropArea = document.getElementById('drop-area');

// Prevent default drag behaviors for drag-and-drop
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

// Function to prevent default behaviors like opening the file in a new tab
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight the drop area when dragging files over it (adds a visual cue)
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

// Remove the highlight when the file is dragged away or dropped
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Function to add a highlight class to the drop area when a file is dragged over it
function highlight(e) {
    dropArea.classList.add('dragover'); // Adds a class to visually show the drop area is active
}

// Function to remove the highlight class when the file is no longer dragged over the drop area
function unhighlight(e) {
    dropArea.classList.remove('dragover');
}

// Handle the dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Function to handle the file drop event
function handleDrop(e) {
    let dt = e.dataTransfer; // Get the DataTransfer object, which contains the dropped files
    let files = dt.files;    // Extract the files from the DataTransfer object

    handleFiles(files);      // Process the dropped files
}

// Function to handle the files and auto-submit the form
function handleFiles(files) {
    // Create a new DataTransfer object to assign the files to the input element
    let fileList = new DataTransfer();

    // Add the dropped files to the DataTransfer object
    for (let i = 0; i < files.length; i++) {
        fileList.items.add(files[i]);  // Add each dropped file
    }

    // Assign the DataTransfer object to the hidden file input element
    fileInput.files = fileList.files;

    // Automatically submit the form after the files are added to the file input
    form.submit();
}
