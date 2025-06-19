// Toggle Light/Dark Mode
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const icon = document.querySelector('.mode-toggle');
  icon.textContent = document.body.classList.contains('light-mode') ? '☀' : '🌙';
}

// Scroll To Top Button
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Auto Play Centered Video
const videos = document.querySelectorAll('.video-box video');

function getCenteredVideo() {
  let center = window.innerWidth / 2;
  let minDiff = Infinity;
  let centerVideo = null;

  videos.forEach(video => {
    const rect = video.getBoundingClientRect();
    const videoCenter = rect.left + rect.width / 2;
    const diff = Math.abs(center - videoCenter);
    if (diff < minDiff) {
      minDiff = diff;
      centerVideo = video;
    }
  });

  return centerVideo;
}

function updatePlaying() {
  const centerVideo = getCenteredVideo();
  videos.forEach(video => {
    if (video === centerVideo) {
      video.play();
    } else {
      video.pause();
    }
  });
}

document.querySelector('.video-scroll-container')?.addEventListener('scroll', () => {
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(updatePlaying, 100);
});

window.addEventListener('load', updatePlaying);
window.addEventListener('resize', updatePlaying);

// Activate Navbar Link on Scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});


  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data
    });

    if (response.ok) {
      status.style.display = "block";
      form.reset();
    } else {
      status.textContent = "❌ something went wrong, please try again later.";
      status.style.display = "block";
      status.classList.remove("text-success");
      status.classList.add("text-danger");
    }
  });
