document.addEventListener('DOMContentLoaded', function() {
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message
            showFormSuccess(this);
            
            // For demo purposes, we'll just log the data
            console.log('Form submitted:', formObject);
            
            // In a real implementation, you would send this to your server:
            /*
            fetch('your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
            .then(response => response.json())
            .then(data => {
                showFormSuccess(form);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again.');
            });
            */
        });
    });
    
    // WhatsApp Booking/Order Buttons
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default if it's a button (not a link)
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                
                // Get the page context (nest or cater)
                const pageContext = window.location.pathname.includes('nest.html') ? 'venue booking' : 'catering service';
                
                // Create pre-filled message based on page
                let message = `Hi Dove Delights, I'm interested in your ${pageContext}.`;
                
                // If on booking page with form filled
                if (pageContext === 'venue booking' && document.querySelector('#booking-form')) {
                    const form = document.querySelector('#booking-form');
                    const name = form.querySelector('[name="name"]')?.value || '';
                    const eventType = form.querySelector('[name="event-type"]')?.value || '';
                    const date = form.querySelector('[name="date"]')?.value || '';
                    const guests = form.querySelector('[name="guests"]')?.value || '';
                    
                    if (name) message += `\n\nName: ${name}`;
                    if (eventType) message += `\nEvent Type: ${eventType}`;
                    if (date) message += `\nDate: ${date}`;
                    if (guests) message += `\nNumber of Guests: ${guests}`;
                }
                
                // If on catering page with form filled
                if (pageContext === 'catering service' && document.querySelector('#order-form')) {
                    const form = document.querySelector('#order-form');
                    const name = form.querySelector('[name="name"]')?.value || '';
                    const eventDate = form.querySelector('[name="event-date"]')?.value || '';
                    const guests = form.querySelector('[name="guests"]')?.value || '';
                    const serviceType = form.querySelector('[name="service-type"]')?.value || '';
                    
                    if (name) message += `\n\nName: ${name}`;
                    if (eventDate) message += `\nEvent Date: ${eventDate}`;
                    if (guests) message += `\nNumber of Guests: ${guests}`;
                    if (serviceType) message += `\nService Type: ${serviceType}`;
                }
                
                // Encode the message for URL
                const encodedMessage = encodeURIComponent(message);
                
                // Open WhatsApp with pre-filled message
                window.open(`https://wa.me/919822182917?text=${encodedMessage}`, '_blank');
            }
        });
    });
    
    // Form success animation
    function showFormSuccess(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call delay
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);
        }, 1500);
    }
    
    // Auto-fill WhatsApp message from form data (optional enhancement)
    document.querySelectorAll('form input, form select, form textarea').forEach(input => {
        input.addEventListener('change', function() {
            // This would update the WhatsApp button's data-message attribute
            // You could implement this if you want the WhatsApp message to update
            // in real-time as the user fills out the form
        });
    });
});