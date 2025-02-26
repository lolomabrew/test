document.addEventListener('DOMContentLoaded', () => {
    // 料金切り替え機能
    const pricingToggle = document.querySelector('.membership .pricing-toggle');
    
    if (pricingToggle) {
        const toggleSpans = pricingToggle.querySelectorAll('span');
        
        toggleSpans.forEach(span => {
            span.addEventListener('click', (event) => {
                // アクティブクラスの切り替え
                toggleSpans.forEach(s => s.classList.remove('active'));
                span.classList.add('active');
                
                // プランの切り替え
                const planType = span.getAttribute('data-plan');
                const planContainers = document.querySelectorAll('.pricing-cards-container');
                
                planContainers.forEach(container => {
                    if (container.classList.contains('free')) return; // 無料プランは常に表示
                    
                    container.classList.remove('active');
                    if (container.classList.contains(planType)) {
                        container.classList.add('active');
                    }
                });
                
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
                entry.target.style.transform = entry.target.classList.contains('premium') 
                    ? 'scale(1.05) translateY(0)' 
                    : 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature, .pricing-card, .community-feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = el.classList.contains('premium') 
            ? 'scale(1.05) translateY(20px)' 
            : 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    // 料金カードのアニメーション
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // プレミアムカードのハイライト効果
    const premiumCards = document.querySelectorAll('.pricing-card.premium');
    premiumCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.08) translateY(5px)';
            card.style.boxShadow = '0 20px 40px rgba(255, 75, 75, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1.05) translateY(10px)';
            card.style.boxShadow = '0 15px 30px rgba(255, 75, 75, 0.1)';
        });
    });

    // 特典リストのアニメーション
    const benefitItems = document.querySelectorAll('.pricing-card .includes ul li');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 600 + (index * 100));
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
}); 