document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.getElementById('downloadBtn');
    const resumeButton = document.getElementById('resumeBtn');

    function handleDownload(button, filename) {
        return async function() {
            const icon = button.querySelector('.button-icon i');
            const originalIcon = icon.className;
            
            // Add loading state
            button.classList.add('loading');
            button.disabled = true;
            icon.className = 'fas fa-spinner fa-spin';
            
            try {
                const response = await fetch(`files/${filename}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);

                // Show success feedback
                icon.className = 'fas fa-check';
                button.style.background = '#16a34a'; // Green for success

                setTimeout(() => {
                    icon.className = originalIcon;
                    button.style.background = '';
                }, 1500);

            } catch (error) {
                console.error('Download failed:', error);
                icon.className = 'fas fa-exclamation-circle';
                button.style.background = '#dc2626'; // Red for error

                setTimeout(() => {
                    button.style.background = '';
                    icon.className = originalIcon;
                }, 2000);
            } finally {
                setTimeout(() => {
                    button.classList.remove('loading');
                    button.disabled = false;
                }, 1000);
            }
        };
    }

    if (cvButton) {
        cvButton.addEventListener('click', handleDownload(cvButton, 'CV.pdf'));
    }
    if (resumeButton) {
        resumeButton.addEventListener('click', handleDownload(resumeButton, 'Resume.pdf'));
    }
});
