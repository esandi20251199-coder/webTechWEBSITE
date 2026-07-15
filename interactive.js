/* ============================================================
   interactive.js  (TRAVORA)
   Small touches that make the site feel alive:
   1. A "back to top" button that appears when you scroll down.
   2. A shadow under the header once you start scrolling.
   3. Sections that fade in as they scroll into view.
   4. Statistics that count up when the stats bar appears.
   ------------------------------------------------------------
   Techniques used (all from CM1605 lectures):
   - addEventListener("scroll" / "click")   (L09)
   - getElementById / getElementsByClassName (L09)
   - .style property and .className          (L09)
   - functions, if, for loops                (L06 / L07)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    var header = document.getElementsByTagName("header")[0];
    var toTop = document.getElementById("to-top");
    var reveals = document.getElementsByClassName("reveal");
    var statsAnimated = false; // stats should only count up once

    // Run these checks whenever the user scrolls (and once at the start).
    window.addEventListener("scroll", onScroll);
    onScroll();

    function onScroll() {

        // 1 + 2: header shadow and back-to-top button depend on how far
        // down the page we are (window.pageYOffset = scroll distance).
        var y = window.pageYOffset;

        if (header) {
            if (y > 10) {
                header.className = addClass(header.className, "scrolled");
            } else {
                header.className = removeClass(header.className, "scrolled");
            }
        }

        if (toTop) {
            toTop.style.display = (y > 400) ? "block" : "none";
        }

        // 3: reveal any section that is now inside the screen.
        for (var i = 0; i < reveals.length; i++) {
            if (isInView(reveals[i])) {
                reveals[i].className = addClass(reveals[i].className, "visible");
            }
        }

        // 4: when the stats bar becomes visible, count the numbers up once.
        var stats = document.getElementsByClassName("stat-number");
        if (statsAnimated === false && stats.length > 0 && isInView(stats[0])) {
            statsAnimated = true;
            for (var s = 0; s < stats.length; s++) {
                countUp(stats[s]);
            }
        }
    }

    // Scroll smoothly back to the top when the button is clicked.
    if (toTop) {
        toTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // True if the top of the element is within the viewport height.
    function isInView(el) {
        var box = el.getBoundingClientRect();
        return box.top < window.innerHeight - 60;
    }

    // Animate a number from 0 up to its data-target value.
    function countUp(el) {
        var target = Number(el.getAttribute("data-target"));
        var suffix = el.getAttribute("data-suffix");
        if (suffix === null) { suffix = ""; }

        var current = 0;
        var step = Math.ceil(target / 40); // ~40 frames

        var timer = setInterval(function () {
            current = current + step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.innerHTML = current + suffix;
        }, 25);
    }

    // Small helpers to add / remove a class safely.
    function addClass(existing, name) {
        if (existing.indexOf(name) === -1) {
            return (existing + " " + name).trim();
        }
        return existing;
    }

    function removeClass(existing, name) {
        return existing.replace(" " + name, "").replace(name, "").trim();
    }
});
