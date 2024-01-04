browser.runtime.sendMessage({req: "geteTLD"}).then((response) => {
    navigator.clipboard.writeText(response.res);
}, console.error);