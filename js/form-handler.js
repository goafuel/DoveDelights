// Booking Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        // Get or initialize booking number from localStorage
        let bookingNumber = localStorage.getItem('bookingNumber') || 1000;

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Increment booking number and save
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
            
            // Create WhatsApp message with booking number
            const message = `*New Booking Inquiry #${bookingNumber}*%0A%0A` +
                           `*Name:* ${formData.name}%0A` +
                           `*Email:* ${formData.email}%0A` +
                           `*Phone:* ${formData.phone}%0A` +
                           `*Event Type:* ${formData.eventType}%0A` +
                           `*Event Date:* ${formData.eventDate}%0A` +
                           `*Guest Count:* ${formData.guestCount}%0A%0A` +
                           `*Special Requirements:*%0A${formData.requirements ? formData.requirements.replace(/\n/g, '%0A') : 'None'}%0A%0A` +
                           `*Additional Information:*%0A${formData.additionalInfo ? formData.additionalInfo.replace(/\n/g, '%0A') : 'None'}`;
            
            window.open(`https://wa.me/919822182917?text=${message}`, '_blank');
            
            // Show confirmation with booking number
            alert(`Booking request #${bookingNumber} submitted! We've opened WhatsApp for you to complete the process.`);
            
            this.reset();
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Create email body
            const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0A${formData.message}`;
            
            window.open(`mailto:info@dovenestgoa.com?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            this.reset();
        });
    }
});
