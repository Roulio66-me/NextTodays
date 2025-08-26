document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.querySelector('.search-container');
    const logoText = document.querySelector('.logo-text');
    const programGrid = document.querySelector('.program-grid');

    const allPrograms = [
        { name: "Sport", image: "Image", keywords: ["sport", "fitness", "entrainement", "musculation"] },
        { name: "Reboot mental", image: "Image", keywords: ["reboot mental", "stress", "bien-être", "zen"] },
        { name: "Confiance en soi", image: "Image", keywords: ["confiance", "estime de soi", "développement personnel"] },
        { name: "Habitude et discipline", image: "Image", keywords: ["habitude", "discipline", "organisation", "productivité"] },
        { name: "Méditation guidée", image: "Image", keywords: ["méditation", "guidée", "relaxation", "pleine conscience"] },
        { name: "Nutrition et diététique", image: "Image", keywords: ["nutrition", "diète", "sain", "recettes"] },
        { name: "Yoga pour débutants", image: "Image", keywords: ["yoga", "débutant", "flexibilité", "posture"] },
        { name: "Gestion du temps", image: "Image", keywords: ["gestion", "temps", "organisation", "planning"] },
    ];

    function createProgramCard(program) {
        const card = document.createElement('div');
        card.classList.add('program-card');
        card.innerHTML = `
            <div class="program-image">${program.image}</div>
            <h3>${program.name}</h3>
        `;
        return card;
    }

    function renderPrograms(programs) {
        programGrid.innerHTML = '';
        programs.forEach(program => {
            programGrid.appendChild(createProgramCard(program));
        });
    }

    // Initial rendering of all programs
    renderPrograms(allPrograms);

    searchInput.addEventListener('focus', () => {
        searchContainer.classList.add('collapsed');
        logoText.style.display = 'none';
    });

    searchInput.addEventListener('blur', () => {
        if (searchInput.value === '') {
            searchContainer.classList.remove('collapsed');
            logoText.style.display = 'block';
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredPrograms = allPrograms.filter(program => {
            const matchName = program.name.toLowerCase().includes(query);
            const matchKeywords = program.keywords.some(keyword => keyword.includes(query));
            return matchName || matchKeywords;
        });
        renderPrograms(filteredPrograms);
    });
});