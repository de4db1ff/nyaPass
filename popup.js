document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({req: "geteTLD"}, (response) => {
        document.getElementById("eTLD").textContent = response.res;
    });
});

document.getElementById("password").addEventListener("mouseover", () => {
    navigator.credentials.get({
        publicKey: {
            timeout: 60000,
            //TODO: to verify the challenge
            challenge: window.crypto.getRandomValues(new Uint8Array(16)).buffer,
            authenticatorSelection: {
                authenticatorAttachment: "cross-platform",
                residentKey: "required",
            },
            extensions: {prf: {eval: {first: new TextEncoder().encode(document.getElementById("eTLD").textContent)}}},
        },
        rp:{
             id:"nya.pass",
             name:"nyaPass"
        }
    }).then(cliOut => {
        let prfRes = new Uint8Array(cliOut.getClientExtensionResults().prf.results.first);
        let applicationKey = btoa(String.fromCharCode(...prfRes));
        document.getElementById("password").textContent = applicationKey;
    })
    .catch(console.error);
});