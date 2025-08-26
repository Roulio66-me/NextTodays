<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.querySelector('.search-container');
    const logoText = document.querySelector('.logo-text');
    const programGrid = document.querySelector('.program-grid');

    // Fonction pour calculer la distance de Levenshtein
    function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];

        // Incrémente la première colonne (j)
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // Incrémente la première ligne (i)
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Calcule le reste de la matrice
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                                           Math.min(matrix[i][j - 1] + 1, // insertion
                                                    matrix[i - 1][j] + 1)); // suppression
                }
            }
        }

        return matrix[b.length][a.length];
    }

    const allPrograms = [
        { name: "Sport", image: "Image", keywords: ["sport", "fitness", "entrainement", "musculation", "gym", "cardio"] },
        { name: "Reboot mental", image: "Image", keywords: ["reboot mental", "stress", "bien-être", "zen", "détente", "calme"] },
        { name: "Confiance en soi", image: "Image", keywords: ["confiance", "estime de soi", "développement personnel", "affirmation"] },
        { name: "Habitude et discipline", image: "Image", keywords: ["habitude", "discipline", "organisation", "productivité"] },
        { name: "Gestion du sommeil", image: "Image", keywords: ["sommeil", "insomnie", "repos", "dormir", "nuit"] },
        { name: "Cuisine saine", image: "Image", keywords: ["cuisine", "saine", "recettes", "alimentation", "diététique", "manger"] },
        { name: "Nutrition et diététique", image: "Image", keywords: ["nutrition", "diète", "sain", "recettes", "alimentation"] },
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
        if (programs.length === 0) {
            programGrid.innerHTML = '<p>Aucun programme ne correspond à votre recherche.</p>';
        } else {
            programs.forEach(program => {
                programGrid.appendChild(createProgramCard(program));
            });
        }
    }

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
        const query = e.target.value.toLowerCase().trim();

        if (query === '') {
            renderPrograms(allPrograms);
            return;
        }

        let bestMatch = null;
        let lowestDistance = Infinity;

        allPrograms.forEach(program => {
            // Cherche la meilleure correspondance pour le nom
            const nameDistance = levenshteinDistance(query, program.name.toLowerCase());
            if (nameDistance < lowestDistance) {
                lowestDistance = nameDistance;
                bestMatch = program;
            }

            // Cherche la meilleure correspondance pour les mots-clés
            program.keywords.forEach(keyword => {
                const keywordDistance = levenshteinDistance(query, keyword.toLowerCase());
                if (keywordDistance < lowestDistance) {
                    lowestDistance = keywordDistance;
                    bestMatch = program;
                }
            });
        });
        
        // Affiche le meilleur résultat si la distance est suffisamment petite
        if (lowestDistance <= 3) { // Vous pouvez ajuster ce seuil (3 est une bonne valeur pour les petites fautes)
            renderPrograms([bestMatch]);
        } else {
            renderPrograms([]); // N'affiche rien si la recherche est trop éloignée
        }
    });
=======
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
>>>>>>> 5d78aa2d6b0c3b082e53918425164e053b12f7ea
});