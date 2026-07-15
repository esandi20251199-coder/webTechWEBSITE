/* ============================================================
   destinations.js  (TRAVORA)
   Loads destination data from destinations.xml, shows it as
   cards, filters the cards by category, and searches by name.
   ------------------------------------------------------------
   Techniques used (all from CM1605 lectures):
   - XML DOM Parser (text string -> XML DOM object)   (L11 slide 25)
   - getElementsByTagName() to read XML nodes         (L09 / L11)
   - .textContent to read the text inside a node
   - innerHTML to build the cards                      (L09)
   - for loops                                         (L07)
   - getElementById / getElementsByClassName          (L09)
   - addEventListener("click" / "keyup", ...)         (L09)
   - .style property to show/hide cards               (L09)
   ============================================================ */

/* A backup copy of the XML kept as a text string.
   The XML DOM Parser can build an XML document from a text string
   (Lecture 11, slide 25). This backup is only used if the browser
   blocks reading the real file (which happens when the page is opened
   directly from disk with file:// instead of a web server).
   The real, marked data source is the separate destinations.xml file.
   This line is generated automatically from destinations.xml. */
var EMBEDDED_XML = '<destinations><destination><destination_name>Baia do Sancho</destination_name><category>beaches</category><location>Fernando de Noronha, Brazil</location><description>Award winning bay with turquoise water and dramatic green cliffs.</description><image_url>images/baia-do-sancho.jpg</image_url><entrance_fee>20.00</entrance_fee></destination><destination><destination_name>Bali</destination_name><category>beaches</category><location>Indonesia</location><description>Golden beaches, warm waters and coral reefs perfect for snorkelling.</description><image_url>images/bali.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Matira Beach</destination_name><category>beaches</category><location>Bora Bora, French Polynesia</location><description>Soft white sand and calm lagoon waters in the South Pacific.</description><image_url>images/matira-beach-bora.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Maya Bay</destination_name><category>beaches</category><location>Krabi, Thailand</location><description>Sheltered bay framed by towering limestone cliffs.</description><image_url>images/maya-bay-thailand.jpg</image_url><entrance_fee>15.00</entrance_fee></destination><destination><destination_name>Navagio Beach</destination_name><category>beaches</category><location>Zakynthos, Greece</location><description>Famous shipwreck cove reached only by boat.</description><image_url>images/navagio-beach-greece.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Pink Beach</destination_name><category>beaches</category><location>Komodo, Indonesia</location><description>Rare pink sand shore beside a clear blue sea.</description><image_url>images/pink-beach-indonesia.jpg</image_url><entrance_fee>10.00</entrance_fee></destination><destination><destination_name>Tulum Beach</destination_name><category>beaches</category><location>Quintana Roo, Mexico</location><description>Caribbean sand backed by ancient Mayan ruins.</description><image_url>images/tulum-beach.jpg</image_url><entrance_fee>12.00</entrance_fee></destination><destination><destination_name>Whitehaven Beach</destination_name><category>beaches</category><location>Whitsundays, Australia</location><description>Pure silica sand swirled with turquoise tides.</description><image_url>images/whitehaven-beach-australia.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Dolomites</destination_name><category>mountains</category><location>Italy</location><description>Jagged limestone peaks loved by hikers and skiers.</description><image_url>images/dolomites-italy.jpg</image_url><entrance_fee>25.00</entrance_fee></destination><destination><destination_name>Mount Bromo</destination_name><category>mountains</category><location>East Java, Indonesia</location><description>Active volcano famous for sunrise over a sea of sand.</description><image_url>images/mount-bromo-indonesia.jpg</image_url><entrance_fee>18.00</entrance_fee></destination><destination><destination_name>Mount Fuji</destination_name><category>mountains</category><location>Honshu, Japan</location><description>Japan iconic volcano with popular climbing trails and lake views.</description><image_url>images/mount-fuji.jpg</image_url><entrance_fee>40.00</entrance_fee></destination><destination><destination_name>Great Wall of China</destination_name><category>historical</category><location>China</location><description>Ancient defensive wall winding across northern hills.</description><image_url>images/great-wall-of-china.jpg</image_url><entrance_fee>30.00</entrance_fee></destination><destination><destination_name>Statue of Liberty</destination_name><category>historical</category><location>New York, USA</location><description>Iconic copper statue and symbol of freedom.</description><image_url>images/statue-of-liberty.jpg</image_url><entrance_fee>24.00</entrance_fee></destination><destination><destination_name>Machu Picchu</destination_name><category>historical</category><location>Cusco, Peru</location><description>Lost Inca city set high in the Andes mountains.</description><image_url>images/machu-picchu-peru.jpg</image_url><entrance_fee>45.00</entrance_fee></destination><destination><destination_name>Petra</destination_name><category>historical</category><location>Maan, Jordan</location><description>Rose coloured city carved into desert rock.</description><image_url>images/petra.jpg</image_url><entrance_fee>50.00</entrance_fee></destination><destination><destination_name>Pyramids of Giza</destination_name><category>historical</category><location>Giza, Egypt</location><description>The last surviving wonder of the ancient world.</description><image_url>images/pyramids.jpg</image_url><entrance_fee>22.00</entrance_fee></destination><destination><destination_name>Red Square</destination_name><category>historical</category><location>Moscow, Russia</location><description>Historic square framed by colourful onion domes.</description><image_url>images/red-square.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Colosseum</destination_name><category>historical</category><location>Rome, Italy</location><description>Roman amphitheatre nearly two thousand years old.</description><image_url>images/rome.jpg</image_url><entrance_fee>25.00</entrance_fee></destination><destination><destination_name>Sagrada Familia</destination_name><category>historical</category><location>Barcelona, Spain</location><description>Unfinished basilica designed by Antoni Gaudi.</description><image_url>images/sagrada-familia.jpg</image_url><entrance_fee>28.00</entrance_fee></destination><destination><destination_name>Taj Mahal</destination_name><category>historical</category><location>Agra, India</location><description>White marble mausoleum built for a beloved queen.</description><image_url>images/taj-mahal.jpg</image_url><entrance_fee>20.00</entrance_fee></destination><destination><destination_name>Borneo</destination_name><category>wildlife</category><location>Malaysia</location><description>Rainforest home of orangutans and rare wildlife.</description><image_url>images/borneo.jpg</image_url><entrance_fee>35.00</entrance_fee></destination><destination><destination_name>Galapagos Islands</destination_name><category>wildlife</category><location>Ecuador</location><description>Volcanic isles full of unique and fearless animals.</description><image_url>images/galapagos-ecuador.jpg</image_url><entrance_fee>100.00</entrance_fee></destination><destination><destination_name>Serengeti</destination_name><category>wildlife</category><location>Tanzania</location><description>Vast savannah famous for the great wildebeest migration.</description><image_url>images/serengeti.jpg</image_url><entrance_fee>70.00</entrance_fee></destination><destination><destination_name>Yala National Park</destination_name><category>wildlife</category><location>Southern, Sri Lanka</location><description>Home to leopards, elephants and colourful birdlife.</description><image_url>images/yala-sri-lanka.jpg</image_url><entrance_fee>55.00</entrance_fee></destination><destination><destination_name>Bangkok</destination_name><category>cities</category><location>Thailand</location><description>Buzzing capital of temples, markets and street food.</description><image_url>images/bangkok.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Burj Khalifa</destination_name><category>cities</category><location>Dubai, UAE</location><description>The tallest building in the world with sky high views.</description><image_url>images/burj-khalifa.jpg</image_url><entrance_fee>40.00</entrance_fee></destination><destination><destination_name>Dubai</destination_name><category>cities</category><location>UAE</location><description>Futuristic desert city of skyscrapers and luxury.</description><image_url>images/dubai-city.png</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>London</destination_name><category>cities</category><location>United Kingdom</location><description>Historic capital on the River Thames.</description><image_url>images/london.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Marina Bay Sands</destination_name><category>cities</category><location>Singapore</location><description>Iconic skyline with a rooftop infinity pool.</description><image_url>images/marina-bay-sands.jpg</image_url><entrance_fee>23.00</entrance_fee></destination><destination><destination_name>Paris</destination_name><category>cities</category><location>France</location><description>The city of light, art and the Eiffel Tower.</description><image_url>images/paris.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Sydney</destination_name><category>cities</category><location>Australia</location><description>Harbour city known for its opera house and beaches.</description><image_url>images/sydney.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Tokyo</destination_name><category>cities</category><location>Japan</location><description>Neon metropolis blending tradition and technology.</description><image_url>images/tokyo.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Vancouver</destination_name><category>cities</category><location>Canada</location><description>Coastal city surrounded by mountains and sea.</description><image_url>images/vancouver.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Banff National Park</destination_name><category>scenic</category><location>Alberta, Canada</location><description>Turquoise lakes framed by the Canadian Rockies.</description><image_url>images/banff-canada.jpg</image_url><entrance_fee>21.00</entrance_fee></destination><destination><destination_name>Cliffs of Moher</destination_name><category>scenic</category><location>Clare, Ireland</location><description>Dramatic sea cliffs rising above the Atlantic.</description><image_url>images/cliffs-of-moher.jpg</image_url><entrance_fee>12.00</entrance_fee></destination><destination><destination_name>Grand Canyon</destination_name><category>scenic</category><location>Arizona, USA</location><description>Immense red rock gorge carved by the Colorado River.</description><image_url>images/grand-canyon.jpg</image_url><entrance_fee>35.00</entrance_fee></destination><destination><destination_name>Milford Sound</destination_name><category>scenic</category><location>Fiordland, New Zealand</location><description>Majestic fiord with waterfalls and steep cliffs.</description><image_url>images/milford-sound.jpg</image_url><entrance_fee>30.00</entrance_fee></destination><destination><destination_name>Northern Lights</destination_name><category>scenic</category><location>Iceland</location><description>Dancing green auroras across the winter night sky.</description><image_url>images/northern-lights.jpg</image_url><entrance_fee>0.00</entrance_fee></destination><destination><destination_name>Yellowstone</destination_name><category>scenic</category><location>Wyoming, USA</location><description>Geysers, hot springs and abundant wildlife.</description><image_url>images/yellowstone.jpg</image_url><entrance_fee>35.00</entrance_fee></destination></destinations>';

