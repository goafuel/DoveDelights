// Booking Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        // Initialize booking number
        let bookingNumber = localStorage.getItem('bookingNumber') || 1000;

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Increment booking number
            bookingNumber++;
            localStorage.setItem('bookingNumber', bookingNumber);
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                eventType: document.getElementById('event-type').value,
                eventDate: document.getElementById('event-date').value,
                guestCount: document.getElementById('guest-count').value,
                requirements: document.getElementById('requirements').value,
                additionalInfo: document.getElementById('additional-info').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.eventType || !formData.eventDate || !formData.guestCount) {
                alert('Please fill in all required fields marked with *');
                return;
            }
            
            // Create WhatsApp message
            const message = `*New Booking #${bookingNumber}*%0A%0A` +
                           `*Name:* ${formData.name}%0A` +
                           `*Email:* ${formData.email}%0A` +
                           `*Phone:* ${formData.phone}%0A` +
                           `*Event Type:* ${formData.eventType}%0A` +
                           `*Event Date:* ${formData.eventDate}%0A` +
                           `*Guest Count:* ${formData.guestCount}%0A%0A` +
                           `*Requirements:*%0A${formData.requirements || 'None'}%0A%0A` +
                           `*Additional Info:*%0A${formData.additionalInfo || 'None'}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/919822182917?text=${message}`, '_blank');
            
            // Show confirmation
            alert(`Booking #${bookingNumber} submitted! We'll contact you shortly.`);
            
            // Reset form
            this.reset();
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('[type="text"]').value,
                email: this.querySelector('[type="email"]').value,
                subject: this.querySelector('[placeholder="Subject"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create email
            const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`;
            const emailSubject = formData.subject || 'Inquiry from Website';
            
            window.open(`mailto:info@dovenestgoa.com?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`);
            
            // Show confirmation
            alert('Thank you for your message! We will respond soon.');
            
            // Reset form
            this.reset();
        });
    }
});
