const burgerMenu = document.getElementById("burgerMenu");
const mobileNav = document.getElementById("mobileNav");
const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
const contactForm = document.querySelector(".contact__form");
const successModal = document.getElementById("successModal");
const scrollTopButton = document.getElementById("scrollTopButton");

// Keep the mobile menu state in one place so the button, aria state, and overlay match.
const setMobileNavState = (isOpen) => {
    if (!burgerMenu || !mobileNav) {
        return;
    }

    burgerMenu.classList.toggle("active", isOpen);
    burgerMenu.setAttribute("aria-expanded", String(isOpen));
    mobileNav.classList.toggle("open", isOpen);
};

if (burgerMenu && mobileNav) {
    burgerMenu.addEventListener("click", () => {
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
            !clickedElement.closest(".header__burger-menu")
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

if (successModal) {
    const modalCloseButton = successModal.querySelector(".modal__close");
    const modalConfirmButton = successModal.querySelector(".modal__button");

    // Small helpers keep the modal actions easy to read and reuse.
    const closeSuccessModal = () => {
        successModal.classList.remove("modal--open");
    };

    const openSuccessModal = () => {
        successModal.classList.add("modal--open");
    };

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            openSuccessModal();
            contactForm.reset();
        });
    }

    if (modalCloseButton) {
        modalCloseButton.addEventListener("click", closeSuccessModal);
    }

    if (modalConfirmButton) {
        modalConfirmButton.addEventListener("click", closeSuccessModal);
    }

    successModal.addEventListener("click", (event) => {
        if (event.target === successModal) {
            closeSuccessModal();
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSuccessModal();
        }
    });
}

if (scrollTopButton) {
    // Show the button only after the page has been scrolled enough to make it useful.
    const updateScrollTopButton = () => {
        const shouldShow = window.scrollY > 260;
        scrollTopButton.classList.toggle("show", shouldShow);
    };

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", updateScrollTopButton, { passive: true });
    updateScrollTopButton();
}
