import publicSuffixList from './libs/publicsuffixlist.js';
import punycode from './libs/punycode.es6.js';

publicSuffixList.enableWASM();


fetch('./data/public_suffix_list.dat')
    .then(response => response.text())
    .then(data => {
        publicSuffixList.parse(data, punycode.toASCII);
    })
    .catch(error => {
        console.error('Error fetching public_suffix_list.dat:', error);
    });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.req === 'geteTLD') {
         chrome.tabs.query({currentWindow: true, active: true})
        .then(([tab]) => {
            let eTLDp1 = publicSuffixList.getDomain(new URL(tab.url).hostname);
            chrome.storage.local.set({eTLDp1: eTLDp1});
            sendResponse({res: eTLDp1});
        }, console.error);
    }
    return true;
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.req === 'getApplicationKey') {
        chrome.storage.local.get()
        .then(storage => 
            navigator.credentials.get({
                publicKey: {
                    timeout: 60000,
                    //TODO: to verify the challenge
                    challenge: window.crypto.getRandomValues(new Uint8Array(16)).buffer,
                    authenticatorSelection: {
                        authenticatorAttachment: "cross-platform",
                        residentKey: "required",
                    },
                    extensions: {prf: {eval: {first: new TextEncoder().encode(storage.eTLDp1)}}},
                },
                rp:{
                     id:"nya.pass",
                     name:"nyaPass"
                }
            })
        )
        .then(cliOut => {
            let prfRes = new Uint8Array(cliOut.getClientExtensionResults().prf.results.first);
            let applicationKey = btoa(String.fromCharCode(...prfRes));
            sendResponse({res: applicationKey});
        })
        .catch(console.error);
        return true;
    }
});