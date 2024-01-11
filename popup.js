
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
                timeout: 60000,
                rpId: "nya.Pass",
                challenge: challenge,
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
            let applicationKey = btoa(String.fromCharCode(...prfRes));
            document.getElementById("password").textContent = applicationKey;
            document.getElementById("password").removeAttribute("aria-busy");

        })
        .catch(console.error);
    }
});