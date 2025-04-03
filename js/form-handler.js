// Enhanced Dove Delights Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // Booking Form (Dove Nest)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('[name="name"]').value,
                email: this.querySelector('[name="email"]').value,
                phone: this.querySelector('[name="phone"]').value,
                eventType: this.querySelector('[name="event-type"]').value,
                date: this.querySelector('[name="date"]').value,
                guests: this.querySelector('[name="guests"]').value,
                message: this.querySelector('[name="message"]').value || 'None'
            };
            
            // Validate required fields
            if (!formData.name || !formData.phone || !formData.eventType || !formData.date || !formData.guests) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = 
                `*New Venue Booking Inquiry*%0A%0A` +
                `*Name:* ${formData.name}%0A` +
                `*Phone:* ${formData.phone}%0A` +
                (formData.email ? `*Email:* ${formData.email}%0A` : '') +
                `*Event Type:* ${formData.eventType}%0A` +
                `*Date:* ${formData.date}%0A` +
                `*Guests:* ${formData.guests}%0A%0A` +
                `*Additional Details:*%0A${formData.message.replace(/\n/g, '%0A')}`;
            
            window.open(`https://wa.me/919822182917?text=${whatsappMessage}`, '_blank');
            
            // Show confirmation
            alert('Your booking request has been submitted! We\'ve opened WhatsApp for you to confirm the details.');
            
            this.reset();
        });
    }

    // Order Form (Dove Caterers)
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('[name="name"]').value,
                email: this.querySelector('[name="email"]').value,
                phone: this.querySelector('[name="phone"]').value,
                eventDate: this.querySelector('[name="event-date"]').value,
                guests: this.querySelector('[name="guests"]').value,
                serviceType: this.querySelector('[name="service-type"]').value,
                menuPreference: this.querySelector('[name="menu-preference"]').value || 'No preference',
                message: this.querySelector('[name="message"]').value || 'None'
            };
            
            // Validate required fields
            if (!formData.name || !formData.phone || !formData.eventDate || !formData.guests || !formData.serviceType) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = 
                `*New Catering Order Inquiry*%0A%0A` +
                `*Name:* ${formData.name}%0A` +
                `*Phone:* ${formData.phone}%0A` +
                (formData.email ? `*Email:* ${formData.email}%0A` : '') +
                `*Event Date:* ${formData.eventDate}%0A` +
                `*Guests:* ${formData.guests}%0A` +
                `*Service Type:* ${formData.serviceType}%0A` +
                `*Menu Preference:* ${formData.menuPreference}%0A%0A` +
                `*Special Requests:*%0A${formData.message.replace(/\n/g, '%0A')}`;
            
            window.open(`https://wa.me/919822182917?text=${whatsappMessage}`, '_blank');
            
            // Show confirmation
            alert('Your catering request has been submitted! We\'ve opened WhatsApp for you to confirm the details.');
            
            this.reset();
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('[name="name"]').value,
                email: this.querySelector('[name="email"]').value,
                subject: this.querySelector('[name="subject"]').value,
                message: this.querySelector('[name="message"]').value
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create email body
            const emailBody = 
                `Name: ${formData.name}%0D%0A` +
                `Email: ${formData.email}%0D%0A` +
                (formData.subject ? `Subject: ${formData.subject}%0D%0A%0D%0A` : '%0D%0A') +
                `${formData.message.replace(/\n/g, '%0D%0A')}`;
            
            window.open(`mailto:info@dovedelights.com?subject=${encodeURIComponent(formData.subject || 'Website Inquiry')}&body=${emailBody}`);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            this.reset();
        });
    }

    // Add labels to date inputs if missing
    document.querySelectorAll('input[type="date"]').forEach(dateInput => {
        if (!dateInput.previousElementSibling || dateInput.previousElementSibling.tagName !== 'LABEL') {
            const label = document.createElement('label');
            label.textContent = dateInput.getAttribute('placeholder') || 'Date';
            dateInput.parentNode.insertBefore(label, dateInput);
        }
    });
});
