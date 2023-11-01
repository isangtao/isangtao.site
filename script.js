// select all the download links and hide them initially
const downloadLinks = document.querySelectorAll('.download-item a');
downloadLinks.forEach(link => link.style.display = 'none');

// create a progress bar element
const progressBar = document.createElement('progress');
progressBar.max = 100; // set the maximum value for the progress bar
progressBar.value = 0; // set the initial value to 0
document.body.appendChild(progressBar);

// add an event listener to each download link that shows the link, hides the others, and updates the progress bar as it downloads
downloadLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        // show the current link
        link.style.display = 'block';
        // hide the others
        downloadLinks.forEach(l => l !== link && (l.style.display = 'none'));
        // update progress bar value to 0 initially
        progressBar.value = 0;
        // get the file size and create an XHR object
        const fileSize = link.getAttribute('data-size');
        const xhr = new XMLHttpRequest();
        // set up an event listener for progress updates
        xhr.upload.addEventListener('progress', () => {
            // calculate the downloaded percentage based on upload progress
            const loadedPercentage = Math.round((xhr.upload.position * 100) / fileSize);
            // update progress bar value with new percentage
            progressBar.value = loadedPercentage;
        });
        // set up an event listener for finish event
        xhr.addEventListener('load', () => {
            // hide the current link and progress bar
            link.style.display = 'none';
            progressBar.parentNode.removeChild(progressBar);
            console.log(`Downloaded file ${index + 1} successfully`);
        });
        // set up an event listener for error event
        xhr.addEventListener('error', () => {
            console.log('Error: Could not download the file');
        });
        // open the XHR object and send the GET request
        xhr.open('GET', link.href);
        xhr.send();
    })
});
