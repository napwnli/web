const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

document.addEventListener('DOMContentLoaded', function() {

    const typingElement = document.getElementById('typing');
    if (typingElement) {
        const textToType = "Welcome to the napwnli terminal. We are a Neapolitan CTF Team.";
        let index = 0;

        function type() {
            if (index < textToType.length) {
                typingElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    const modal = document.getElementById("imageModal");
    if (modal) {
        const modalImg = document.getElementById("modalImage");
        const closeBtn = document.querySelector(".close");
        const galleryGrid = document.querySelector(".gallery-grid");

        if (galleryGrid) {
            const galleryImages = document.querySelectorAll(".gallery-item img");

            galleryImages.forEach(img => {
                img.onclick = function() {
                    modal.style.display = "block";
                    modalImg.src = this.src;
                }
            });

            closeBtn.onclick = function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
});