// Run after the page has loaded so #destination-grid already exists.
document.addEventListener("DOMContentLoaded", function () {

    var grid = document.getElementById("destination-grid");
    if (grid === null) {
        return; // this page has no card grid (e.g. the form page)
    }

    // Try to load the real XML file first.
    // If that fails (opened from disk), fall back to the embedded copy.
    fetch("destinations.xml")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("File not reachable");
            }
            return response.text();
        })
        .then(function (xmlText) {
            buildCards(xmlText);
        })
        .catch(function () {
            buildCards(EMBEDDED_XML);
        });
});

// Turn XML text into cards inside the grid.
function buildCards(xmlText) {

    // Create an XML DOM Parser and build an XML document from the text (L11).
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Collect every <destination> node.
    var destinations = xmlDoc.getElementsByTagName("destination");

    // Build one big HTML string by looping through each destination (L07).
    var html = "";
    for (var i = 0; i < destinations.length; i++) {

        var dest = destinations[i];

        var name = dest.getElementsByTagName("destination_name")[0].textContent;
        var category = dest.getElementsByTagName("category")[0].textContent;
        var location = dest.getElementsByTagName("location")[0].textContent;
        var description = dest.getElementsByTagName("description")[0].textContent;
        var imageUrl = dest.getElementsByTagName("image_url")[0].textContent;
        var fee = dest.getElementsByTagName("entrance_fee")[0].textContent;

        // Show "Free" when the fee is zero, otherwise a dollar amount.
        var feeText = (fee === "0.00") ? "Free" : "$" + fee;

        // Text used by the search box (name + location, in lower case).
        var searchText = (name + " " + location).toLowerCase();

        // Each card gets two classes: a shared one and its category, so we
        // can later filter with getElementsByClassName(category). The
        // data-search attribute is used by the search box.
        html += '<article class="destination-card ' + category + '" data-search="' + searchText + '" data-name="' + name + '" data-location="' + location + '" data-description="' + description + '" data-fee="' + feeText + '" data-image="' + imageUrl + '" data-category="' + category + '">';
        html += '  <img class="card-image" src="' + imageUrl + '" alt="' + name + ' - ' + category + ' destination" loading="lazy">';
        html += '  <div class="card-body">';
        html += '    <span class="category-tag">' + category.toUpperCase() + '</span>';
        html += '    <div class="card-title-row">';
        html += '      <h3>' + name + '</h3>';
        html += '      <span class="price">' + feeText + '</span>';
        html += '    </div>';
        html += '    <p class="location">' + location + '</p>';
        html += '    <p class="description-line">' + description + '</p>';
        html += '    <div class="card-footer-row">';
        html += '      <span class="fee-info">Entrance Fee: ' + feeText + '</span>';
        html += '      <button type="button" class="view-details-btn">View details</button>';
        html += '    </div>';
        html += '  </div>';
        html += '</article>';
    }

    // Put all the cards on the page in one step.
    document.getElementById("destination-grid").innerHTML = html;

    // Staggered pop-in animation so cards appear one after another.
    var newCards = document.getElementsByClassName("destination-card");
    for (var c = 0; c < newCards.length; c++) {
        newCards[c].style.opacity = "0";
        newCards[c].style.transform = "scale(0.92) translateY(20px)";
        (function (card, delay) {
            setTimeout(function () {
                card.className = card.className + " card-pop-in";
                card.style.opacity = "";
                card.style.transform = "";
            }, delay);
        })(newCards[c], c * 60);
    }

    // Switch on the filter buttons, the search box and the detail popups.
    setupFilters();
    setupSearch();
    setupCardModal();
    updateCount();
}

