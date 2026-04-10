document.addEventListener("DOMContentLoaded", function () {
  // 1. Find the search icon
  const searchIcons = document.querySelectorAll("img[src*='search.png']");
  
  if (searchIcons.length > 0) {
    searchIcons.forEach(icon => {
      icon.style.cursor = "pointer";
      icon.addEventListener("click", function() {
        window.location.href = "search.html";
      });
    });
  }

  // 2. If we are on Product.html, filter the products
  if (window.location.pathname.toLowerCase().includes("product.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      
      // Update the page title to show we are searching
      const titleEl = document.querySelector("section.product-section h1");
      if (titleEl) {
        titleEl.textContent = 'Search Results for: "' + searchQuery + '"';
      }
      
      // Smart aliases for search keywords
      const aliases = {
        "ts": ["ts -", "t-shirt", "tshirt", "kaos", "baju", "shirt"],
        "pants": ["pants", "jorts", "jort", "celana"],
        "celana": ["pants", "jorts", "jort", "celana"],
        "shirt": ["ts -", "t-shirt", "tshirt", "kaos", "baju", "shirt"],
        "t-shirt": ["ts -", "t-shirt", "tshirt", "kaos", "baju", "shirt"],
        "tshirt": ["ts -", "t-shirt", "tshirt", "kaos", "baju", "shirt"],
        "kaos": ["ts -", "t-shirt", "tshirt", "kaos", "baju", "shirt"],
        "baju": ["ts -", "t-shirt", "tshirt", "kaos", "baju", "shirt"],
        "hoodie": ["hd -", "hoddie", "hoodie", "sweater", "jaket"],
        "hoddie": ["hd -", "hoddie", "hoodie", "sweater", "jaket"],
        "jacket": ["hd -", "hoddie", "hoodie", "sweater", "jaket"],
        "jaket": ["hd -", "hoddie", "hoodie", "sweater", "jaket"]
      };

      // Get an array of search terms based on aliases, or just use the query itself
      const searchTerms = aliases[q] || [q];

      // Filter cards
      const cards = document.querySelectorAll(".card-link");
      let foundCount = 0;
      cards.forEach(card => {
        const title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
        
        // A match is found if the title includes any of the search terms
        const isMatch = searchTerms.some(term => {
            if (term === "ts -" || term === "hd -") return title.startsWith(term);
            return title.includes(term);
        });
        
        if (isMatch) {
          card.style.display = "block";
          foundCount++;
        } else {
          card.style.display = "none";
        }
      });

      // Show message if no results
      if (foundCount === 0) {
        const grid = document.querySelector(".product-grid");
        if (grid) {
          const noResult = document.createElement("p");
          noResult.textContent = "No products found matching your search.";
          noResult.style.width = "100%";
          noResult.style.textAlign = "center";
          noResult.style.fontSize = "18px";
          noResult.style.color = "#777";
          noResult.style.gridColumn = "1 / -1";
          noResult.style.padding = "50px 0";
          grid.appendChild(noResult);
        }
      }
    }
  }
});
