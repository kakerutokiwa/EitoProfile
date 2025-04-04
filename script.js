document.addEventListener('DOMContentLoaded', () => {
    // スムーズなスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // スキルアイテムのホバーエフェクト
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            item.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // プロフィール画像の読み込みエラー処理
    const profileImage = document.querySelector('.profile-image');
    profileImage.addEventListener('error', () => {
        profileImage.src = 'https://via.placeholder.com/150';
    });

    // パーティクル背景の追加
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        document.body.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    };

    setInterval(createParticle, 300);

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });

    // ソーシャルリンクのホバーエフェクト
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px)';
            link.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // 共有機能
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
        shareButton.addEventListener('click', async () => {
            const shareData = {
                title: 'EitoProfile',
                text: '菊池栄人のプロフィールページです。',
                url: 'https://kakerutokiwa.github.io/EitoProfile/'
            };
            
            try {
                if (navigator.share) {
                    // Web Share APIが利用可能な場合
                    await navigator.share(shareData);
                } else {
                    // Web Share APIが利用できない場合
                    const url = shareData.url;
                    const textArea = document.createElement('textarea');
                    textArea.value = url;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // コピー完了の通知
                    const originalText = shareButton.innerHTML;
                    shareButton.innerHTML = '<i class="fas fa-check"></i> コピーしました';
                    setTimeout(() => {
                        shareButton.innerHTML = originalText;
                    }, 2000);
                }
            } catch (err) {
                console.error('共有に失敗しました:', err);
            }
        });
    }

    // モーダル機能
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');

    // モーダルコンテンツの定義
    const modalContents = {
        'video-editing': {
            title: '動画編集',
            content: `
                <p>小３の頃からずっとやってます。</p>
                <p>大体の形式の動画編集はできます。</p>
                <p>Youtube風だったり、ゲーム実況だったり、ライブハウスの複数カメラ映像だったり。</p>
                <p>ミュージックビデオも作れます。</p>
                <p>学校でよくイベントのOP映像とか作ってました。</p>
            `
        },
        'music-production': {
            title: '音楽制作',
            content: `
                <p>ピアノを９年間くらい習っていました。</p>
                <p>だけどピアノ弾けません。</p>
                <p>その代わり音楽を作れるようになりました。</p>
            `
        },
        'ai-development': {
            title: 'AI開発',
            content: `
                <p>このサイトもAIと一緒に作っています。</p>
                <p>AIと人間が協力する時代。</p>
                <p>より良いものを制作するためにAIも使いこなしていきます。</p>
            `
        },
        'camera': {
            title: 'カメラ',
            content: `
                <p>幼い頃から近くにあったカメラ。</p>
                <p>学校内の人ならプロのカメラマンより良い写真が撮れる自信があります。</p>
                <p>でもまだまだ勉強中。</p>
                <p>精進していきます。</p>
            `
        },
        'guitar': {
            title: 'ギター',
            content: `
                <p>小３くらいからやってます。</p>
                <p>アコギとエレキどっちも弾くけどエレキの方が弾きやすいです。</p>
                <p>まだまだ練習中。</p>
            `
        },
        'piano': {
            title: 'ピアノ',
            content: `
                <p>習ってたのに弾けないのは悔しい！</p>
                <p>まだまだ弾けないけど、これから頑張ります！</p>
            `
        }
    };

    // モーダルを開く
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            if (modalId && modalContents[modalId]) {
                modalTitle.textContent = modalContents[modalId].title;
                modalContent.innerHTML = modalContents[modalId].content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // スクロール防止
                
                // アニメーションのためのタイミング調整
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }
        });
    });

    // モーダルを閉じる
    closeModal.addEventListener('click', () => {
        closeModalWithAnimation();
    });

    // モーダル外をクリックして閉じる
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalWithAnimation();
        }
    });
    
    // モーダルを閉じる関数
    function closeModalWithAnimation() {
        modal.classList.remove('show');
        
        // アニメーション完了後にモーダルを非表示にする
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // スクロール再開
        }, 300); // トランジションの時間と同じ
    }
});
