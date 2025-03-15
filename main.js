// ==UserScript==
// @name          Twitch Auto Claim Bonus Points
// @version       1.0.0
// @description   Claim automatically bonus points in Twitch.
// @icon          https://i.ibb.co/Y7mWWKGT/Twitch-Auto-Claim-Bonus-Points-Icon.png
// @grant         none
// @author        Holome
// @match         *://twitch.tv/*
// @match         *://*.twitch.tv/*
// ==/UserScript==

window.addEventListener("load", () => {
	const observer = new MutationObserver(() => {
		const buttonNodes = document.getElementsByTagName("button");

		Array.from(buttonNodes).forEach((buttonNode) => {
			try {
				if (buttonNode.getElementsByClassName("claimable-bonus__icon").length < 1) return;
				if (buttonNode.classList.contains("claimed")) return;
				if (buttonNode.hasAttribute("disabled")) return;

				buttonNode.click();
				buttonNode.classList.add("claimed");
				console.log("Bonus claimed.", buttonNode);
			} catch (error) {
				console.error("Unable to claim the bonus.", error);
			}
		});
	});

	try {
		observer.observe(document.body, { childList: true, subtree: true });
		console.log("Start observation...");
	} catch (error) {
		console.error("Unable to start the observation.", error);
	}
});
