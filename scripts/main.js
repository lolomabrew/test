document.addEventListener('DOMContentLoaded', () => {
    // ローディングオーバーレイを作成
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    loadingOverlay.appendChild(loadingSpinner);
    document.body.appendChild(loadingOverlay);

    // ページ全体をラップする要素を作成
    const pageContent = document.createElement('div');
    pageContent.className = 'page-transition';
    
    // body内の全要素をラップする
    while (document.body.firstChild !== loadingOverlay) {
        pageContent.appendChild(document.body.firstChild);
    }
    document.body.insertBefore(pageContent, loadingOverlay);

    // アニメーションクラスを追加
    const headerElement = document.querySelector('.header');
    if (headerElement) {
        headerElement.classList.add('header-animation');
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.classList.add('logo-animation');
    }

    const navLinksElement = document.querySelector('.nav-links');
    if (navLinksElement) {
        navLinksElement.classList.add('nav-links-animation');
    }

    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('hero-animation');
    }

    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.classList.add('cta-animation');
    }

    // スクロールアニメーション要素を設定
    const scrollElements = [
        ...document.querySelectorAll('.whats-juju'),
        ...document.querySelectorAll('.fun-learning'),
        ...document.querySelectorAll('.courses'),
        ...document.querySelectorAll('.membership'),
        ...document.querySelectorAll('.hiragana-course-section'),
        ...document.querySelectorAll('.course-card'),
        ...document.querySelectorAll('.pricing-card'),
        ...document.querySelectorAll('.feature')
    ];

    scrollElements.forEach(element => {
        element.classList.add('scroll-animation');
    });

    // スクロール時のアニメーション処理
    function checkScroll() {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // ページ読み込み完了時の処理
    window.addEventListener('load', () => {
        // ローディングオーバーレイを非表示
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 800);

        // 初期スクロールチェック
        checkScroll();
    });

    // スクロールイベントリスナー
    window.addEventListener('scroll', checkScroll);

    // 星形装飾要素をランダムに配置する関数
    function createStarDecorations() {
        // 星を配置するセクション
        const sections = document.querySelectorAll('section');
        
        // 各セクションに星を追加
        sections.forEach(section => {
            // 各セクションに3〜9個の星を追加（さらに数を増やす）
            const starCount = Math.floor(Math.random() * 7) + 3;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star-decoration';
                
                // ランダムなサイズ
                const sizeClasses = ['star-xs', 'star-sm', 'star-md', 'star-lg', 'star-xl'];
                const randomSize = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
                star.classList.add(randomSize);
                
                // サイト内で使用されているカラーに限定
                const colorClasses = ['star-primary', 'star-primary-light', 'star-secondary', 'star-background'];
                // 各色の出現確率を調整
                let randomIndex;
                const random = Math.random();
                if (random < 0.35) {
                    randomIndex = 0; // primary
                } else if (random < 0.65) {
                    randomIndex = 1; // primary-light
                } else if (random < 0.85) {
                    randomIndex = 2; // secondary
                } else {
                    randomIndex = 3; // background
                }
                const randomColor = colorClasses[randomIndex];
                star.classList.add(randomColor);
                
                // ランダムなアニメーション
                const simpleAnimationClasses = [
                    'star-rotate', 'star-pulse', 'star-twinkle', 
                    'star-bounce', 'star-path', 'star-shake',
                    'star-spiral', 'star-zigzag', 'star-float', 'star-swing'
                ];
                const complexAnimationClasses = [
                    'star-complex-1', 'star-complex-2', 
                    'star-complex-3', 'star-complex-4'
                ];
                
                // 95%の確率でアニメーションを適用（さらに確率を増加）
                if (Math.random() > 0.05) {
                    let randomAnimation;
                    
                    // 40%の確率で複雑なアニメーションを使用
                    if (Math.random() < 0.4) {
                        randomAnimation = complexAnimationClasses[Math.floor(Math.random() * complexAnimationClasses.length)];
                    } else {
                        randomAnimation = simpleAnimationClasses[Math.floor(Math.random() * simpleAnimationClasses.length)];
                    }
                    
                    star.classList.add(randomAnimation);
                    
                    // ランダムな遅延
                    const delayClasses = ['star-delay-1', 'star-delay-2', 'star-delay-3', 'star-delay-4', 'star-delay-5'];
                    const randomDelay = delayClasses[Math.floor(Math.random() * delayClasses.length)];
                    star.classList.add(randomDelay);
                    
                    // 60%の確率でランダムな速度変化を適用
                    if (Math.random() < 0.6) {
                        const speedClasses = ['star-speed-1', 'star-speed-2', 'star-speed-3'];
                        const randomSpeed = speedClasses[Math.floor(Math.random() * speedClasses.length)];
                        star.classList.add(randomSpeed);
                    }
                    
                    // 30%の確率でアニメーション方向を変更
                    if (Math.random() < 0.3) {
                        const directionClasses = ['star-reverse', 'star-alternate'];
                        const randomDirection = directionClasses[Math.floor(Math.random() * directionClasses.length)];
                        star.classList.add(randomDirection);
                    }
                }
                
                // よりランダムな位置（画面全体に均等に分布するよう調整）
                star.style.position = 'absolute';
                star.style.left = Math.floor(Math.random() * 98) + 1 + '%';
                star.style.top = Math.floor(Math.random() * 98) + 1 + '%';
                
                // z-indexをランダムに設定（コンテンツの後ろに表示されるように）
                star.style.zIndex = Math.floor(Math.random() * 3) - 1; // -1, 0, 1の値を取るように
                
                // セクションに追加
                section.style.position = 'relative';
                section.appendChild(star);
            }
        });
        
        // 3秒ごとに新しい星を1〜2個ランダムに追加する（頻度を上げる）
        setInterval(() => {
            if (sections.length > 0) {
                // 星を追加する数を決定
                const starsToAdd = Math.random() < 0.3 ? 2 : 1;
                
                for (let i = 0; i < starsToAdd; i++) {
                    const randomSection = sections[Math.floor(Math.random() * sections.length)];
                    
                    const star = document.createElement('div');
                    star.className = 'star-decoration';
                    
                    // ランダムなサイズ（小さめの星が多くなるよう調整）
                    const sizeClasses = ['star-xs', 'star-xs', 'star-sm', 'star-sm', 'star-md'];
                    const randomSize = sizeClasses[Math.floor(Math.random() * sizeClasses.length)];
                    star.classList.add(randomSize);
                    
                    // サイト内で使用されているカラーに限定
                    const colorClasses = ['star-primary', 'star-primary-light', 'star-secondary', 'star-background'];
                    // 各色の出現確率を調整
                    let randomIndex;
                    const random = Math.random();
                    if (random < 0.35) {
                        randomIndex = 0; // primary
                    } else if (random < 0.65) {
                        randomIndex = 1; // primary-light
                    } else if (random < 0.85) {
                        randomIndex = 2; // secondary
                    } else {
                        randomIndex = 3; // background
                    }
                    const randomColor = colorClasses[randomIndex];
                    star.classList.add(randomColor);
                    
                    // 動的アニメーション（フェードインしてからランダムなアニメーション）
                    const allAnimations = [
                        'star-rotate', 'star-pulse', 'star-twinkle', 
                        'star-bounce', 'star-path', 'star-shake',
                        'star-spiral', 'star-zigzag', 'star-float', 'star-swing',
                        'star-complex-1', 'star-complex-2', 'star-complex-3', 'star-complex-4'
                    ];
                    
                    // 複数のアニメーションを組み合わせる可能性も
                    let animationsToApply = [];
                    if (Math.random() < 0.25) { // 25%の確率で複数アニメーション
                        // ランダムに2つ選ぶ
                        while (animationsToApply.length < 2) {
                            const randAnim = allAnimations[Math.floor(Math.random() * (allAnimations.length - 4))]; // complexは除外
                            if (!animationsToApply.includes(randAnim)) {
                                animationsToApply.push(randAnim);
                            }
                        }
                    } else {
                        animationsToApply.push(allAnimations[Math.floor(Math.random() * allAnimations.length)]);
                    }
                    
                    // フェードイン効果
                    star.style.opacity = '0';
                    star.style.transition = 'opacity 1.5s ease-in-out';
                    
                    // ランダムな位置（画面全体に均等に分布するよう調整）
                    star.style.position = 'absolute';
                    star.style.left = Math.floor(Math.random() * 98) + 1 + '%';
                    star.style.top = Math.floor(Math.random() * 98) + 1 + '%';
                    star.style.zIndex = Math.floor(Math.random() * 3) - 1; // -1, 0, 1の値を取るように
                    
                    // セクションに追加
                    randomSection.appendChild(star);
                    
                    // フェードイン後にアニメーションを適用
                    setTimeout(() => {
                        star.style.opacity = '0.4'; // 透明度を上げる
                        setTimeout(() => {
                            animationsToApply.forEach(anim => {
                                star.classList.add(anim);
                            });
                            
                            // ランダムな遅延と速度も追加
                            if (Math.random() > 0.3) {
                                const delayClasses = ['star-delay-1', 'star-delay-2', 'star-delay-3', 'star-delay-4', 'star-delay-5'];
                                star.classList.add(delayClasses[Math.floor(Math.random() * delayClasses.length)]);
                            }
                            
                            if (Math.random() > 0.4) {
                                const speedClasses = ['star-speed-1', 'star-speed-2', 'star-speed-3'];
                                star.classList.add(speedClasses[Math.floor(Math.random() * speedClasses.length)]);
                            }
                        }, 500);
                    }, 10);
                    
                    // 古い星を削除（星の総数を一定に保つ）
                    const stars = randomSection.querySelectorAll('.star-decoration');
                    if (stars.length > 15) { // 最大数を増やす
                        // 複数の古い星を削除
                        const starsToRemove = Math.min(starsToAdd, stars.length - 12);
                        for (let j = 0; j < starsToRemove; j++) {
                            const oldestStar = stars[j];
                            // フェードアウト効果
                            oldestStar.style.opacity = '0';
                            setTimeout(() => {
                                oldestStar.remove();
                            }, 1000);
                        }
                    }
                }
            }
        }, 3000); // 3秒ごとに実行
        
        // マウス移動に応じて星が微妙に動くエフェクト
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // すべての星に対して微小な動きを与える
            document.querySelectorAll('.star-decoration').forEach(star => {
                // すでにアニメーションがある星には適用しない（競合を避ける）
                if (!star.style.transform || star.style.transform === '') {
                    const moveX = (mouseX - 0.5) * 5; // -2.5px〜2.5pxの範囲
                    const moveY = (mouseY - 0.5) * 5;
                    
                    // 星によって動きの量を変える
                    const factor = Math.random() * 0.8 + 0.2; // 0.2〜1.0の範囲
                    
                    star.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
                    star.style.transition = 'transform 0.5s ease-out';
                }
            });
        });
    }
    
    // ページ読み込み時に星を配置
    createStarDecorations();

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
    document.querySelectorAll('.nav-links > a, .social-links a').forEach(link => {
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