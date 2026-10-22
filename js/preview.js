document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const templateName = params.get("template");
    const templateId = params.get("id"); // Get template ID if passed

    // Complete template mapping for ALL templates
    const templateMap = {
        // Modern templates
        "Modern 1": "modern_cv1.html",
        "Modern 2": "modern_cv2.html",
        "Modern 3": "modern_cv3.html",
        "Modern 4": "modern_cv4.html",
        "Modern 5": "modern_cv5.html",
        
        // Professional templates
        "Professional 1": "professional1.html",
        "Professional 2": "professional2.html",
        "Professional 3": "professional3.html",
        
        // Basic templates
        "Basic 1": "basic1.html",
        "Basic 2": "basic2.html"
    };

    // Alternative mapping using template IDs (if you use IDs instead of names)
    const templateIdMap = {
        "modern1": "modern_cv1.html",
        "modern2": "modern_cv2.html",
        "modern3": "modern_cv3.html",
        "modern4": "modern_cv4.html",
        "modern5": "modern_cv5.html",
        "professional1": "professional1.html",
        "professional2": "professional2.html",
        "professional3": "professional3.html",
        "basic1": "basic1.html",
        "basic2": "basic2.html"
    };

    const frame = document.getElementById("cvFrame");
    if (!frame) return; // script is only meant for preview.html
    const headerTitle = document.querySelector(".header-title");

    // Determine which template to load
    let templateFile = null;
    let displayName = templateName || "Modern 3";

    // First try by template name
    if (templateMap[templateName]) {
        templateFile = templateMap[templateName];
    } 
    // Then try by template ID
    else if (templateIdMap[templateId]) {
        templateFile = templateIdMap[templateId];
        // Try to get display name from templateId
        const nameMap = {
            "modern1": "Modern 1",
            "modern2": "Modern 2",
            "modern3": "Modern 3",
            "modern4": "Modern 4",
            "modern5": "Modern 5",
            "professional1": "Professional 1",
            "professional2": "Professional 2",
            "professional3": "Professional 3",
            "basic1": "Basic 1",
            "basic2": "Basic 2"
        };
        displayName = nameMap[templateId] || displayName;
    }
    // If no match found, check if it's a direct filename
    else if (templateName && (
        templateName.includes("professional") || 
        templateName.includes("basic") || 
        templateName.includes("modern")
    )) {
        // Assume it's already a filename
        templateFile = templateName.endsWith('.html') ? templateName : templateName + '.html';
        displayName = formatTemplateName(templateName);
    }
    // Default to Modern 3
    else {
        templateFile = "modern_cv3.html";
        displayName = "Modern 3";
    }

    // Load the template
    if (templateFile) {
        frame.src = templateFile;
        if (headerTitle) headerTitle.textContent = displayName;
        localStorage.setItem("selectedTemplate", displayName);
        localStorage.setItem("selectedTemplateFile", templateFile);
        console.log(`[Preview] Loading: ${templateFile} for ${displayName}`);
    } else {
        frame.src = "modern_cv3.html";
        if (headerTitle) headerTitle.textContent = "Modern 3";
    }

    // Helper function to format template names from filenames
    function formatTemplateName(filename) {
        if (filename.includes('professional')) {
            const num = filename.match(/\d+/)?.[0] || '1';
            return `Professional ${num}`;
        } else if (filename.includes('basic')) {
            const num = filename.match(/\d+/)?.[0] || '1';
            return `Basic ${num}`;
        } else if (filename.includes('modern')) {
            const num = filename.match(/\d+/)?.[0] || '3';
            return `Modern ${num}`;
        }
        return filename.replace('.html', '').replace(/_/g, ' ');
    }

    // Edit button
    document.getElementById("editBtn")?.addEventListener("click", function () {
        const selectedTemplate = localStorage.getItem("selectedTemplate") || "Modern 3";
        const selectedTemplateId = getTemplateIdFromName(selectedTemplate);
        window.location.href = `builder.html?template=${encodeURIComponent(selectedTemplate)}&id=${selectedTemplateId}`;
    });

    // Print button
    document.getElementById("printBtn")?.addEventListener("click", function () {
        if (frame.contentWindow) {
            frame.contentWindow.print();
        } else {
            alert("Preview not fully loaded yet. Please try again.");
        }
    });

    // Helper function to get template ID from display name
    function getTemplateIdFromName(name) {
        const idMap = {
            "Modern 1": "modern1",
            "Modern 2": "modern2",
            "Modern 3": "modern3",
            "Modern 4": "modern4",
            "Modern 5": "modern5",
            "Professional 1": "professional1",
            "Professional 2": "professional2",
            "Professional 3": "professional3",
            "Basic 1": "basic1",
            "Basic 2": "basic2"
        };
        return idMap[name] || name.toLowerCase().replace(' ', '');
    }
    
});