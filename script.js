document.addEventListener('DOMContentLoaded', () => {
    // --- Lucide Icons ---
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // --- Navigation Smooth Scroll ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const topPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: topPos, behavior: 'smooth' });
            }
        });
    });

    // --- Contact Form Handling ---
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');
    const successMessage = document.getElementById('form-success');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending...`;

        try {
            const formData = new FormData(form);

            // Send to Formspree
            await fetch("https://formspree.io/f/mykdjobj", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            // Fake delay for smooth animation
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Show success message
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');

        } catch (error) {
            console.error(error);
            alert("There was an error sending your message. Please try again.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });

    // --- Reset Form Function ---
    window.resetForm = () => {
        form.reset();
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
    };

    // --- Reveal Animations for Sections ---
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('#program .group, #about img, #gallery .group');
    elementsToReveal.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-8');
        revealObserver.observe(el);
    });

    // --- Navbar Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) nav.classList.add('border-b', 'shadow-sm');
        else nav.classList.remove('shadow-sm');
    });
});
