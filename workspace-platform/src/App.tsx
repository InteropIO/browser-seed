import React from "react";
import Workspaces, { getFrameId } from "@glue42/workspaces-ui-react";
import "@glue42/workspaces-ui-react/dist/styles/popups.css";
import "@glue42/workspaces-ui-react/dist/styles/goldenlayout-base.css";
import "@glue42/workspaces-ui-react/dist/styles/glue42-theme.css";
import "@glue42/workspaces-ui-react/dist/styles/workspaceTabV2.css";
import "./index.css";
import { Glue42Web } from "@glue42/web";
import { Glue42 } from "@glue42/desktop";
import { Glue42Workspaces } from "@glue42/workspaces-api";
import { useGlue } from "@glue42/react-hooks";

const App = () => {
    const waitForMyFrame = (glue: Glue42Web.API | Glue42.Glue) => {
        return new Promise<Glue42Workspaces.Frame>(async (res, rej) => {
            const unsub = await glue.workspaces?.onFrameOpened((f) => {
                if (f.id === getFrameId()) {
                    res(f);
                    if (unsub) {
                        unsub();
                    }
                }
            });
            const frames = await glue.workspaces?.getAllFrames();
            const myFrame = frames?.find(f => f.id === getFrameId());

            if (myFrame) {
                res(myFrame);
                if (unsub) {
                    unsub();
                }
            }
        });
    };

    useGlue(async (glue) => {

        const isPlatform = (window as any).glue42core?.isPlatformFrame;

        if (!isPlatform) {
            // if this frame is not a platform, we do not wish to load the welcome workspace
            // instead we wish to load the workspace provided to the restore function
            return;
        }

        const myFrame = await waitForMyFrame(glue);
        const wsp = (await myFrame.workspaces())[0];
        const newWsp = await glue.workspaces?.restoreWorkspace("Welcome", { title: "Welcome", reuseWorkspaceId: wsp.id });
        await newWsp?.setTitle("Welcome");
    });

    return (
        <Workspaces />
    );
}

export default App;
