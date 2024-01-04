import publicSuffixList from './libs/publicsuffixlist.js';

fetch('./data/public_suffix_list.dat')
    .then(response => response.text())
    .then(data => {
        publicSuffixList.parse(data, punycode.toASCII);
    })
    .catch(error => {
        console.error('Error fetching public_suffix_list.dat:', error);
    });



browser.runtime.onMessage.addListener((message, sender) => 
    browser.tabs.query({currentWindow: true, active: true}).then(([tab]) => {
        let eTLD_plus_1 = publicSuffixList.getDomain(new URL(tab.url).hostname);
        return ({res: eTLD_plus_1});
    }, console.error)
);

