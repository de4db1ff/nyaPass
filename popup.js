
chrome.runtime.sendMessage({req: "geteTLDp1"}, (response) => {
    if(response.res){
        document.getElementById("eTLD").textContent = response.res;
    }else{
        document.getElementById("password").textContent = "Cannot get eTLD for current tab.";
        document.getElementById("password").disabled = true;
    }
});


document.getElementById("password").addEventListener("click", (e) => {
    e.currentTarget.setAttribute("aria-busy", true);
    if(document.getElementById("eTLD").textContent){
        let challenge = window.crypto.getRandomValues(new Uint8Array(16)).buffer;
        navigator.credentials.get({
            publicKey: {
                timeout: 60000,
                rpId: "nya.Pass",
                challenge: challenge,
                authenticatorSelection: {
                    authenticatorAttachment: "cross-platform",
                    residentKey: "required",
                },
                extensions: {prf: {eval: {first: new TextEncoder().encode(document.getElementById("eTLD").textContent)}}},
            }
        })
        .then(authenticatorRes => {
            let clientData = JSON.parse(String.fromCharCode(...new Uint8Array(authenticatorRes.response.clientDataJSON)));
            if(clientData.challenge !== challenge){
                throw new Error("Challenge mismatch.");
            }
            let prfRes = new Uint8Array(authenticatorRes.getClientExtensionResults().prf.results.first);
            let applicationKey = btoa(String.fromCharCode(...prfRes));
            document.getElementById("password").textContent = applicationKey;
        })
        .catch(console.error);
    }
});