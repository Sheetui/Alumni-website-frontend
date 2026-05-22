// Dynamic Alumni Data - Fetches real data from backend with randomization
const API_BASE = window.ALIMIN_API_BASE || 'https://alumni-website3-production.up.railway.app';

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
    
    // Show loading state
    alumniGrid.innerHTML = '<div class="card">Loading alumni...</div>';
    
    try {
        // Fetch real alumni data from backend
        const response = await fetch(`${API_BASE}/api/alumni`);
        const alumni = await response.json();
        
        if (!alumni || alumni.length === 0) {
            alumniGrid.innerHTML = '<div class="card">No alumni registered yet.</div>';
            return;
        }
        
        // Shuffle alumni to show different ones each time
        const shuffledAlumni = shuffleArray(alumni);
        
        // Show up to 6 alumni (or fewer if not enough)
        const alumniToShow = shuffledAlumni.slice(0, 6);
        
        // Render alumni cards
        alumniGrid.innerHTML = alumniToShow.map(alumni => `
            <div class="alumni-card">
                <div class="alumni-photo">
                    <img src="${alumni.profile_picture || 'https://via.placeholder.com/150'}" alt="${alumni.name}">
                </div>
                <div class="alumni-info">
                    <h3>${alumni.name}</h3>
                    <p class="alumni-batch">Batch: ${alumni.batch}</p>
                    <p class="alumni-course">${alumni.course}</p>
                    <p class="alumni-company">${alumni.company || 'Not specified'}</p>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error fetching alumni data:', error);
        alumniGrid.innerHTML = '<div class="card">Failed to load alumni data.</div>';
    }
}

// Call the function when DOM is ready
document.addEventListener('DOMContentLoaded', renderAlumniCards);
