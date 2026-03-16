const progressBar = document.getElementById("scrollProgress");

const updateProgress = () => {
    if (!progressBar) {
        return;
    }

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    progressBar.style.setProperty("--scroll-progress", progress.toFixed(3));
};

let scrollTicking = false;

const requestProgressUpdate = () => {
    if (scrollTicking) {
        return;
    }

    scrollTicking = true;
    window.requestAnimationFrame(() => {
        updateProgress();
        scrollTicking = false;
    });
};

window.addEventListener("scroll", requestProgressUpdate, { passive: true });
window.addEventListener("resize", requestProgressUpdate);

const revealItems = Array.from(document.querySelectorAll(".reveal"));

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -48px 0px",
        }
    );

    revealItems.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${index * 70}ms`);
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

const openModal = (source, caption) => {
    if (!modal || !modalImage) {
        return;
    }

    modalImage.src = source;
    modalImage.alt = caption || "Expanded assignment image";
    if (modalCaption) {
        modalCaption.textContent = caption || "";
    }

    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
};

const closeModal = () => {
    if (!modal || !modalImage) {
        return;
    }

    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    modalImage.src = "";
    modalImage.alt = "";

    if (modalCaption) {
        modalCaption.textContent = "";
    }
};

document.querySelectorAll("[data-open-image]").forEach((trigger) => {
    const handleOpen = () => {
        openModal(trigger.dataset.openImage, trigger.dataset.caption || "");
    };

    trigger.addEventListener("click", handleOpen);
    trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleOpen();
        }
    });
});

if (modal) {
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

if (modalClose) {
    modalClose.addEventListener("click", closeModal);
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
        closeModal();
    }
});

document.querySelectorAll("[data-fit-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
        const card = button.closest(".photo-card");
        if (!card) {
            return;
        }

        const isContained = card.classList.toggle("is-contained");
        button.textContent = isContained ? "Fill" : "Fit";
        button.setAttribute("aria-pressed", String(isContained));
    });
});

document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
        image.style.objectFit = "contain";
        image.style.background = "#111111";
        image.alt = `${image.alt || "Assignment image"} (missing file)`;
    });
});

updateProgress();
