// Dynamic Alumni Data - Fetches real data from backend with randomization

// Use global API_BASE if already defined
window.API_BASE = window.API_BASE || 'https://alumni-website3-production.up.railway.app';

// Function to shuffle array randomly
function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

// Function to render alumni cards dynamically
async function renderAlumniCards() {
    const alumniGrid = document.getElementById('alumniGrid');

    if (!alumniGrid) return;

    // Loading state
    alumniGrid.innerHTML = '<div class="card">Loading alumni...</div>';

    try {
        // Fetch alumni data from backend
        const response = await fetch(`${window.API_BASE}/api/alumni`);

        if (!response.ok) {
            throw new Error('Failed to fetch alumni');
        }

        const alumni = await response.json();

        // No alumni found
        if (!alumni || alumni.length === 0) {
            alumniGrid.innerHTML =
                '<div class="card">No alumni registered yet.</div>';
            return;
        }

        // Shuffle alumni list randomly
        const shuffledAlumni = shuffleArray(alumni);

        // Show maximum 6 alumni
        const alumniToShow = shuffledAlumni.slice(0, 6);

        // Render cards
        alumniGrid.innerHTML = alumniToShow
            .map(
                (alumni) => `
                <div class="alumni-card">
                    <div class="alumni-photo">
                        <img 
                            src="${
                                alumni.profile_picture ||
                                'https://via.placeholder.com/150'
                            }" 
                            alt="${alumni.name}"
                        >
                    </div>

                    <div class="alumni-info">
                        <h3>${alumni.name || 'Unknown Alumni'}</h3>

                        <p class="alumni-batch">
                            Batch: ${alumni.batch || 'N/A'}
                        </p>

                        <p class="alumni-course">
                            ${alumni.course || 'N/A'}
                        </p>

                        <p class="alumni-company">
                            ${alumni.company || 'Not specified'}
                        </p>
                    </div>
                </div>
            `
            )
            .join('');
    } catch (error) {
        console.error('Error fetching alumni data:', error);

        alumniGrid.innerHTML =
            '<div class="card">Failed to load alumni data.</div>';
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderAlumniCards();
});
