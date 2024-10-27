  
// Create a 'Video Tutorials' button and add it to the page
const videoButton = document.createElement('button');
videoButton.innerText = 'Video Tutorials';
videoButton.id = 'video-tutorial-btn';
videoButton.style.position = 'fixed';
videoButton.style.bottom = '20px';
videoButton.style.right = '20px';
videoButton.style.padding = '10px 20px';
videoButton.style.backgroundColor = '#4CAF50';
videoButton.style.color = 'white';
videoButton.style.border = 'none';
videoButton.style.cursor = 'pointer';
document.body.appendChild(videoButton);

videoButton.addEventListener('click', async function () {
    console.log('Video button clicked');
    try {
        const response = await fetch('http://localhost:3000/videos'); // Fetch from Node.js API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const videos = await response.json();
        console.log('Fetched videos:', videos);

        if (videos && videos.length > 0) {
            // Show video modal if on a supported page (e.g., not Google search)
            if (!window.location.href.includes('google.com')) {
                showVideoModal(videos); // If not on Google search, show the modal
            } else {
                // Navigate to a new page (e.g., video.html) where videos will be shown
                window.location.href = '/video.html'; // Navigate to a separate video page
            }
        } else {
            alert('No videos found.');
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
       // alert('Error fetching videos, navigating to video page...');
        // Navigate to a separate page in case of an error
      //  window.location.href = '/video.html';
      window.location.href = 'http://localhost:3000/video.html'; // Navigate to the video page on error

    }
});
// Function to show the video modal (unchanged)
function showVideoModal(videos) {
    const modal = document.createElement('div');
    modal.id = 'video-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '600px';
    modalContent.style.textAlign = 'center';

    const closeModalBtn = document.createElement('button');
    closeModalBtn.innerText = 'Close';
    closeModalBtn.style.marginTop = '20px';
    closeModalBtn.style.padding = '10px 20px';
    closeModalBtn.addEventListener('click', () => {
        modal.remove();
    });
}