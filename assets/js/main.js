document.addEventListener("DOMContentLoaded", () => {
    // 1. Create the sidebar container
    let sidebar = document.querySelector(".sidebar");
    if (!sidebar) {
      sidebar = document.createElement("div");
      sidebar.className = "sidebar";
      document.body.appendChild(sidebar);
    }
  
    // 2. Get all h2 and h3 elements
    const headings = document.querySelectorAll("h2, h3");
    const tocMap = new Map();
  
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
      }
  
      if (heading.tagName === "H2") {
        tocMap.set(heading.id, {
          text: heading.textContent,
          h3s: []
        });
      } else if (heading.tagName === "H3") {
        const lastH2 = Array.from(tocMap.keys()).pop();
        if (lastH2) {
          tocMap.get(lastH2).h3s.push({
            id: heading.id,
            text: heading.textContent
          });
        }
      }
    });
  
    // 3. Generate the TOC HTML
    let tocHTML = `<h5 class="text-white mb-3">Contents</h5>`;
    let sectionIndex = 0;
  
    for (const [h2Id, data] of tocMap) {
        const collapseId = `collapse-${sectionIndex++}`;
    if(data.h3s.length > 0){
      tocHTML += `
        <div class="toc-section">
          <button class="toc-toggle" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
            <span class="arrow">&#9656;</span>
          </button>
          <a href="${window.location.pathname}#${h2Id}" class="toc-link">${data.text}</a>
        </div>
        <div class="collapse show" id="${collapseId}">
          <div class="toc-subsection">
            ${data.h3s.map(h3 => `<a href="${window.location.pathname}#${h3.id}" class="toc-link">${h3.text}</a>`).join("")}
          </div>
        </div>
      `;
    }else{
    
      tocHTML += `
        <div class="toc-section">
          <button class="toc-toggle" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}" style="visibility: hidden;">
            <span class="arrow">&#9656;</span>
          </button>
          <a href="${window.location.pathname}#${h2Id}" class="toc-link">${data.text}</a>
        </div>
      `;
    }

      
    }
  
    sidebar.innerHTML = tocHTML;  

    function loadNavbar() {
        // Define the entire HTML for the navbar

        console.log(window.location.pathname)
        let navbarHTML = "";

        if(window.location.pathname.includes("v2/content/world/north-america/united-states")){
          navbarHTML = `
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed top-0 w-100 z-3">

          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
              aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="govDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Government
                  </a>
                  <ul class="dropdown-menu bg-dark text-light" aria-labelledby="govDropdown">
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/government/executive/presidents.html">Executive</a></li>
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/government/legislative/congress.html">Legislative</a></li>
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/government/judicial/supreme-court.html">Judicial</a></li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="cultureDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Culture
                  </a>
                  <ul class="dropdown-menu bg-dark text-light" aria-labelledby="cultureDropdown">
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/culture/art/us-art.html">Art</a></li>
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/culture/music/us-music.html">Music</a></li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="foundingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Founding
                  </a>
                  <ul class="dropdown-menu bg-dark text-light" aria-labelledby="foundingDropdown">
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/founding/colonization.html">Colonization</a></li>
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/founding/revolution.html">Revolution</a></li>
                  </ul>
                </li>

              </ul>

              <div class="d-lg-none mobile-sidebar-scroll">
                ${tocHTML}
              </div>

              <form class="d-flex ms-auto me-2" role="search">
                <input class="form-control form-control-sm text-bg-dark border-light" type="search" placeholder="Search" aria-label="Search" id="customSearchBox" style="width: 200px;">
              </form>
            </div>
          </div>
        </nav>
          `;
        }else{
          navbarHTML = `
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark position-fixed top-0 w-100 z-3">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
              aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="countriesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Countries
                  </a>
                  <ul class="dropdown-menu bg-dark text-light" aria-labelledby="countriesDropdown">
                    <li><a class="dropdown-item text-light" href="content/world/north-america/united-states/united-states.html">United States</a></li>
                  </ul>
                </li>
              </ul>

              <div class="d-lg-none mobile-sidebar-scroll">
                ${tocHTML}
              </div>
            </div>
          </div>
        </nav>
          `;
        }

        
    
        // Inject the navbar HTML into the body or header
        const header = document.querySelector("body");
        const firstChild = header.firstChild;
        const navbarContainer = document.createElement('div');
        navbarContainer.innerHTML = navbarHTML;
    
        // Insert the navbar at the beginning of the body
        header.insertBefore(navbarContainer.firstElementChild, firstChild);
      }
    
      // Load the navbar when the page is ready
      loadNavbar();

      // Reinitialize Bootstrap dropdowns
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        new bootstrap.Dropdown(dropdown);
      });


      document.querySelectorAll('a.internal-link[href^="#"]').forEach(link => {
        const hash = link.getAttribute('href');
        link.setAttribute('href', window.location.pathname + hash);
      });

      const searchInput = document.getElementById('customSearchBox');
      // const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
          const query = searchInput.value.trim().toLowerCase();
          highlightAndExpandMatches(query);
        }, 300)); // ← 300ms delay, adjust if needed
      }

      function removeHighlights(el) {
        const highlights = el.querySelectorAll('mark.search-highlight');
        highlights.forEach(mark => {
          const text = document.createTextNode(mark.textContent);
          mark.parentNode.replaceChild(text, mark);
        });
      }

      function highlightAndExpandMatches(query) {
        const collapses = document.querySelectorAll('.content .collapse');
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'); // escape regex

        collapses.forEach(collapse => {
          removeHighlights(collapse);
          const text = collapse.innerText.toLowerCase();
          const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse);
          const parentToggle = document.querySelector(`[href="#${collapse.id}"]`);

          if (query && text.includes(query)) {
            bsCollapse.show();
            parentToggle?.setAttribute('aria-expanded', 'true');
            collapse.querySelectorAll('p, li').forEach(el => {
            const span = el.querySelector('span');
            if (!span || !span.textContent.toLowerCase().includes(query)) return;

            const originalHTML = span.innerHTML;
            const highlightedHTML = originalHTML.replace(
              regex,
              '<mark class="search-highlight">$1</mark>'
            );
            span.innerHTML = highlightedHTML;
          });

          } else {
            bsCollapse.hide();
            parentToggle?.setAttribute('aria-expanded', 'false');
          }
        });
      }


      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        // console.log(`query = ${query}`)
        highlightAndExpandMatches(query);
      });


        let idCounter = 0;

  document.querySelectorAll("ul").forEach(ul => {
    if (ul.classList.contains("list-unstyled")) return; // Skip already transformed
    ul.classList.add("list-unstyled");

    ul.querySelectorAll(":scope > li").forEach(li => {
      const uTag = li.querySelector("u");
      if (!uTag) return;

      // 1. Extract title and create safe ID
      const titleText = uTag.textContent.trim();
      const baseId = titleText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
      const uniqueId = `${baseId}-${idCounter++}`;

      // 2. Create collapse toggle
      const strongTitle = document.createElement("strong");
      const underline = document.createElement("u");
      underline.textContent = titleText;
      strongTitle.appendChild(underline);

      const collapseArrow = document.createElement("div");
      collapseArrow.className = "collapse-arrow";
      collapseArrow.setAttribute("data-bs-toggle", "collapse");
      collapseArrow.setAttribute("href", `#${uniqueId}`);
      collapseArrow.setAttribute("role", "button");
      collapseArrow.setAttribute("aria-expanded", "false");
      collapseArrow.setAttribute("aria-controls", uniqueId);
      collapseArrow.appendChild(strongTitle);

      // 3. Remove original <u> from <li>
      uTag.remove();

      // 4. Create collapse content container
      const collapseDiv = document.createElement("div");
      collapseDiv.className = "collapse";
      collapseDiv.id = uniqueId;

      // 5. Handle content splitting on <sup>
      const newParagraphs = [];

      const nodes = Array.from(li.childNodes); // include text, sup, and elements
      let currentSpan = document.createElement("span");
      let currentP = document.createElement("p");
      currentP.appendChild(currentSpan);

      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          currentSpan.appendChild(document.createTextNode(node.textContent));
        } else if (node.tagName === "SUP") {
          currentP.appendChild(node.cloneNode(true));
          newParagraphs.push(currentP);

          // Reset for next group
          currentSpan = document.createElement("span");
          currentP = document.createElement("p");
          currentP.appendChild(currentSpan);
        } else if (node.tagName === "UL") {
          // Nested list: add as-is outside of the wrapping <p>
          newParagraphs.push(node.cloneNode(true));
        } else {
          currentSpan.appendChild(node.cloneNode(true)); // catch <a> or others
        }
      });

      // Add any remaining span if it had text
      if (currentSpan.textContent.trim() !== '') {
        newParagraphs.push(currentP);
      }

      // Append all new paragraphs into collapse div
      newParagraphs.forEach(p => collapseDiv.appendChild(p));

      // 6. Replace original <li> content with new structure
      li.innerHTML = "";
      li.appendChild(collapseArrow);
      li.appendChild(collapseDiv);
    });
  });
      

  function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
} 
});