// Build the destination detail popup and make every card open it.
function setupCardModal() {

    var root = document.getElementById("modal-root");
    if (root === null) {
        return; // this page does not use the popup
    }

    // Build the popup once with innerHTML.
    root.innerHTML =
        '<div id="detail-modal" class="modal">' +
        '  <div class="modal-backdrop"></div>' +
        '  <div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '    <button type="button" class="modal-close" aria-label="Close">&times;</button>' +
        '    <img id="modal-img" class="modal-img" src="" alt="">' +
        '    <div class="modal-content">' +
        '      <span id="modal-cat" class="category-tag"></span>' +
        '      <h3 id="modal-title"></h3>' +
        '      <p id="modal-loc" class="location"></p>' +
        '      <p id="modal-desc" class="description-line"></p>' +
        '      <p id="modal-fee" class="fee-info"></p>' +
        '      <a class="cta-btn" href="enquiry.html">Enquire about this trip</a>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    // Open the popup when any card is clicked.
    var cards = document.getElementsByClassName("destination-card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {
            openDetail(this);
        });
    }

    // Close the popup with the X button or by clicking the dark backdrop.
    document.getElementsByClassName("modal-close")[0].addEventListener("click", closeDetail);
    document.getElementsByClassName("modal-backdrop")[0].addEventListener("click", closeDetail);

    // Close the popup when the Escape key is pressed.
    document.addEventListener("keyup", function (event) {
        if (event.key === "Escape") {
            closeDetail();
        }
    });
}

