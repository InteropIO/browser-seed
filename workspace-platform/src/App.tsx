import React from "react";
import Workspaces, { getFrameId } from "@interopio/workspaces-ui-react";
import "@interopio/workspaces-ui-react/dist/styles/popups.css";
import "@interopio/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@interopio/workspaces-ui-react/dist/styles/glue42-theme.css";
import "@interopio/workspaces-ui-react/dist/styles/workspaceTabV2.css";
import "./index.css";
import { IOConnectBrowser } from "@interopio/browser";
import { IOConnectDesktop } from "@interopio/desktop";
import { IOConnectWorkspaces } from "@interopio/workspaces-api";
import { useIOConnect } from "@interopio/react-hooks";

const App = () => {
    const waitForMyFrame = (io: IOConnectBrowser.API | IOConnectDesktop.API) => {
        return new Promise<IOConnectWorkspaces.Frame>(async (res, rej) => {
            const unsub = await io.workspaces?.onFrameOpened((f) => {
                if (f.id === getFrameId()) {
                    res(f);
                    if (unsub) {
                        unsub();
                    }
                }
            });
            const frames = await io.workspaces?.getAllFrames();
            const myFrame = frames?.find(f => f.id === getFrameId());

            if (myFrame) {
                res(myFrame);
                if (unsub) {
                    unsub();
                }
            }
        });
    };

    useIOConnect(async (io) => {

        const isPlatform = (window as any).iobrowser?.isPlatformFrame;

        if (!isPlatform) {
            // if this frame is not a platform, we do not wish to load the welcome workspace
            // instead we wish to load the workspace provided to the restore function
            return;
        }

        const myFrame = await waitForMyFrame(io);
        const wsp = (await myFrame.workspaces())[0];
        const newWsp = await io.workspaces?.restoreWorkspace("Welcome", { title: "Welcome", reuseWorkspaceId: wsp.id });
        await newWsp?.setTitle("Welcome");
    });

    return (
        <Workspaces />
    );
}

export default App;
