
chrome.runtime.sendMessage({req: "geteTLDp1"}, (response) => {
    if(response.res !== ''){
        document.getElementById("eTLD").textContent = response.res;
    }else{
        document.getElementById("password").textContent = "Cannot get eTLD for the current tab.";
        document.getElementById("password").disabled = true;
    }
});


document.getElementById("password").addEventListener("click", (e) => {
    e.currentTarget.setAttribute("aria-busy", true);
    if(document.getElementById("eTLD").textContent){
        let challenge = window.crypto.getRandomValues(new Uint8Array(16)).buffer;
        navigator.credentials.get({
            publicKey: {
                challenge: challenge,
                timeout: 60000,
                rpId: "nya.Pass",
                hints: "security-key",
                extensions: {prf: {eval: {first: new TextEncoder().encode(document.getElementById("eTLD").textContent)}}},
            }
        })
        .then(authenticatorRes => {
            let clientData = JSON.parse(String.fromCharCode(...new Uint8Array(authenticatorRes.response.clientDataJSON)));
            
            //quick hack for base64/base64url conversion
            let oriChallenge = btoa(String.fromCharCode(...new Uint8Array(challenge))).replace(/=/g, '');
            let rcvChallenge = clientData.challenge.replace(/-/g, '+').replace(/_/g, '/');
            if(oriChallenge !== rcvChallenge){
                throw new Error("Challenge mismatch.");
            }
            
            let prfRes = new Uint8Array(authenticatorRes.getClientExtensionResults().prf.results.first);

            // lossy base58-like output without introducing a new dependency
            let applicationKey = btoa(String.fromCharCode(...prfRes)).replace(/[=\+oOIl]/g, '');

            applicationKey = applicationKey.slice(0, 4)
            +'-' + applicationKey.slice(4, 8)
            +'-' + applicationKey.slice(8, 12)
            +'-' + applicationKey.slice(12, 16); 

            document.getElementById("password").parentElement.textContent = applicationKey;
            document.getElementById("password").removeAttribute("aria-busy");
            document.getElementById("password").disabled = true;


        })
        .catch(console.error);
    }
});