// Fill the popup with the clicked card's details, then show it.
function openDetail(card) {
    document.getElementById("modal-img").src = card.getAttribute("data-image");
    document.getElementById("modal-img").alt = card.getAttribute("data-name");
    document.getElementById("modal-cat").innerHTML = card.getAttribute("data-category").toUpperCase();
    document.getElementById("modal-title").innerHTML = card.getAttribute("data-name");
    document.getElementById("modal-loc").innerHTML = card.getAttribute("data-location");
    document.getElementById("modal-desc").innerHTML = card.getAttribute("data-description");
    document.getElementById("modal-fee").innerHTML = "Entrance Fee: " + card.getAttribute("data-fee");
    var modal = document.getElementById("detail-modal");
    var box = document.getElementsByClassName("modal-box")[0];
    modal.style.display = "flex";
    box.className = box.className.replace(" modal-pop", "");
    setTimeout(function () {
        box.className = box.className + " modal-pop";
    }, 10);
}

// Hide the popup.
function closeDetail() {
    var modal = document.getElementById("detail-modal");
    if (modal !== null) {
        modal.style.display = "none";
    }
}

// Attach a click handler to every filter button.
function setupFilters() {

    var buttons = document.getElementsByClassName("filter-btn");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {

            var category = this.getAttribute("data-category");

            // Clear the search box so filtering starts fresh.
            var search = document.getElementById("destination-search");
            if (search !== null) {
                search.value = "";
            }

            filterCards(category);

            // Move the "active" highlight to the clicked button.
            var allButtons = document.getElementsByClassName("filter-btn");
            for (var j = 0; j < allButtons.length; j++) {
                allButtons[j].className = allButtons[j].className.replace(" active", "");
            }
            this.className = this.className + " active";
        });
    }
}

