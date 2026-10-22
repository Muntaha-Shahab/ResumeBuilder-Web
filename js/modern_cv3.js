/**
 * Timeline CV Template - Premium Modern
 * Animated timeline, skill tags, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== DOM Elements ==========
    const cvCard = document.getElementById('cvCard');
    const editBtn = document.getElementById('editBtn');
    const printBtn = document.getElementById('printBtn');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const timelineCards = document.querySelectorAll('.timeline-card');
    const skillTags = document.querySelectorAll('.skill-tag');
    const sections = document.querySelectorAll('.content-section');
    
    // ========== Initialize ==========
    console.log('🚀 Premium Timeline CV initialized');
    initAnimations();
    attachEventListeners();
    
    // ========== Animation Functions ==========
    function initAnimations() {
        console.log('📊 Starting premium animations...');
        
        // Fade in CV card
        if (cvCard) {
            cvCard.style.opacity = '0';
            cvCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                cvCard.style.transition = 'all 0.6s ease';
                cvCard.style.opacity = '1';
                cvCard.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate timeline nodes with glow effect
        timelineNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.transition = 'all 0.3s ease';
                node.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    node.style.transform = 'scale(1)';
                }, 300);
            }, 500 + (index * 200));
        });
        
        // Log skill tags count
        console.log(`🏷️ Loaded ${skillTags.length} skill tags`);
    }
    
    // ========== Event Listeners ==========
    function attachEventListeners() {
        
        // Edit button
        if (editBtn) {
            editBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleEditClick();
            });
        }
        
        // Print button
        if (printBtn) {
            printBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handlePrint();
            });
        }
        
        // Timeline node hover effects
        timelineNodes.forEach(node => {
            node.addEventListener('mouseenter', function() {
                const year = this.getAttribute('data-year') || 'unknown';
                console.log(`📅 Timeline node: ${year}`);
                
                // Find associated card and highlight it
                const wrapper = this.closest('.timeline-node-wrapper');
                const card = wrapper?.querySelector('.timeline-card');
                if (card) {
                    card.style.transition = 'all 0.3s ease';
                    card.style.backgroundColor = 'white';
                    card.style.boxShadow = 'var(--card-shadow-hover)';
                }
            });
            
            node.addEventListener('mouseleave', function() {
                const wrapper = this.closest('.timeline-node-wrapper');
                const card = wrapper?.querySelector('.timeline-card');
                if (card) {
                    card.style.backgroundColor = '';
                    card.style.boxShadow = '';
                }
            });
        });
        
        // Timeline card hover effects
        timelineCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const role = this.querySelector('.timeline-role')?.textContent || 'Unknown';
                console.log(`💼 Experience: ${role}`);
            });
        });
        
        // Skill tag clicks
        skillTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const skill = this.textContent.trim();
                console.log(`🏆 Skill selected: ${skill}`);
                
                // Visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
            
            // Hover logging (limited to avoid console spam)
            tag.addEventListener('mouseenter', function() {
                // Optional: log on hover
            });
        });
        
        // Keyboard shortcut: Ctrl+P
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                handlePrint();
            }
        });
        
        // Add smooth scroll to top when clicking header
        const headerLeft = document.querySelector('.header-left');
        if (headerLeft) {
            headerLeft.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // ========== Edit Handler ==========
    function handleEditClick() {
        console.log('✏️ Edit CV clicked');
        
        // Visual feedback
        editBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Loading...';
        editBtn.disabled = true;
        
        // Simulate loading
        setTimeout(() => {
            editBtn.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Edit CV';
            editBtn.disabled = false;
            
            // Show success message
            showNotification('Edit mode ready', 'success');
            
            // In production, this would redirect to builder
            // window.location.href = 'builder.html';
        }, 800);
    }
    
    // ========== Print Handler ==========
    function handlePrint() {
        console.log('🖨️ Preparing premium CV for print...');
        
        // Show preparing message
        showNotification('Preparing PDF...', 'info');
        
        // Ensure all animations are complete for print
        timelineCards.forEach(card => {
            card.style.transform = 'none';
        });
        
        // Trigger print after short delay
        setTimeout(() => {
            window.print();
            
            // Log after print dialog closes
            setTimeout(() => {
                console.log('✅ Print dialog closed');
            }, 1000);
        }, 300);
    }
    
    // ========== Notification System ==========
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existing = document.querySelector('.cv-notification');
        if (existing) existing.remove();
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cv-notification';
        notification.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
        `;
        
        // Style notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.background = type === 'success' ? 'var(--teal)' : 'var(--blue)';
        notification.style.color = 'white';
        notification.style.padding = '0.8rem 1.5rem';
        notification.style.borderRadius = '50px';
        notification.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        notification.style.zIndex = '1000';
        notification.style.fontWeight = '500';
        notification.style.fontSize = '0.9rem';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.animation = 'slideIn 0.3s ease';
        
        // Add animation keyframes if not exists
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ========== Data Persistence (Future Enhancement) ==========
    function loadCVData() {
        // This would load from localStorage in production
        console.log('📂 Checking for saved CV data...');
        
        try {
            const savedData = localStorage.getItem('timelineCVData');
            if (savedData) {
                const data = JSON.parse(savedData);
                console.log('✅ Found saved data:', data);
                // Update UI with saved data
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
    
    // ========== Export API ==========
    window.timelineCV = {
        print: handlePrint,
        edit: handleEditClick,
        getTimelineData: function() {
            const timelineData = [];
            timelineCards.forEach(card => {
                const role = card.querySelector('.timeline-role')?.textContent;
                const company = card.querySelector('.timeline-company')?.textContent;
                const date = card.querySelector('.timeline-date')?.textContent;
                timelineData.push({ role, company, date });
            });
            return timelineData;
        },
        
        getSkills: function() {
            return Array.from(skillTags).map(tag => tag.textContent.trim());
        }
    };
    
    // ========== Performance Logging ==========
    console.log(`⏱️ Timeline CV ready at ${new Date().toLocaleTimeString()}`);
    console.log('✅ Premium timeline template fully loaded');
    
    // Load any saved data
    loadCVData();
});