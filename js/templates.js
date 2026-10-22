/**
 * CV Builder - Templates Page
 * Handles template selection, localStorage, and navigation
 */

(function() {
    'use strict';

    // Wait for everything to load
    window.addEventListener('load', function() {
        init();
    });

    function init() {
        console.log("Templates page initializing...");
        
        // Get DOM elements after everything is loaded
        const templateCards = document.querySelectorAll('.template-card');
        const previewButtons = document.querySelectorAll('.btn-preview');
        const editButtons = document.querySelectorAll('.btn-edit');

        console.log("Found template cards:", templateCards.length);
        console.log("Found preview buttons:", previewButtons.length);
        console.log("Found edit buttons:", editButtons.length);

        // Constants
        const STORAGE_KEY = 'selectedTemplate';
        const TEMPLATE_FILE_KEY = 'selectedTemplateFile';
        const DEFAULT_TEMPLATE = 'Modern 3';

        /**
         * Template file mapping - Connect display names to actual HTML files
         */
        const TEMPLATE_FILES = {
            // Modern templates
            'Modern 1': 'modern_cv1.html',
            'Modern 2': 'modern_cv2.html',
            'Modern 3': 'modern_cv3.html',
            'Modern 4': 'modern_cv4.html',
            'Modern 5': 'modern_cv5.html',
            
            // Professional templates
            'Professional 1': 'professional1.html',
            'Professional 2': 'professional2.html',
            'Professional 3': 'professional3.html',
            
            // Basic templates
            'Basic 1': 'basic1.html',
            'Basic 2': 'basic2.html'
        };

        /**
         * Template ID mapping - Connect display names to internal IDs
         */
        const TEMPLATE_IDS = {
            // Modern templates
            'Modern 1': 'modern1',
            'Modern 2': 'modern2',
            'Modern 3': 'modern3',
            'Modern 4': 'modern4',
            'Modern 5': 'modern5',
            
            // Professional templates
            'Professional 1': 'professional1',
            'Professional 2': 'professional2',
            'Professional 3': 'professional3',
            
            // Basic templates
            'Basic 1': 'basic1',
            'Basic 2': 'basic2'
        };

        /**
         * Template categories for styling
         */
        const TEMPLATE_CATEGORIES = {
            'Professional 1': 'professional',
            'Professional 2': 'professional',
            'Professional 3': 'professional',
            'Basic 1': 'basic',
            'Basic 2': 'basic',
            'Modern 1': 'modern',
            'Modern 2': 'modern',
            'Modern 3': 'modern',
            'Modern 4': 'modern',
            'Modern 5': 'modern'
        };

        // Check if template cards have data attributes
        templateCards.forEach(card => {
            const templateName = card.dataset.template;
            console.log(`Card found: ${templateName}`);
            
            if (!templateName) {
                console.warn("Card missing data-template attribute:", card);
            }
        });

        /**
         * Apply category classes to template cards
         */
        function applyTemplateCategories() {
            templateCards.forEach(card => {
                const templateName = card.dataset.template;
                const category = TEMPLATE_CATEGORIES[templateName];
                
                if (category) {
                    card.classList.add(`${category}-category`);
                }
                
                // Add specific styling for professional and basic templates
                if (templateName && templateName.includes('Professional')) {
                    card.classList.add('professional-template');
                    // Add professional badge if not already present
                    if (!card.querySelector('.template-badge')) {
                        const badge = document.createElement('span');
                        badge.className = 'template-badge professional-badge';
                        badge.textContent = 'PRO';
                        card.appendChild(badge);
                    }
                } else if (templateName && templateName.includes('Basic')) {
                    card.classList.add('basic-template');
                    // Add basic badge if not already present
                    if (!card.querySelector('.template-badge')) {
                        const badge = document.createElement('span');
                        badge.className = 'template-badge basic-badge';
                        badge.textContent = 'BASIC';
                        card.appendChild(badge);
                    }
                }
            });
        }

        /**
         * Load and highlight previously selected template
         */
        function loadSelectedTemplate() {
            const selectedTemplate = localStorage.getItem(STORAGE_KEY) || DEFAULT_TEMPLATE;
            
            templateCards.forEach(card => {
                const templateName = card.dataset.template;
                if (templateName === selectedTemplate) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            });

            console.log(`[CV Builder] Active template: ${selectedTemplate}`);
        }

        /**
         * Save selected template to localStorage
         */
        function saveSelectedTemplate(templateName) {
            try {
                const templateFile = TEMPLATE_FILES[templateName];
                const templateId = TEMPLATE_IDS[templateName];
                
                localStorage.setItem(STORAGE_KEY, templateName);
                localStorage.setItem(TEMPLATE_FILE_KEY, templateFile);
                localStorage.setItem('selectedTemplateId', templateId);
                
                console.log(`[CV Builder] Template saved: ${templateName} (${templateFile})`);
                return true;
            } catch (error) {
                console.error('[CV Builder] Failed to save template:', error);
                return false;
            }
        }

        /**
         * Get template ID from display name
         */
        function getTemplateId(templateName) {
            return TEMPLATE_IDS[templateName] || templateName.toLowerCase().replace(' ', '');
        }

        /**
         * Get template file from display name
         */
        function getTemplateFile(templateName) {
            return TEMPLATE_FILES[templateName] || templateName.toLowerCase().replace(' ', '') + '.html';
        }

        /**
         * Select template
         */
        function selectTemplate(selectedCard) {
            templateCards.forEach(card => {
                card.classList.remove('selected');
            });
            selectedCard.classList.add('selected');
            const templateName = selectedCard.dataset.template;
            if (templateName) {
                saveSelectedTemplate(templateName);
            }
        }

        /**
         * Handle preview button click
         */
        function handlePreview(event, card) {
            event.preventDefault();
            event.stopPropagation();
            
            const templateName = card.dataset.template;
            if (!templateName) {
                console.error("No template name found on card");
                return;
            }
            
            const templateId = getTemplateId(templateName);
            
            saveSelectedTemplate(templateName);
            
            console.log(`Previewing template: ${templateName} (${templateId})`);
            
            // Open preview in new window
            window.open(`preview.html?template=${encodeURIComponent(templateName)}&id=${templateId}`, '_blank');
        }

        /**
         * Handle edit button click
         */
        function handleEdit(event, card) {
            event.preventDefault();
            event.stopPropagation();
            
            const templateName = card.dataset.template;
            if (!templateName) {
                console.error("No template name found on card");
                return;
            }
            
            const templateId = getTemplateId(templateName);
            const templateFile = getTemplateFile(templateName);
            
            // Save template info to localStorage
            saveSelectedTemplate(templateName);
            
            console.log(`Editing template: ${templateName} (${templateFile})`);
            
            // Go to builder.html with the template parameter
            window.location.href = `builder.html?template=${encodeURIComponent(templateName)}&id=${templateId}`;
        }

        /**
         * Attach event listeners
         */
        function attachEventListeners() {
            // Card click for selection
            templateCards.forEach(card => {
                // Remove any existing listeners by cloning and replacing
                const newCard = card.cloneNode(true);
                card.parentNode.replaceChild(newCard, card);
                
                newCard.addEventListener('click', (e) => {
                    // Don't trigger if clicking on a button
                    if (e.target.closest('button')) return;
                    selectTemplate(newCard);
                });

                // Keyboard accessibility
                newCard.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        if (!event.target.closest('button')) {
                            selectTemplate(newCard);
                        }
                    }
                });

                newCard.setAttribute('tabindex', '0');
                newCard.setAttribute('role', 'button');
                newCard.setAttribute('aria-label', `Select ${newCard.dataset.template || 'template'} template`);
            });

            // Re-get the cards after cloning
            const updatedCards = document.querySelectorAll('.template-card');
            
            // Preview buttons
            updatedCards.forEach(card => {
                const previewBtn = card.querySelector('.btn-preview');
                if (previewBtn) {
                    previewBtn.addEventListener('click', (event) => {
                        handlePreview(event, card);
                    });
                }
            });

            // Edit buttons
            updatedCards.forEach(card => {
                const editBtn = card.querySelector('.btn-edit');
                if (editBtn) {
                    editBtn.addEventListener('click', (event) => {
                        handleEdit(event, card);
                    });
                }
            });
        }

        // Apply categories
        applyTemplateCategories();
        
        // Load selected template
        loadSelectedTemplate();
        
        // Attach event listeners
        attachEventListeners();
        
        console.log("Templates page initialized");
    }
})();