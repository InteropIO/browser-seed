/* eslint-disable no-undef */
(function(window) {
  const startApp = async options => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }

    if (options && options.appName) {
      window.setDocumentTitle(options.appName);
      window.displayAppName(options.appName);
    }

    try {

      if (window.Tick42CRM) {
        const glueConfig = {
          layouts: false,
          activities: false,
          appManager: false,
          windows: false,
          provider: true,
          side: "helper",
          agm: true,
          isWorkspaceFrame:true,
          authentication: {
            username: 'test',
            password: "a"
          },
          application: options.appName + Date.now() + "_" + Math.random()
        };
  
        const crmGlue = await window.Tick42CRM(glueConfig);
        window.CRM = crmGlue.CRM;
        window.glue = crmGlue.glue;
      } else {
        const glue = await window.GlueWeb();
        window.glue = glue;
      }
      window.toggleGlueAvailable();

      console.log(`Glue42 Web version ${glue.info.version} initialized.`);
      return glue;

    } catch (error) {
      console.error("Failed to initialize Glue42 Web. Error: ", error);
      throw error;
    }

  };

  window.startApp = startApp;
})(window || {});
