// FAQ toggle
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const p = item.querySelector("p");
    p.style.display = p.style.display === "block" ? "none" : "block";
  });
});

// Counter animation
document.querySelectorAll(".stat h2").forEach(counter => {

  const target = +counter.getAttribute("data-target");
  let count = 0;

  const updateCounter = () => {
    const increment = target / 100;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});


const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    clearErrors();

    if (name.value.trim() === "") {
      showError(name, "Name is required");
      valid = false;
    }

    if (!validateEmail(email.value)) {
      showError(email, "Enter a valid email");
      valid = false;
    }

    if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters");
      valid = false;
    }

    if (valid) {
      alert("Message sent successfully!");
      form.reset();
    }
  });
}

function showError(input, msg) {
  const error = input.nextElementSibling;
  error.innerText = msg;
  error.style.display = "block";
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.style.display = "none");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Load Navbar
fetch("components/navbar.html")
  .then(res => res.text())
  .then(data => {
    const nav = document.getElementById("navbar");
    if (nav) nav.innerHTML = data;
  });

// Load Footer
fetch("components/footer.html")
  .then(res => res.text())
  .then(data => {
    const foot = document.getElementById("footer");
    if (foot) foot.innerHTML = data;
  });

