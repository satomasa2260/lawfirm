// Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('弁護士事務所ウェブサイトが読み込まれました');
    
    // スムーズスクロール機能
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // グローバルメニューのアクティブ状態管理
    function updateActiveMenu() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-list a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // スクロール時にメニューのアクティブ状態を更新
    window.addEventListener('scroll', updateActiveMenu);
    
    // ページ読み込み時に初期状態を設定
    updateActiveMenu();
    
    // ヘッダーのスクロール効果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下スクロール時
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上スクロール時
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
    
    // ハンバーガーメニュー機能
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            // メニューの開閉
            navMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            
            // 背景の暗転
            if (navMenu.classList.contains('active')) {
                // オーバーレイを作成
                const overlay = document.createElement('div');
                overlay.className = 'menu-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                body.appendChild(overlay);
                
                // オーバーレイをフェードイン
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                // オーバーレイクリックでメニューを閉じる
                overlay.addEventListener('click', closeMenu);
                
                // スクロールを無効化
                body.style.overflow = 'hidden';
            } else {
                closeMenu();
            }
        });
        
        // メニューを閉じる関数
        function closeMenu() {
            navMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            
            // オーバーレイを削除
            const overlay = document.querySelector('.menu-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            }
            
            // スクロールを有効化
            body.style.overflow = '';
        }
        
        // ナビゲーションリンクをクリックしたらメニューを閉じる
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // ESCキーでメニューを閉じる
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // FAQアコーディオン機能
    const faqItems = document.querySelectorAll('.q-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('active');
            
            // 他の開いている回答を閉じる
            document.querySelectorAll('.a-item.active').forEach(openAnswer => {
                if (openAnswer !== answer) {
                    openAnswer.classList.remove('active');
                    openAnswer.style.maxHeight = '0';
                    openAnswer.previousElementSibling.classList.remove('active');
                }
            });
            
            // 現在の回答を開閉
            if (isOpen) {
                // 閉じる
                answer.classList.remove('active');
                answer.style.maxHeight = '0';
                this.classList.remove('active');
            } else {
                // 開く
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                this.classList.add('active');
            }
        });
    });
    
    // フォーム送信処理（将来的に追加予定）
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // フォーム送信処理をここに追加
            console.log('お問い合わせフォームが送信されました');
        });
    }
}); 