// Show or hide cards depending on the chosen category.
function filterCards(category) {

    var allCards = document.getElementsByClassName("destination-card");
    for (var i = 0; i < allCards.length; i++) {
        allCards[i].style.display = "none";
    }

    if (category === "all") {
        for (var k = 0; k < allCards.length; k++) {
            allCards[k].style.display = "flex";
            allCards[k].className = allCards[k].className.replace(" card-filter-pop", "") + " card-filter-pop";
        }
    } else {
        var matching = document.getElementsByClassName(category);
        for (var m = 0; m < matching.length; m++) {
            matching[m].style.display = "flex";
            matching[m].className = matching[m].className.replace(" card-filter-pop", "") + " card-filter-pop";
        }
    }

    updateCount();
}

// Search the cards by destination name or location as the user types.
function setupSearch() {

    var input = document.getElementById("destination-search");
    if (input === null) {
        return;
    }

    input.addEventListener("keyup", function () {

        var term = this.value.toLowerCase();
        var cards = document.getElementsByClassName("destination-card");

        for (var i = 0; i < cards.length; i++) {
            var text = cards[i].getAttribute("data-search");
            if (text.indexOf(term) > -1) {
                cards[i].style.display = "flex";
            } else {
                cards[i].style.display = "none";
            }
        }

        // Typing searches across every category, so highlight "All".
        var allButtons = document.getElementsByClassName("filter-btn");
        for (var j = 0; j < allButtons.length; j++) {
            allButtons[j].className = allButtons[j].className.replace(" active", "");
            if (allButtons[j].getAttribute("data-category") === "all") {
                allButtons[j].className = allButtons[j].className + " active";
            }
        }

        updateCount();
    });
}

// Update the "showing X destinations" counter, if it exists on the page.
function updateCount() {

    var counter = document.getElementById("result-count");
    if (counter === null) {
        return;
    }

    var cards = document.getElementsByClassName("destination-card");
    var shown = 0;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].style.display !== "none") {
            shown++;
        }
    }

    counter.innerHTML = "Showing " + shown + " destinations";
}
