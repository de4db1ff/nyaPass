
chrome.runtime.sendMessage({req: "geteTLD"}, (response) => {
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
    }
});