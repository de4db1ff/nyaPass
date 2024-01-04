import publicSuffixList from './libs/publicsuffixlist.js';

await publicSuffixList.enableWASM();


fetch('./data/public_suffix_list.dat')
    .then(response => response.text())
    .then(data => {
        publicSuffixList.parse(data, punycode.toASCII);
    })
    .catch(error => {
        console.error('Error fetching public_suffix_list.dat:', error);
    });

browser.runtime.onMessage.addListener((message, sender) => {
    if (message.req === 'geteTLD') {
        return browser.tabs.query({currentWindow: true, active: true}).then(([tab]) => {
            let eTLD_plus_1 = publicSuffixList.getDomain(new URL(tab.url).hostname);
            browser.storage.local.set({eTLD: eTLD_plus_1});
            return ({res: eTLD_plus_1});
        }, console.error);
    }
});


browser.runtime.onMessage.addListener((message, sender) => {
    if (message.req === 'getApplicationKey') {
        return browser.tabs.query({currentWindow: true, active: true}).then(([tab]) => {
            let eTLD_plus_1 = publicSuffixList.getDomain(new URL(tab.url).hostname);
            return ({res: eTLD_plus_1});
        }).then((eTLD_plus_1) => {

        });
    }
});