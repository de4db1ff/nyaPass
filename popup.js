document.addEventListener('DOMContentLoaded', () => {
    browser.runtime.sendMessage({req: "geteTLD"}).then((response) => {
        document.getElementById("eTLD").textContent = response.res;
    }, console.error);
});

document.getElementById("password").addEventListener("mouseover", () => {
    browser.runtime.sendMessage({req: "getApplicationKey"}).then((response) => {
        document.getElementById("password").textContent = response.res;
        navigator.clipboard.writeText(response.res);
    }, console.error);
});