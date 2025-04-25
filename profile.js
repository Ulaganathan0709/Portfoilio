// ===== Typewriter Titles =====
const titles = ["B.E Mechanical Engineer", "Software Tester", "Full Stack Developer"];
let i = 0, currentText = "", isDeleting = false;
const speed = 100;        // Typing speed
const pause = 1200;       // Pause before deleting
const typeElement = document.getElementById("typewriter-text");

// ===== Typewriter Function =====
function type() {
  const fullText = titles[i];
  currentText = isDeleting
    ? fullText.substring(0, currentText.length - 1)
    : fullText.substring(0, currentText.length + 1);

  typeElement.textContent = currentText;

  if (!isDeleting && currentText === fullText) {
    setTimeout(() => { isDeleting = true; type(); }, pause);
  } else if (isDeleting && currentText === "") {
    isDeleting = false;
    i = (i + 1) % titles.length;
    setTimeout(type, speed);
  } else {
    setTimeout(type, speed);
  }
}

// ===== Filter Tabs Function (Projects, Certificates, Skills) =====
function filterTabs(tabName) {
  const sections = document.querySelectorAll('.portfolio-cards');

  // Hide all tab contents
  sections.forEach(section => {
    section.style.display = 'none';
  });

  // Show the selected tab
  const selected = document.getElementById(tabName);
  if (selected) {
    selected.style.display = 'grid'; // Ensures layout
  }

  // Update active button state
  const buttons = document.querySelectorAll('.portfolio-filters button');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = Array.from(buttons).find(btn => btn.textContent.toLowerCase().includes(tabName));
  if (activeBtn) activeBtn.classList.add('active');
}

// ===== Mobile Nav Toggle (Hamburger Menu) =====
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const closeBtn = document.getElementById("close-menu");
const hamburger = document.getElementById("hamburger");

menuIcon.addEventListener("click", () => {
  navMenu.classList.add("show");
  hamburger.style.display = "none"; // Hide hamburger
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("show");
  hamburger.style.display = "block"; // Show hamburger
});

// Close menu on link click (for mobile)
const navLinks = document.querySelectorAll('#nav-menu a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove("show");
    hamburger.style.display = "block";
  });
});

// ===== DOM Ready: Start Typewriter + Load Projects Tab + Set Counts =====
document.addEventListener("DOMContentLoaded", () => {
  type(); // Start typing animation

  // Default tab to show: Projects
  filterTabs('projects');

  // Count and display stats
  const projectCount = document.querySelectorAll("#projects .portfolio-card").length;
  const certCount = document.querySelectorAll("#certificates .portfolio-card").length;
  document.getElementById("projectCount").innerText = projectCount;
  document.getElementById("certCount").innerText = certCount;
});
