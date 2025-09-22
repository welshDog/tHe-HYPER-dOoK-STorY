// Add smooth animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Update metrics with animation
function updateMetrics() {
  const currentDate = new Date();
  const baseValues = {
    members: 2000,
    revenue: 284,
    agents: 677,
    countries: 184,
  };

  // Add some realistic growth simulation
  const dayOfYear = Math.floor(
    (currentDate - new Date(currentDate.getFullYear(), 0, 0)) / 86400000
  );
  const growthFactor =
    Math.floor(dayOfYear / 30) + Math.floor(Math.random() * 50);

  const metrics = {
    members: baseValues.members + growthFactor,
    revenue: baseValues.revenue + Math.floor(growthFactor / 10),
    agents: baseValues.agents + Math.floor(growthFactor / 5),
    countries: Math.min(
      195,
      baseValues.countries + Math.floor(growthFactor / 50)
    ),
  };

  // Update display
  document.getElementById("discord-members").textContent =
    metrics.members.toLocaleString() + "+";
  document.getElementById("monthly-revenue").textContent =
    "$" + metrics.revenue + "K+";
  document.getElementById("ai-agents").textContent = metrics.agents + "+";
  document.getElementById("countries").textContent = metrics.countries;

  // Update funding progress
  const currentFunding = 6800 + Math.floor(Math.random() * 500);
  const percentage = Math.floor((currentFunding / 10000) * 100);
  document.getElementById("funding-progress").style.width = percentage + "%";
  document.getElementById(
    "funding-text"
  ).textContent = `$${currentFunding.toLocaleString()} of $10,000 monthly goal reached (${percentage}%)`;
}

// Initialize metrics update
setTimeout(updateMetrics, 1000);

// Update every 30 seconds for demo effect
setInterval(updateMetrics, 30000);

// Add click tracking for analytics
document.querySelectorAll(".donation-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const action = this.textContent.trim();
    console.log("Donation action clicked:", action);
    // You can add analytics tracking here
    // gtag('event', 'donation_click', { 'action': action });
  });
});
