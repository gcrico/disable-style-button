var ToggleButton = require("sdk/ui/button/toggle").ToggleButton;
var windows = require("sdk/windows").browserWindows;
var tabs = require("sdk/tabs");
var viewFor = require("sdk/view/core").viewFor;

// deprecation warnings are too noisy!
require("sdk/preferences/service").set("devtools.errorconsole.deprecation_warnings", false);

var button = ToggleButton({
    id: "DisableStylesButton-toolbar-button",
    label: "Disable styles",
    icon: {
        "16": "./button-16.png",
        "24": "./button-24.png",
        "32": "./button-32.png",
        "64": "./button-64.png"
    }
});

button.on('change', onButtonChange);
tabs.on('activate', onTabActivate);

function onTabActivate(tab) {
    //console.log('onTabActivate! ', arguments, this);
    let activeDomWindow = viewFor(windows.activeWindow);
    let markupDocumentViewer = activeDomWindow.getMarkupDocumentViewer();
    let authorStyleDisabled = markupDocumentViewer.authorStyleDisabled;
    button.state("tab", {checked: authorStyleDisabled});
}

function onButtonChange() {
    //console.log('onButtonChange! ', arguments, this);
    let activeDomWindow = viewFor(windows.activeWindow);
    let markupDocumentViewer = activeDomWindow.getMarkupDocumentViewer();
    let checked = this.state("tab").checked;
    button.state("tab", {checked: !checked});
    markupDocumentViewer.authorStyleDisabled = !checked;
    activeDomWindow.setStyleDisabled(!checked);
}

