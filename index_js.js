// Collapsible Code Blocks Extension for SillyTavern
(function() {
    'use strict';
    
    const extensionName = "Collapsible Code Blocks";
    
    function makeCollapsible() {
        const codeBlocks = document.querySelectorAll('pre');
        
        codeBlocks.forEach(pre => {
            // Skip if already processed
            if (pre.hasAttribute('data-collapsible')) return;
            
            // Mark as processed
            pre.setAttribute('data-collapsible', 'true');
            
            // Start collapsed
            pre.classList.add('collapsed');
            
            // Add click handler
            pre.addEventListener('click', function(e) {
                // Prevent triggering when clicking the copy button
                if (e.target.classList.contains('fa-copy')) return;
                
                this.classList.toggle('collapsed');
            });
        });
    }
    
    // Initialize when DOM is ready
    function init() {
        // Run initially
        makeCollapsible();
        
        // Watch for new code blocks being added
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    makeCollapsible();
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log(`[${extensionName}] Initialized`);
    }
    
    // Wait for SillyTavern to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();