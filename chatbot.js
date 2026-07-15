/* ============================================================
   chatbot.js  (TRAVORA Assistant)
   A simple rule-based help chatbot shown on every page.
   ------------------------------------------------------------
   Techniques used (all from CM1605 lectures):
   - getElementById()                         (L09)
   - innerHTML to build and update the widget  (L09)
   - addEventListener("click" / "keyup")      (L09)
   - functions and if / else if               (L06 / L07)
   - .style property to show/hide the window   (L09)
   - indexOf() to look for words in the message
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    // The chatbot is drawn inside this empty container on each page.
    var root = document.getElementById("chatbot-root");
    if (root === null) {
        return;
    }

    // Build the whole widget with one innerHTML string:
    // a round toggle button + a chat window (hidden at first).
    root.innerHTML =
        '<button type="button" id="chat-toggle" class="chat-toggle" aria-label="Open chat assistant">Chat</button>' +
        '<div id="chat-window" class="chat-window" role="dialog" aria-label="TRAVORA assistant">' +
        '  <div class="chat-header">' +
        '    <span>TRAVORA Assistant</span>' +
        '    <button type="button" id="chat-close" class="chat-close" aria-label="Close chat">X</button>' +
        '  </div>' +
        '  <div id="chat-messages" class="chat-messages"></div>' +
        '  <div class="chat-input-row">' +
        '    <input type="text" id="chat-input" class="chat-input" placeholder="Ask me about destinations..." aria-label="Type your message">' +
        '    <button type="button" id="chat-send" class="chat-send">Send</button>' +
        '  </div>' +
        '</div>';

    var toggle = document.getElementById("chat-toggle");
    var windowBox = document.getElementById("chat-window");
    var closeBtn = document.getElementById("chat-close");
    var messages = document.getElementById("chat-messages");
    var input = document.getElementById("chat-input");
    var sendBtn = document.getElementById("chat-send");

    // Open the chat window and show a first greeting (only once).
    var greeted = false;
    toggle.addEventListener("click", function () {
        windowBox.style.display = "flex";
        if (greeted === false) {
            addMessage("Hi! I am the TRAVORA assistant. Ask me about our categories, prices, searching, or making an enquiry.", "bot");
            greeted = true;
        }
        input.focus();
    });

    // Close the chat window.
    closeBtn.addEventListener("click", function () {
        windowBox.style.display = "none";
    });

    // Send when the button is clicked.
    sendBtn.addEventListener("click", sendMessage);

    // Send when the user presses Enter in the text box.
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Read the user's text, show it, then show the bot's reply.
    function sendMessage() {
        var text = input.value;
        if (text.trim() === "") {
            return;
        }
        addMessage(text, "user");
        var reply = botReply(text.toLowerCase());
        addMessage(reply, "bot");
        input.value = "";
    }

    // Add one message bubble to the chat window.
    function addMessage(text, who) {
        messages.innerHTML += '<div class="chat-msg ' + who + '">' + text + '</div>';
        // Always scroll to the newest message.
        messages.scrollTop = messages.scrollHeight;
    }

    // Decide what the bot should say, based on words in the message.
    function botReply(msg) {
        if (msg.indexOf("hi") > -1 || msg.indexOf("hello") > -1 || msg.indexOf("hey") > -1) {
            return "Hello! Where would you like to travel? We have beaches, mountains, historical sites, wildlife, cities and scenic wonders.";
        } else if (msg.indexOf("categor") > -1) {
            return "Our six categories are: Beaches, Mountains, Historical Sites, Wildlife, Cities and Scenic Wonders. Use the filter buttons on the Destinations page.";
        } else if (msg.indexOf("beach") > -1) {
            return "For beaches, try Bali, Maya Bay or Whitehaven Beach. Click the Beaches filter to see them all.";
        } else if (msg.indexOf("mountain") > -1) {
            return "Mountain lovers enjoy the Dolomites, Mount Bromo and Mount Fuji.";
        } else if (msg.indexOf("history") > -1 || msg.indexOf("historic") > -1) {
            return "Historical highlights include the Taj Mahal, Machu Picchu, Petra and the Colosseum.";
        } else if (msg.indexOf("wild") > -1 || msg.indexOf("animal") > -1 || msg.indexOf("safari") > -1) {
            return "For wildlife, visit the Serengeti, Yala National Park, Borneo or the Galapagos Islands.";
        } else if (msg.indexOf("city") > -1 || msg.indexOf("cities") > -1) {
            return "Popular cities include Tokyo, Paris, London, Dubai and Sydney.";
        } else if (msg.indexOf("scenic") > -1 || msg.indexOf("wonder") > -1 || msg.indexOf("nature") > -1) {
            return "Scenic wonders include the Grand Canyon, Milford Sound, Banff and the Northern Lights.";
        } else if (msg.indexOf("price") > -1 || msg.indexOf("fee") > -1 || msg.indexOf("cost") > -1) {
            return "Each destination card shows its entrance fee. Many beaches and cities are free to enter.";
        } else if (msg.indexOf("search") > -1) {
            return "Use the search bar on the Home or Destinations page to search by destination name or location.";
        } else if (msg.indexOf("book") > -1 || msg.indexOf("enquir") > -1 || msg.indexOf("contact") > -1) {
            return "Great! Please fill in the enquiry form on the Enquiry page and our team will reply within 2 working days.";
        } else if (msg.indexOf("thank") > -1) {
            return "You are welcome! Safe travels with TRAVORA.";
        } else {
            return "I can help with categories, prices, searching and enquiries. Try asking about beaches, cities or how to make an enquiry.";
        }
    }
});
