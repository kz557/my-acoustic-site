// 手机菜单开关
const mobileBtn = document.getElementById("mobile-menu-btn");
const nav = document.querySelector("nav");

mobileBtn.addEventListener("click", () => {
    mobileBtn.classList.toggle("active");
    nav.classList.toggle("active");
});

// 展开二级菜单（手机端）
document.querySelectorAll(".dropdown").forEach(item => {
    item.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            item.classList.toggle("open");
        }
    });
});
