/* eslint-disable no-undef */
(function(window) {
  const toggleGlueAvailable = () => {
    document.getElementById("glueImg").src = "/assets/connected.svg";
    document.getElementById("glueSpan").textContent = "Connected";
  };

  const logger = (function logger() {
    function log(type, options) {
      const message = typeof options === "string" ? options : options.message;
      const logTime =
        options != null && options.logTime === false ? false : true;

      const item = document.createElement("li");
      const itemDot = document.createElement("span");
      const div = document.createElement("div");

      div.classList = "align-items-center d-flex flex-grow-1";
      itemDot.style.width = "10px";
      itemDot.style.height = "10px";
      itemDot.style.minWidth = "10px";
      itemDot.style.minHeight = "10px";
      itemDot.classList = "bg-success d-inline-block mr-2 rounded-circle";
      itemDot.classList.add(`bg-${type}`);

      div.append(itemDot);
      div.append(message);

      item.classList =
        "d-flex justify-content-between align-items-center border-top py-1";

      item.append(div);

      if (logTime) {
        const timeSpan = document.createElement("span");
        timeSpan.textContent = `${formatTime(new Date())} `;
        timeSpan.classList = "badge badge-pill";
        item.append(timeSpan);
      }

      document.getElementById("logs-list").prepend(item);
    }

    return {
      info(options) {
        log("", options);
      },
      error(options) {
        log("danger", options);
      },
      clear() {
        const element = document.getElementById("logs-list");
        if (element) {
          element.innerHTML = "";
        }
      }
    };
  })();

  const setDocumentTitle = title => {
    document.title = title;
  };

  const displayAppName = text => {
    const el = document.getElementById("appNameHeading");
    if (el) {
      el.textContent = text;
    }
  };

  const formatTime = date => {
    if (date instanceof Date) {
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
    } else {
      return "";
    }
  };

  /*
    elementId - Default value "clearLogsBtn".
   */
  const clearLogsHandler = elementId => {
    elementId = typeof elementId === "string" ? elementId : "clearLogsBtn";
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener("click", logger.clear);
    }
  };

  // const renderApplications = async (
  //   applications,
  //   instances,
  //   onStartClicked,
  //   onStopClicked
  // ) => {
  //   const appListElement = document.getElementById("appList");
  //   appListElement.innerHTML = "";

  //   applications.forEach(application => {
  //     const appRowElement = document.createElement("div");
  //     appRowElement.classList = "row mt-2";

  //     const appNameElement = document.createElement("div");
  //     appNameElement.classList = "align-self-center pl-3 w-25";
  //     appNameElement.textContent = application.name;

  //     const startButtonWrapperElement = document.createElement("div");
  //     startButtonWrapperElement.classList = "d-flex pl-sm-2";

  //     const startButtonElement = document.createElement("button");
  //     startButtonElement.classList =
  //       "btn btn-primary btn-sm border border-dark text-nowrap w-40";
  //     startButtonElement.textContent = "Start";
  //     startButtonElement.onclick = () => onStartClicked(application.name);
  //     startButtonWrapperElement.appendChild(startButtonElement);

  //     appRowElement.appendChild(appNameElement);
  //     appRowElement.appendChild(startButtonWrapperElement);

  //     appListElement.appendChild(appRowElement);

  //     const instanceRowElement = document.createElement("div");
  //     instanceRowElement.classList = "d-flex flex-column row mt-2";
  //     const instanceElement = document.createElement("div");
  //     instanceElement.classList = "pl-4 w-25";
  //     instanceElement.textContent = "Instances:";

  //     instanceRowElement.appendChild(instanceElement);

  //     const instancesListElement = document.createElement("div");
  //     instancesListElement.classList = "d-flex flex-column";
  //     const instancesOfApplication = instances.filter(instance => {
  //       return instance.application.name === application.name;
  //     });

  //     instancesOfApplication.forEach(instace => {
  //       const rowElement = document.createElement("div");
  //       rowElement.classList = "row pl-5";

  //       const instanceIdElement = document.createElement("div");
  //       instanceIdElement.classList = "align-self-center pl-3 w-50";
  //       instanceIdElement.textContent = instace.id;

  //       const stopButtonWrapperElement = document.createElement("div");
  //       stopButtonWrapperElement.classList = "align-self-center d-flex pl-sm-2";

  //       const stopButtonElement = document.createElement("button");
  //       stopButtonElement.classList =
  //         "btn btn-primary btn-sm border border-dark text-nowrap w-40";
  //       stopButtonElement.textContent = "Stop";
  //       stopButtonElement.onclick = () => onStopClicked(instace.id);
  //       stopButtonWrapperElement.appendChild(stopButtonElement);

  //       rowElement.appendChild(instanceIdElement);
  //       rowElement.appendChild(stopButtonWrapperElement);

  //       instanceRowElement.appendChild(rowElement);
  //     });

  //     appListElement.appendChild(instanceRowElement);
  //   });
  // };
  const CRMclickHandler = (event, elementId)=>{
    const cache = {
      cmd: window.document.getElementById('command'),
      systemName: window.document.getElementById('systemName'),
      nativeId: window.document.getElementById('nativeID'),
      nativeIDsb: window.document.getElementById('nativeIDsb'),
      manualKey: window.document.getElementById('manualKey'),
    };
    const cmd = cache.cmd.value;
    const state = {
        nativeId: cache.manualKey.value || (
          elementId === "triggerCRMinSB"?
          cache.nativeIDsb.value:
          cache.nativeId.value
        ),
        systemName:cache.systemName.value
    }
    logger.info(`GlueCore: triggering SF action ${cmd} with id ${state.nativeId}`);
    if (!window.CRM) {
      logger.error("GlueCRM: not ready");
      debugger;
      return;
    }
    const obj = {'ids':[state]};

    window.CRM[cmd](obj, "skipMine").catch(console.error);

  }

  const attachClickHandlerCRM = () => {
    ["triggerCRM", "triggerCRMinSB"].forEach((elementId)=>{
      const element = document.getElementById(elementId);
      if (element) {
        element.addEventListener("click", (event)=>{
          CRMclickHandler(event, elementId);
        });
      }
    });
  };
  
  
  window.logger = logger;
  window.toggleGlueAvailable = toggleGlueAvailable;
  window.setDocumentTitle = setDocumentTitle;
  window.displayAppName = displayAppName;
  window.formatTime = formatTime;
  window.clearLogsHandler = clearLogsHandler;
  // window.renderApplications = renderApplications;
  window.attachClickHandlerCRM = attachClickHandlerCRM;

})(window || {});
