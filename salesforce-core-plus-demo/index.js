/* eslint-disable no-undef */
const APP_NAME = "SF/Glue42 Core+ Test App";


// Entry point. Initializes Glue42 Web. А Glue42 Web instance will be attached to the global window.
window
  .startApp({ appName: APP_NAME })
  .then(attachClickHandlerCRM)
  .catch(console.error);
