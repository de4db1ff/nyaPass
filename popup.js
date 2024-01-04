browser.runtime.sendMessage({req: "eTLD_plus_1"}).then((response) => {
    navigator.clipboard.writeText(response.res);
}, console.error);