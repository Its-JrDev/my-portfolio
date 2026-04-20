const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");

const setMobileNavState = (isOpen) => {
    if (!hamburger || !mobileNav) {
        return;
    }

    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    mobileNav.classList.toggle("open", isOpen);
};

if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
        const isOpen = !mobileNav.classList.contains("open");
        setMobileNavState(isOpen);
    });

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setMobileNavState(false);
        });
    });

    document.addEventListener("click", (event) => {
        const clickedElement = event.target;

        if (
            mobileNav.classList.contains("open") &&
            !clickedElement.closest(".mobile-nav") &&
            !clickedElement.closest(".hamburger")
        ) {
            setMobileNavState(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            setMobileNavState(false);
        }
    });
}

const contactForm = document.querySelector(".contact-form");
const successModal = document.getElementById("successModal");
const successClose = document.querySelector(".success-close");
const scrollTopButton = document.getElementById("scrollTopButton");

const closeSuccessModal = () => {
    if (successModal) {
        successModal.style.display = "none";
    }
};

if (contactForm && successModal) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        successModal.style.display = "block";
        this.reset();
    });
}

if (successClose && successModal) {
    successClose.addEventListener("click", closeSuccessModal);
}

if (scrollTopButton) {
    const updateScrollTopButton = () => {
        const shouldShow = window.scrollY > 260;
        scrollTopButton.classList.toggle("show", shouldShow);
    };

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", updateScrollTopButton);
    updateScrollTopButton();
}

window.addEventListener("click", (event) => {
    if (event.target === successModal) {
        closeSuccessModal();
    }
});
