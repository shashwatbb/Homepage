// Test file - simple logging to verify JS execution
console.log("SRP Test: JavaScript is running!");
document.addEventListener("DOMContentLoaded", () => {
  console.log("SRP Test: DOM is ready");
  
  const claudeRoot = document.getElementById("claude-root");
  const resultsContainer = document.getElementById("srp-results");
  
  console.log("Claude root exists:", !!claudeRoot);
  console.log("Results container exists:", !!resultsContainer);
  
  if (claudeRoot) {
    claudeRoot.innerHTML = `<div style="padding:16px; background: var(--ds-color-purple-50); border-radius: 8px; color: var(--ds-color-purple-700);">
      <strong>Claude Component Test</strong><br>
      This should appear if JavaScript is working!
    </div>`;
  }
  
  if (resultsContainer) {
    resultsContainer.innerHTML = `
      <div style="padding:16px; color: var(--ds-color-grey-neutral-900);">
        <strong>Search Results:</strong>
        <p>✓ 2 BHK Apartment in Bandra - ₹2.5 Cr</p>
        <p>✓ 3 BHK Luxury Flat - ₹3.2 Cr</p>
      </div>
    `;
  }
});
