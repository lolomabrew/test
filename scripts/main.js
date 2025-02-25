document.addEventListener('DOMContentLoaded', () => {
    // 料金切り替え機能
    const pricingToggle = document.querySelector('.pricing-toggle');
    
    if (pricingToggle) {
        const toggleSpans = pricingToggle.querySelectorAll('span');
        
        toggleSpans.forEach(span => {
            span.addEventListener('click', (event) => {
                // アクティブクラスの切り替え
                toggleSpans.forEach(s => s.classList.remove('active'));
                span.classList.add('active');
                
                // クリック時のリップルエフェクト
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.backgroundColor = 'rgba(255, 75, 75, 0.2)';
                
                const rect = span.getBoundingClientRect();
                ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
                ripple.style.left = (event.clientX - rect.left - rect.width / 2) + 'px';
                ripple.style.top = (event.clientY - rect.top - rect.height / 2) + 'px';
                
                span.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // スタイルシートにリップルアニメーションを追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .pricing-toggle span {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ナビゲーションの固定
    const header = document.querySelector('.header');
    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // スクロールダウン時
            header.style.transform = 'translateY(-100%)';
        } else {
            // スクロールアップ時
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // アニメーション
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature, .course-card, .community-feature, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    // Hero画像のスプリングアニメーション
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    if (heroImageWrapper) {
        let animation = null;
        
        heroImageWrapper.addEventListener('mouseenter', () => {
            if (animation) animation.cancel();
            
            animation = heroImageWrapper.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' }
            ], {
                duration: 300,
                easing: 'spring(300, 20, 0, 1)',
                fill: 'forwards'
            });
        });

        heroImageWrapper.addEventListener('mouseleave', () => {
            if (animation) animation.cancel();
            
            animation = heroImageWrapper.animate([
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'spring(300, 20, 0, 1)',
                fill: 'forwards'
            });
        });
    }

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // メニューリンクをクリックしたときにメニューを閉じる
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // メニュー外をクリックしたときにメニューを閉じる
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // メンバーシップカードのアニメーション
    const pricingCard = document.querySelector('.pricing-card');
    if (pricingCard) {
        // 初期表示アニメーション
        pricingCard.style.opacity = '0';
        pricingCard.style.transform = 'translateY(20px)';
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pricingCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    pricingCard.style.opacity = '1';
                    pricingCard.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cardObserver.observe(pricingCard);

        // 特典リストのアニメーション
        const benefitItems = pricingCard.querySelectorAll('.includes ul li');
        benefitItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.4s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 600 + (index * 100));
        });
    }
}); 