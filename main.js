// ==UserScript==
// @name          Twitch Auto Claim Bonus Points
// @version       1.1.0
// @description   Claim automatically bonus points in Twitch.
// @icon          https://i.ibb.co/Y7mWWKGT/Twitch-Auto-Claim-Bonus-Points-Icon.png
// @grant         none
// @author        Holome
// @homepage      https://github.com/Holome-1st/Twitch-Auto-Claim-Bonus-Points
// @match         https://www.twitch.tv/*
// @updateURL     https://raw.githubusercontent.com/Holome-1st/Twitch-Auto-Claim-Bonus-Points/refs/heads/main/main.js
// @downloadURL   https://raw.githubusercontent.com/Holome-1st/Twitch-Auto-Claim-Bonus-Points/refs/heads/main/main.js
// ==/UserScript==

(function() {
    'use strict';

    const observer = new MutationObserver(() => {
        const buttonNodes = document.getElementsByTagName("button");

        // Iterate over each button found.
        Array.from(buttonNodes).forEach((buttonNode) => {
            try {
                // Checks if the button is eligible for claiming.
                if (buttonNode.getElementsByClassName("claimable-bonus__icon").length < 1) return;
                if (buttonNode.classList.contains("claimed")) return;
                if (buttonNode.hasAttribute("disabled")) return;

                // Clicks the button and marks it as claimed.
                buttonNode.click();
                buttonNode.classList.add("claimed");
                console.log("Bonus claimed.", buttonNode);
            } catch (error) {
                console.error("Unable to claim the bonus.", error);
            }
        });
    });

    try {
        // Start observing the body.
        observer.observe(document.body, { childList: true, subtree: true });
        console.log("Start observation...");
    } catch (error) {
        console.error("Unable to start the observation.", error);
    }
})();
