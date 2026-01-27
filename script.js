/* ========================================
   PORTAIL QHSE - LES MOUSQUETAIRES
   JavaScript Principal
   ======================================== */

// ========================================
// NAVIGATION & PAGES
// ========================================

/**
 * Affiche une page spécifique
 * @param {string} pageId - L'identifiant de la page (sans le préfixe 'page-')
 */
function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Mettre à jour l'état actif du menu
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Fermer la sidebar sur mobile
    if (window.innerWidth <= 1024) {
        document.getElementById('sidebar').classList.remove('open');
    }
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Analytics (optionnel)
    console.log('Page visitée:', pageId);
}

// ========================================
// SIDEBAR
// ========================================

/**
 * Affiche/Masque la sidebar (mobile)
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

/**
 * Affiche/Masque un sous-menu
 * @param {HTMLElement} element - L'élément nav-link cliqué
 */
function toggleSubmenu(element) {
    const parent = element.parentElement;
    
    // Fermer les autres sous-menus ouverts
    document.querySelectorAll('.nav-item.open').forEach(item => {
        if (item !== parent) {
            item.classList.remove('open');
        }
    });
    
    // Toggle le sous-menu actuel
    parent.classList.toggle('open');
}

// ========================================
// ACCORDÉON
// ========================================

/**
 * Toggle un élément d'accordéon
 * @param {HTMLElement} element - L'élément accordion-header cliqué
 */
function toggleAccordion(element) {
    const parent = element.parentElement;
    
    // Fermer les autres accordéons ouverts
    document.querySelectorAll('.accordion-item.open').forEach(item => {
        if (item !== parent) {
            item.classList.remove('open');
        }
    });
    
    // Toggle l'accordéon actuel
    parent.classList.toggle('open');
}

// ========================================
// ONGLETS (TABS)
// ========================================

/**
 * Change d'onglet
 * @param {HTMLElement} element - L'onglet cliqué
 * @param {string} tabId - L'identifiant du contenu à afficher
 */
function switchTab(element, tabId) {
    // Retirer la classe active de tous les onglets
    const tabContainer = element.parentElement;
    tabContainer.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Ajouter la classe active à l'onglet cliqué
    element.classList.add('active');
    
    // Masquer tous les contenus d'onglets
    const section = element.closest('.content-section');
    section.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Afficher le contenu demandé
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// ========================================
// MODALES
// ========================================

/**
 * Ouvre une modale
 * @param {string} modalId - L'identifiant de la modale (sans le préfixe 'modal-')
 */
function openModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    }
}

/**
 * Ferme une modale
 * @param {string} modalId - L'identifiant de la modale (sans le préfixe 'modal-')
 */
function closeModal(modalId) {
    const modal = document.getElementById('modal-' + modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le scroll
    }
}

// ========================================
// NOTIFICATIONS TOAST
// ========================================

/**
 * Affiche une notification toast
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de notification (success, error, warning)
 */
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    
    // Créer l'élément toast
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    
    // Définir l'icône selon le type
    let icon = 'check-circle';
    if (type === 'error') icon = 'times-circle';
    if (type === 'warning') icon = 'exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Ajouter au container
    container.appendChild(toast);
    
    // Supprimer automatiquement après 3 secondes
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ========================================
// RECHERCHE GLOBALE
// ========================================

/**
 * Initialise la recherche globale
 */
function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                showToast('Recherche: "' + this.value + '"', 'success');
                // Ici vous pourriez implémenter une vraie recherche
                console.log('Recherche effectuée:', this.value);
            }
        });
    }
}

// ========================================
// GESTION DES ÉVÉNEMENTS GLOBAUX
// ========================================

/**
 * Initialise tous les événements au chargement de la page
 */
function initEvents() {
    // Fermer les modales en cliquant à l'extérieur
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Fermer la sidebar en cliquant à l'extérieur (mobile)
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 1024 && sidebar && menuToggle) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Fermer les modales avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
    
    // Initialiser la recherche
    initGlobalSearch();
}

// ========================================
// UTILITAIRES
// ========================================

/**
 * Formate une date en français
 * @param {Date} date - L'objet Date à formater
 * @returns {string} La date formatée
 */
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}

/**
 * Formate un nombre avec séparateur de milliers
 * @param {number} num - Le nombre à formater
 * @returns {string} Le nombre formaté
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Télécharge un fichier (simulation)
 * @param {string} fileName - Le nom du fichier
 */
function downloadFile(fileName) {
    showToast('Téléchargement de "' + fileName + '" en cours...', 'success');
    console.log('Téléchargement:', fileName);
}

/**
 * Affiche un aperçu de fichier (simulation)
 * @param {string} fileName - Le nom du fichier
 */
function previewFile(fileName) {
    openModal('preview');
    console.log('Aperçu:', fileName);
}

// ========================================
// GESTION DU RESPONSIVE
// ========================================

/**
 * Gère le redimensionnement de la fenêtre
 */
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    
    if (window.innerWidth > 1024) {
        // Desktop: sidebar toujours visible
        sidebar.classList.remove('open');
    }
}

// Écouter le redimensionnement
window.addEventListener('resize', handleResize);

// ========================================
// INITIALISATION
// ========================================

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function() {
    // Afficher la page d'accueil par défaut
    showPage('home');
    
    // Initialiser les événements
    initEvents();
    
    // Log de démarrage
    console.log('🏪 Portail QHSE Les Mousquetaires - Initialisé');
});

// ========================================
// SERVICE WORKER (Optionnel - Pour PWA)
// ========================================

// Enregistrement du Service Worker si disponible
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker enregistré');
        //     })
        //     .catch(function(error) {
        //         console.log('ServiceWorker erreur:', error);
        //     });
    });
}