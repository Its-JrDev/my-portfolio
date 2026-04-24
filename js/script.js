const MOBILE_BREAKPOINT = 768;

const burgerMenu = document.getElementById("burgerMenu");
const mobileNav = document.getElementById("mobileNav");
const mobileNavLinks = mobileNav ? Array.from(mobileNav.querySelectorAll(".mobile-nav__link")) : [];
const contactForm = document.querySelector(".contact__form");
const successModal = document.getElementById("successModal");
const scrollTopButton = document.getElementById("scrollTopButton");

const setAriaState = (element, attribute, value) => {
    if (element) {
        element.setAttribute(attribute, String(value));
    }
};

const isMenuOpen = () => mobileNav?.classList.contains("open") ?? false;
const isModalOpen = () => successModal?.classList.contains("modal--open") ?? false;

const syncBodyLock = () => {
    document.body.classList.toggle("body--locked", isMenuOpen() || isModalOpen());
};

const setMobileNavState = (isOpen) => {
    if (!burgerMenu || !mobileNav) {
        return;
    }

    burgerMenu.classList.toggle("active", isOpen);
    setAriaState(burgerMenu, "aria-expanded", isOpen);
    mobileNav.classList.toggle("open", isOpen);
    setAriaState(mobileNav, "aria-hidden", !isOpen);
    syncBodyLock();
};

let closeSuccessModal = () => {};

const initMobileNav = () => {
    if (!burgerMenu || !mobileNav) {
        return;
    }

    setMobileNavState(false);

    burgerMenu.addEventListener("click", () => {
        setMobileNavState(!isMenuOpen());
    });

    mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setMobileNavState(false);
        });
    });

    document.addEventListener("click", (event) => {
        const clickedElement = event.target;

        if (
            isMenuOpen() &&
            clickedElement instanceof Element &&
            !clickedElement.closest(".mobile-nav") &&
            !clickedElement.closest(".header__burger-menu")
        ) {
            setMobileNavState(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > MOBILE_BREAKPOINT && isMenuOpen()) {
            setMobileNavState(false);
        }
    });
};

const initSuccessModal = () => {
    if (!successModal) {
        return;
    }

    const modalCloseButton = successModal.querySelector(".modal__close");
    const modalConfirmButton = successModal.querySelector(".modal__button");
    let lastFocusedElement = null;

    closeSuccessModal = () => {
        successModal.classList.remove("modal--open");
        setAriaState(successModal, "aria-hidden", true);
        syncBodyLock();

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    };

    const openSuccessModal = () => {
        lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        successModal.classList.add("modal--open");
        setAriaState(successModal, "aria-hidden", false);
        syncBodyLock();
        modalConfirmButton?.focus();
    };

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            contactForm.reset();
            openSuccessModal();
        });
    }

    modalCloseButton?.addEventListener("click", closeSuccessModal);
    modalConfirmButton?.addEventListener("click", closeSuccessModal);

    successModal.addEventListener("click", (event) => {
        if (event.target === successModal) {
            closeSuccessModal();
        }
    });
};

const initScrollTopButton = () => {
    if (!scrollTopButton) {
        return;
    }

    const updateScrollTopButton = () => {
        scrollTopButton.classList.toggle("show", window.scrollY > 260);
    };

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", updateScrollTopButton, { passive: true });
    updateScrollTopButton();
};

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
        return;
    }

    if (isModalOpen()) {
        closeSuccessModal();
    }

    if (isMenuOpen()) {
        setMobileNavState(false);
    }
});

initMobileNav();
initSuccessModal();
initScrollTopButton();
