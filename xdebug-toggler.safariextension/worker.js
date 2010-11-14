/**
 * Set the cookie value according to the minutes passed in
 *
 * @param {Int} minutes The number of minutes to persist the cookie
 *
 * @return void
 */
function setCookie(minutes)
{
    var expiry=new Date();
    expiry.setTime(expiry.getTime() + (minutes*60*1000));
    document.cookie="XDEBUG_SESSION=1; expires="+expiry.toUTCString()+"; path=/";
}

/**
 * Message handle, decide which functions to call depending on
 * the message that has been sent
 *
 * @param {String} event The name of the event
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
            if (event.message == 1) {
                setCookie(60*24);
            } else {
                setCookie(-1);
            }
            break;
    }
}

// Register the handlers with the application
safari.self.addEventListener("message", handleMessage, false);

// Check if toggle is on
safari.self.tab.dispatchMessage("isEnabled", 1);
