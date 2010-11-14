/**
 * Set the cookie value according to the minutes passed in
 *
 * @param {Object} data The number data object that stores parameters
 *
 * @return void
 */
function setCookie(data)
{
    var expiry = new Date();
    var minutes = -1;
    if (data.enabled == 1) {
        minutes = 24*60;
    }
    expiry.setTime(expiry.getTime() + (minutes*60*1000));
    document.cookie="XDEBUG_SESSION=" + data.idekey + "; expires="+expiry.toUTCString()+"; path=/";
}

/**
 * Message handle, decide which functions to call depending on
 * the message that has been sent
 *
 * @param {SafariExtensionMessageEvent} event The name of the event
 *
 * @return void
 */
function handleMessage(event)
{
    switch (event.name) {
        case "setCookie" :
            setCookie(event.message);
            break;

        case "isEnabled" :
            var data = event.message;
            setCookie(data);
            break;
    }
}

// Register the handlers with the application
safari.self.addEventListener("message", handleMessage, false);

// Check if toggle is on
safari.self.tab.dispatchMessage("isEnabled", 1);
