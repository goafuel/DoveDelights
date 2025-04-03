document.addEventListener('DOMContentLoaded', function() {
    // Add labels to date inputs
    document.querySelectorAll('input[type="date"]').forEach(dateInput => {
        if (!dateInput.previousElementSibling || !dateInput.previousElementSibling.tagName === 'LABEL') {
            const label = document.createElement('label');
            label.textContent = dateInput.getAttribute('placeholder') || 'Date';
            dateInput.parentNode.insertBefore(label, dateInput);
        }
    });

    // Handle form submissions with WhatsApp integration
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData.entries());
            
            // Prepare WhatsApp message based on form type
            let whatsappMessage = "Hi Dove Delights, \n\nI'm interested in ";
            
            if (form.id === 'booking-form') {
                whatsappMessage += `booking your venue for ${formObject['event-type'] || 'an event'}.\n\n`;
                whatsappMessage += `Name: ${formObject.name || ''}\n`;
                whatsappMessage += `Event Type: ${formObject['event-type'] || ''}\n`;
                whatsappMessage += `Date: ${formObject.date || ''}\n`;
                whatsappMessage += `Guests: ${formObject.guests || ''}\n`;
                whatsappMessage += `Additional Details: ${formObject.message || 'None'}`;
            } 
            else if (form.id === 'order-form') {
                whatsappMessage += `your catering services for ${formObject['service-type'] || 'an event'}.\n\n`;
                whatsappMessage += `Name: ${formObject.name || ''}\n`;
                whatsappMessage += `Event Date: ${formObject.date || ''}\n`;
                whatsappMessage += `Guests: ${formObject.guests || ''}\n`;
                whatsappMessage += `Service Type: ${formObject['service-type'] || ''}\n`;
                whatsappMessage += `Special Requests: ${formObject.message || 'None'}`;
            }
            else {
                whatsappMessage += "your services. Please contact me.";
            }
            
            // Encode for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/919822182917?text=${encodedMessage}`, '_blank');
            
            // Show success UI
            showFormSuccess(form);
        });
    });
    
    function showFormSuccess(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 3000);
        }, 1500);
    }
});
