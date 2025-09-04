document.addEventListener('DOMContentLoaded', () => {

    // --- Votre code pour le stockage local (userData, userGoals, etc.) ---
    let userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'Nom de l\'utilisateur',
        email: 'email@example.com',
        memberSince: '1er janvier 2025'
    };
    let userGoals = JSON.parse(localStorage.getItem('userGoals')) || [];
    let earnedBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];
    let userPrograms = JSON.parse(localStorage.getItem('userPrograms')) || [
        { id: 'poids', title: 'Perte de poids', progression: 50 },
        { id: 'yoga', title: 'Yoga et bien-être', progression: 25 },
        { id: 'reboot', title: 'Reboot mental', progression: 80 }
    ];
    let privacySettings = JSON.parse(localStorage.getItem('privacySettings')) || {
        profileVisibility: 'public',
        messagePrivacy: 'everyone',
        emailNotifications: true,
        communityMessages: true
    };
    let userSubscription = JSON.parse(localStorage.getItem('userSubscription')) || {
        plan: 'Free',
        renewalDate: null,
        price: '0 €'
    };
    
    // --- Fonction de sauvegarde générique ---
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    // --- Données pour les programmes et badges (simulées) ---
    const allPrograms = [
        { id: 'poids', title: 'Perte de poids', description: 'Atteignez vos objectifs de perte de poids avec nos programmes de coaching et de nutrition.', icon: 'fas fa-dumbbell' },
        { id: 'yoga', title: 'Yoga et bien-être', description: 'Détendez-vous et améliorez votre flexibilité avec nos programmes de yoga et méditation.', icon: 'fas fa-leaf' },
        { id: 'reboot', title: 'Reboot mental', description: 'Reprenez le contrôle de votre esprit et améliorez votre concentration.', icon: 'fas fa-brain' },
        { id: 'apprentissage', title: 'Apprentissage accéléré', description: 'Développez de nouvelles compétences et lisez plus efficacement.', icon: 'fas fa-book-reader' },
        { id: 'musculation', title: 'Prise de masse', description: 'Construisez du muscle et améliorez votre force avec nos plans d\'entraînement.', icon: 'fas fa-weight-lifter' },
        { id: 'cardio', title: 'Endurance', description: 'Améliorez votre santé cardiovasculaire et votre endurance.', icon: 'fas fa-heartbeat' }
    ];
    const allBadges = [
        { id: 'serie-7', title: 'Série de 7 jours', tooltip: 'Connectez-vous 7 jours d\'affilée.', icon: 'fas fa-medal' },
        { id: 'serie-30', title: 'Série de 30 jours', tooltip: 'Connectez-vous 30 jours d\'affilée.', icon: 'fas fa-calendar-alt' },
        { id: 'debutant', title: 'Débutant', tooltip: 'Terminez votre premier programme.', icon: 'fas fa-book-reader' },
        { id: 'expert', title: 'Expert', tooltip: 'Terminez 10 programmes.', icon: 'fas fa-graduation-cap' },
        { id: 'sprinter', title: 'Le sprinteur', tooltip: 'Faites un programme de sport en moins de 10 minutes.', icon: 'fas fa-running' },
        { id: 'muscle', title: 'Le Musclé', tooltip: 'Faites 100 exercices de force.', icon: 'fas fa-weight-lifter' },
        { id: 'yogi', title: 'Le Yogi', tooltip: 'Faites 10 séances de méditation.', icon: 'fas fa-mug-hot' }
    ];

    // --- Fonctions de rendu des pages ---
    function renderProfileData() {
        const nameEl = document.getElementById('profile-name');
        const emailEl = document.getElementById('profile-email');
        const memberSinceEl = document.getElementById('profile-member-since');
        const currentPlanEl = document.getElementById('current-plan-display');
        if (nameEl) nameEl.textContent = userData.name;
        if (emailEl) emailEl.textContent = userData.email;
        if (memberSinceEl) memberSinceEl.textContent = `Membre depuis le ${userData.memberSince}`;
        if (currentPlanEl) currentPlanEl.textContent = userData.plan;
    }
    function renderGoals() {
        const goalsList = document.getElementById('objectifs-list');
        if (!goalsList) return;
        goalsList.innerHTML = '';
        userGoals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.className = 'goal-item';
            li.innerHTML = `<span>${goal}</span><i class="fas fa-trash-alt" data-index="${index}"></i>`;
            goalsList.appendChild(li);
        });
    }
    function renderProfileGoals() {
        const profileGoalsList = document.getElementById('profile-goals-list');
        if (!profileGoalsList) return;
        profileGoalsList.innerHTML = '';
        if (userGoals.length > 0) {
            userGoals.slice(0, 3).forEach(goal => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-bullseye"></i> ${goal}`;
                profileGoalsList.appendChild(li);
            });
        } else {
            profileGoalsList.innerHTML = '<li><i class="fas fa-bullseye"></i> Aucun objectif défini</li>';
        }
    }
    function renderBadges() {
        const badgesContainer = document.querySelector('.badges-container');
        if (!badgesContainer) return;
        badgesContainer.innerHTML = '';
        allBadges.forEach(badge => {
            const isEarned = earnedBadges.includes(badge.id);
            const badgeEl = document.createElement('div');
            badgeEl.className = `badge-item ${isEarned ? 'earned' : ''}`;
            badgeEl.innerHTML = `<i class="${badge.icon} badge-icon"></i><p>${badge.title}</p><span class="badge-tooltip">${badge.tooltip}</span>`;
            badgesContainer.appendChild(badgeEl);
        });
    }
    function renderInProgressPrograms() {
        const programContainer = document.querySelector('.container .section');
        if (!programContainer || window.location.pathname.endsWith('programmes.html') || window.location.pathname.endsWith('index.html')) return;
        programContainer.innerHTML = '<h1>Mes programmes en cours</h1><p class="section-subtitle">Retrouvez ci-dessous tous les programmes que vous avez commencé.</p>';
        userPrograms.forEach(program => {
            const programCard = document.createElement('div');
            programCard.className = 'profile-card';
            programCard.innerHTML = `
                <h3>Programme : ${program.title}</h3>
                <p>Progression : <strong>${program.progression}%</strong></p>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${program.progression}%;"></div>
                </div>
                <a href="#" class="button">Continuer le programme</a>
            `;
            programContainer.appendChild(programCard);
        });
    }
    function renderSubscriptionStatus() {
        const currentPlanEl = document.getElementById('current-plan');
        const renewalDateEl = document.getElementById('renewal-date');
        if (currentPlanEl) {
            currentPlanEl.textContent = `Plan **${userSubscription.plan}**`;
            if (userSubscription.renewalDate) {
                renewalDateEl.textContent = `Renouvellement le : ${userSubscription.renewalDate}`;
            } else {
                renewalDateEl.textContent = 'Renouvellement le : N/A';
            }
        }
    }
    function renderPrivacySettings() {
        const visibilitySelect = document.getElementById('profile-visibility');
        const messagePrivacySelect = document.getElementById('message-privacy');
        const emailNotificationsToggle = document.getElementById('email-notifications');
        const communityMessagesToggle = document.getElementById('community-messages');
        if (visibilitySelect) {
            visibilitySelect.value = privacySettings.profileVisibility;
        }
        if (messagePrivacySelect) {
            messagePrivacySelect.value = privacySettings.messagePrivacy;
        }
        if (emailNotificationsToggle) {
            emailNotificationsToggle.checked = privacySettings.emailNotifications;
        }
        if (communityMessagesToggle) {
            communityMessagesToggle.checked = privacySettings.communityMessages;
        }
    }
    
    // --- Logique de gestion des événements ---
    const editProfileForm = document.querySelector('.edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('name').value;
            const newEmail = document.getElementById('email').value;
            userData.name = newName;
            userData.email = newEmail;
            saveData('userData', userData);
            alert('Profil mis à jour avec succès !');
        });
    }
    const addGoalForm = document.getElementById('add-objectif-form');
    if (addGoalForm) {
        addGoalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const goalInput = document.getElementById('objectif-name');
            if (goalInput.value) {
                userGoals.push(goalInput.value);
                saveData('userGoals', userGoals);
                renderGoals();
                goalInput.value = '';
                alert('Objectif ajouté !');
            }
        });
        const goalsList = document.getElementById('objectifs-list');
        if (goalsList) {
            goalsList.addEventListener('click', (e) => {
                if (e.target.classList.contains('fa-trash-alt')) {
                    const index = e.target.dataset.index;
                    userGoals.splice(index, 1);
                    saveData('userGoals', userGoals);
                    renderGoals();
                    alert('Objectif supprimé.');
                }
            });
        }
    }
    const planButtons = document.querySelectorAll('.plan-button');
    if (planButtons.length > 0) {
        planButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const planId = e.target.id;
                let newPlan, newPrice;
                switch(planId) {
                    case 'plan-free-btn':
                         newPlan = 'Free';
                         newPrice = '0 €';
                         break;
                    case 'plan-starter-btn':
                        newPlan = 'Starter';
                        newPrice = '9,99 €';
                        break;
                    case 'plan-premium-btn':
                        newPlan = 'Premium';
                        newPrice = '14,99 €';
                        break;
                    default:
                        return;
                }
                userSubscription.plan = newPlan;
                userSubscription.price = newPrice;
                userSubscription.renewalDate = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
                saveData('userSubscription', userSubscription);
                renderSubscriptionStatus();
                alert(`Félicitations ! Vous êtes maintenant sur le plan ${newPlan}.`);
            });
        });
    }
    const visibilitySelect = document.getElementById('profile-visibility');
    const messagePrivacySelect = document.getElementById('message-privacy');
    const emailNotificationsToggle = document.getElementById('email-notifications');
    const communityMessagesToggle = document.getElementById('community-messages');
    if (visibilitySelect) {
        visibilitySelect.addEventListener('change', () => {
            privacySettings.profileVisibility = visibilitySelect.value;
            saveData('privacySettings', privacySettings);
        });
    }
    if (messagePrivacySelect) {
        messagePrivacySelect.addEventListener('change', () => {
            privacySettings.messagePrivacy = messagePrivacySelect.value;
            saveData('privacySettings', privacySettings);
        });
    }
    if (emailNotificationsToggle) {
        emailNotificationsToggle.addEventListener('change', () => {
            privacySettings.emailNotifications = emailNotificationsToggle.checked;
            saveData('privacySettings', privacySettings);
        });
    }
    if (communityMessagesToggle) {
        communityMessagesToggle.addEventListener('change', () => {
            privacySettings.communityMessages = communityMessagesToggle.checked;
            saveData('privacySettings', privacySettings);
        });
    }
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                localStorage.clear();
                window.location.href = "deconnexion.html";
            }
        });
    }

    // --- Scripts de rendu au chargement de la page ---
    const pagePath = window.location.pathname;

    // Bloc de code pour la page des tarifs avec un bloc try...catch
    try {
        const priceButtons = document.querySelectorAll('.selector-btn');
        const priceCards = document.querySelectorAll('.price-card');
        
        if (priceCards.length > 0) {
            function updatePrices(period) {
                console.log(`Mise à jour des prix pour la période: ${period}`);
                priceCards.forEach(card => {
                    const priceValueElement = card.querySelector('.price-value');
                    const pricePeriodElement = card.querySelector('.price-period');
                    
                    if (!priceValueElement || !pricePeriodElement) {
                        console.warn(`Éléments de prix introuvables pour la carte. Card data-plan: ${card.dataset.plan}`);
                        return; 
                    }
                    
                    const newPrice = card.dataset[`price-${period}`];
                    
                    if (newPrice !== undefined) { // Utiliser !== undefined pour inclure "0€"
                        priceValueElement.textContent = newPrice;
                        if (newPrice === "0€") {
                            pricePeriodElement.textContent = '';
                        } else if (period === 'mensuel') {
                            pricePeriodElement.textContent = '/ mois';
                        } else if (period === 'annuel') { // S'assurer que 'annuel' est géré
                            pricePeriodElement.textContent = '/ an';
                        }
                    } else {
                        console.warn(`Attribut data-price-${period} introuvable pour le plan ${card.dataset.plan}`);
                    }
                });
            }

            // On attache un écouteur de clic à chaque bouton individuellement
            priceButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    console.log(`Bouton cliqué: ${e.target.textContent}`);
                    // On enlève la classe 'active' de tous les boutons
                    priceButtons.forEach(btn => btn.classList.remove('active'));
                    // On ajoute la classe 'active' au bouton cliqué
                    e.target.classList.add('active');
                    const period = e.target.dataset.period;
                    updatePrices(period);
                });
            });
            
            // Mise à jour initiale des prix au chargement de la page (pour le mensuel)
            updatePrices('mensuel');

            // Une deuxième passe après un court délai pour contrer d'éventuels scripts concurrents
            setTimeout(() => {
                // On s'assure que le bouton 'mensuel' est toujours actif si c'est l'état initial
                const activeButton = document.querySelector('.selector-btn.active');
                if (activeButton) {
                    updatePrices(activeButton.dataset.period);
                } else {
                    updatePrices('mensuel'); // Par défaut si aucun n'est actif
                }
            }, 100); // Délai de 100 millisecondes
        }
    } catch (error) {
        console.error("Erreur critique dans le script de la page Tarifs:", error);
    }
    
    // Autres scripts généraux de navigation et de rendu (laissés intacts)
    if (pagePath.endsWith('profil.html')) {
        renderProfileData();
        renderProfileGoals();
    } else if (pagePath.endsWith('objectifs.html')) {
        renderGoals();
    } else if (pagePath.endsWith('realisations.html')) {
        if (userPrograms.length > 0 && !earnedBadges.includes('debutant')) {
            earnedBadges.push('debutant');
            saveData('earnedBadges', earnedBadges);
        }
        renderBadges();
    } else if (pagePath.endsWith('mes-programmes-en-cours.html')) {
        renderInProgressPrograms();
    } else if (pagePath.endsWith('abonnement.html')) {
        renderSubscriptionStatus();
    } else if (pagePath.endsWith('confidentialite.html')) {
        renderPrivacySettings();
    } else if (pagePath.endsWith('programmes.html')) {
        const searchBar = document.getElementById('search-bar');
        const programGrid = document.querySelector('.program-grid');
        function renderPrograms(programs) {
            if (!programGrid) return;
            programGrid.innerHTML = '';
            programs.forEach(program => {
                const programCard = document.createElement('div');
                programCard.className = 'program-card';
                programCard.innerHTML = `
                    <i class="${program.icon} program-icon"></i>
                    <h3>${program.title}</h3>
                    <p>${program.description}</p>
                    <a href="#" class="button small-button">Découvrir</a>
                `;
                programGrid.appendChild(programCard);
            });
        }
        renderPrograms(allPrograms);
        if (searchBar) {
            searchBar.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filteredPrograms = allPrograms.filter(program => 
                    program.title.toLowerCase().includes(query) || 
                    program.description.toLowerCase().includes(query)
                );
                renderPrograms(filteredPrograms);
            });
        }
    }
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled-navbar');
            } else {
                navbar.classList.remove('scrolled-navbar');
            }
        });
    }
});