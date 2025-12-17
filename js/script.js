// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initMobileNav();
    initSmoothScroll();
    initAnimationOnScroll();
    initBackToTop();
    initBannerSlider();
});

// 移动端导航菜单
function initMobileNav() {
    // 处理下拉菜单
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdown = item.querySelector('.dropdown');
        
        if (dropdown) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('show');
            });
        }
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 考虑导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画
function initAnimationOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.team-intro, .news, .columns, .follow-us, .donate');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// 回到顶部按钮
function initBackToTop() {
    // 创建回到顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #0066cc;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 99;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // 点击事件
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 图片懒加载
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// 表单提交处理
function initFormSubmission() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const inputs = form.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // 这里可以添加AJAX提交逻辑
                alert('提交成功！');
                form.reset();
            } else {
                alert('请填写所有必填字段！');
            }
        });
    });
}

// 数字动画效果
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// 页面加载完成后执行
window.addEventListener('load', function() {
    // 移除加载动画
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // 初始化懒加载
    initLazyLoad();
    
    // 初始化表单提交
    initFormSubmission();
    
    // 添加页面加载动画
    document.body.style.opacity = '1';
});

// 处理触摸事件，防止下拉刷新
let startY;
window.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', function(e) {
    const currentY = e.touches[0].clientY;
    const scrollTop = window.pageYOffset;
    
    // 当滚动到顶部且向下拉时，阻止默认行为
    if (scrollTop === 0 && currentY > startY) {
        e.preventDefault();
    }
});

// 处理窗口大小变化
window.addEventListener('resize', function() {
    // 可以在这里添加响应式调整逻辑
});

// 添加滚动事件监听器，用于处理header滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        // 添加body的scrolled类，用于CSS样式控制
        if (window.pageYOffset > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }
});

// 添加点击反馈效果
document.addEventListener('click', function(e) {
    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            target.style.transform = 'scale(1)';
        }, 150);
    }
});

// 分享功能
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(err => {
            console.error('分享失败:', err);
        });
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(url).then(() => {
            alert('链接已复制到剪贴板！');
        }).catch(err => {
            console.error('复制失败:', err);
        });
    }
}

// 导出函数，方便其他页面调用
window.shareContent = shareContent;
window.initFormSubmission = initFormSubmission;
window.initLazyLoad = initLazyLoad;

// 轮播图功能
let currentSlide = 0;
let slideInterval;

// 初始化轮播图
function initBannerSlider() {
    const slider = document.querySelector('.banner-slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // 开始自动轮播
    startSlideInterval();
    
    // 添加鼠标事件，鼠标悬停时暂停轮播
    slider.addEventListener('mouseenter', stopSlideInterval);
    slider.addEventListener('mouseleave', startSlideInterval);
    
    // 导出轮播控制函数到全局
    window.changeSlide = changeSlide;
    window.goToSlide = goToSlide;
}

// 切换幻灯片
function changeSlide(n) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // 隐藏当前幻灯片
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // 计算下一张幻灯片索引
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    
    // 显示下一张幻灯片
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // 重置自动轮播计时器
    startSlideInterval();
}

// 跳转到指定幻灯片
function goToSlide(n) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0 || n < 0 || n >= slides.length) return;
    
    // 隐藏当前幻灯片
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // 显示指定幻灯片
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // 重置自动轮播计时器
    startSlideInterval();
}

// 开始自动轮播
function startSlideInterval() {
    // 清除现有计时器
    stopSlideInterval();
    // 设置新计时器，每5秒切换一次
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

// 停止自动轮播
function stopSlideInterval() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}