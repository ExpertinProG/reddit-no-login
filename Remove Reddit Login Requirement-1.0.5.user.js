// ==UserScript==
// @name         Remove Reddit Login Requirement
// @namespace    socuul.reddit_rem_loginreq
// @version      1.0.5
// @description  Remove the on-screen modal that forces you to log in for certain posts.
// @author       SoCuul
// @license      MIT
// @match        http://*.reddit.com/*
// @match        https://*.reddit.com/*
// @icon         https://reddit.com/favicon.ico
// @grant        GM_addStyle
// @downloadURL https://update.greasyfork.org/scripts/463802/Remove%20Reddit%20Login%20Requirement.user.js
// @updateURL https://update.greasyfork.org/scripts/463802/Remove%20Reddit%20Login%20Requirement.meta.js
// ==/UserScript==

(function() {

    const nsfwBlurredContainer = document.querySelector('shreddit-blurred-container')?.shadowRoot?.firstElementChild
    nsfwBlurredContainer?.setAttribute('class', nsfwBlurredContainer.attributes?.getNamedItem('class')?.nodeValue?.replace(/xs:rounded-t-\[16px\] xs:rounded-b-\[16px\]/g, ''))

    const mainContent = document.querySelector('.sidebar-grid')
    mainContent?.setAttribute('style', mainContent.attributes?.getNamedItem('style')?.nodeValue?.replace(/filter: blur\(4px\);/g, ''))

    const nsfwBlockingModal = document.querySelector('xpromo-nsfw-blocking-modal-desktop')
    nsfwBlockingModal?.remove()

    // Disable scroll prevention
    const body = document.querySelector('body')
    body?.setAttribute('style', body.attributes?.getNamedItem('style')?.nodeValue?.replace(/pointer-events: none; overflow: hidden;/g, ''))

    //Remove other elements
    const observerOptions = { subtree: true, childList: true }
    const mObserver = new MutationObserver(function() {

        const nsfwBlockingBypassableModal = document.querySelector('xpromo-nsfw-bypassable-modal-desktop')
        nsfwBlockingBypassableModal?.remove()

        const nsfwBlockingContainer = document.querySelector('xpromo-nsfw-blocking-container')?.shadowRoot?.querySelector('.prompt')
        nsfwBlockingContainer?.remove()

        // Remove inline blur
        document.querySelector('shreddit-blurred-container').shadowRoot.firstElementChild.firstElementChild.style = ''

        // Change image urls to remove blur
        //const blurredImgs = document.querySelector('shreddit-blurred-container')?.firstElementChild?.firstElementChild?.children
        //for (const el of blurredImgs) {
        //    el.src = el.src.replace(/preview.redd.it/g, 'i.redd.it')
        //}

    })

    mObserver.observe(document, observerOptions)

})();