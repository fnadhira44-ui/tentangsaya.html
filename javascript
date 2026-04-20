 <script>
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(40px)';
                navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.1)';
                navbar.style.backdropFilter = 'blur(30px)';
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
            }

            // Scroll progress
            const scrollProgress = document.querySelector('.scroll-progress');
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrolled + '%';

            // Timeline animation
            document.querySelectorAll('.timeline-item').forEach((item, index) => {
                if (window.scrollY > item.offsetTop - window.innerHeight / 2) {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 300);
                }
            });

            // Cards animation
            document.querySelectorAll('.card, .stat-card').forEach((card, index) => {
                if (window.scrollY > card.offsetTop - window.innerHeight / 2) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) rotateX(0deg)';
                    }, index * 100);
                }
            });
        });

        // Create particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.opacity = Math.random() * 0.5 + 0.2;
                particlesContainer.appendChild(particle);
            }
        }

        // Typing effect
        const texts = [
            "Mahasiswa Teknik Informatika",
            "Full Stack Developer",
            "AI Enthusiast",
            "Web Developer"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const typingElement = document.getElementById('typingText');
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // ✨ ULTIMATE WHATSAPP FORM HANDLER ✨
        document.getElementById('whatsappForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.platform-btn');
            const btnText = document.getElementById('whatsappBtnText');
            const name = document.getElementById('whatsappName').value;
            const phone = document.getElementById('whatsappPhone').value;
            const message = document.getElementById('whatsappMessage').value;
            
            // Button loading animation
            btn.disabled = true;
            btnText.textContent = 'Mengirim...';
            btn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                // Format nomor WhatsApp (Indonesia format)
                let cleanPhone = phone.replace(/[\s+()-]/g, '');
                if (!cleanPhone.startsWith('62')) {
                    if (cleanPhone.startsWith('0')) {
                        cleanPhone = '62' + cleanPhone.substring(1);
                    }
                }
                
                // Buat pesan WhatsApp yang EPIC
                const whatsappMessage = `🚀 *Pesan Baru dari Portfolio Website!*

👤 *Nama:* ${name}
📱 *Nomor:* ${phone}
💬 *Pesan:* ${message || 'Saya tertarik dengan portofolio Anda!'}

✨ Terima kasih telah mengunjungi portfolio saya!`;
                
                // Encode pesan untuk URL
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // GANTI 6281367765844 dengan nomor WhatsApp Anda (format internasional)
                const whatsappUrl = `https://wa.me/6281367765844?text=${encodedMessage}`;
                
                // Show success animation
                showSuccessAnimation();
                
                // Buka WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Reset form & button
                setTimeout(() => {
                    this.reset();
                    btn.disabled = false;
                    btnText.textContent = 'Pesan Terkirim! 🎉';
                    btn.style.transform = 'scale(1.05)';
                    
                    setTimeout(() => {
                        btnText.textContent = 'Kirim Pesan Sekarang';
                        btn.style.transform = 'scale(1)';
                    }, 2000);
                }, 1500);
            }, 1000);
        });

        // Success Animation
        function showSuccessAnimation() {
            const animation = document.getElementById('successAnimation');
            animation.classList.add('show');
            setTimeout(() => {
                animation.classList.remove('show');
            }, 1000);
        }

        // Scroll to top
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Mouse parallax for cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('.section, .card, .stat-card, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });

        // Contact cards hover effects
        document.querySelectorAll('.contact-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Initialize everything
        window.addEventListener('load', () => {
            createParticles();
            setTimeout(typeWriter, 1000);
            
            // Initial cards opacity
            document.querySelectorAll('.card, .stat-card').forEach((card, index) => {
                card.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
            });
        });

        // Preload images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        });

        // Add click ripple effect to buttons
               document.querySelectorAll('.platform-btn, .cta-button').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple CSS dynamically
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    </script>
