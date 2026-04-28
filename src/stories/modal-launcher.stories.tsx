import * as React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { FakeApp } from "./fake-app";
import { ModalLauncher } from "../containers/modal-launcher";
import { showModalUrl, showModalComponent } from "../actions/modal";
import { registerComponentFactory } from "../api/registry/component";
import { useReduxDispatch } from "../components/map-providers/context";
import { MapGuideMockMode } from "../components/mapguide-debug-context";
import { useElementContext } from "../components/elements/element-context";

import "../styles/index.css";

// Register a simple component for use in the component-modal story
registerComponentFactory("story:hello-world", () => (
   <div style={{ padding: 16 }}>
      <h3>Hello from a registered component!</h3>
      <p>This component was placed inside a modal dialog via <code>showModalComponent</code>.</p>
   </div>
));

interface IModalLauncherStoryContentProps {
   buttonText?: string;
   buttonVariant?: "primary" | "warning";
   description: React.ReactNode;
   onOpen?: () => void;
}

const ModalLauncherStoryContent: React.FC<IModalLauncherStoryContentProps> = ({
   buttonText,
   buttonVariant = "primary",
   description,
   onOpen,
}) => {
   const { Button } = useElementContext();

   return (
      <div style={{ padding: 16 }}>
         {description}
         {onOpen && buttonText && (
            <Button variant={buttonVariant} onClick={onOpen}>{buttonText}</Button>
         )}
         <ModalLauncher />
      </div>
   );
};

const UrlModalStoryContent: React.FC = () => {
   const dispatch = useReduxDispatch();

   const openModal = () => {
      dispatch(showModalUrl({
         name: "story-url-modal",
         modal: {
            title: "External URL",
            backdrop: false,
            size: [500, 400],
         },
         url: "https://www.example.com",
      }));
   };

   return <ModalLauncherStoryContent
      description={<p>Click the button to open a URL modal dialog (an iframe-based dialog).</p>}
      buttonText="Open URL Modal"
      onOpen={openModal}
   />;
};

const ComponentModalStoryContent: React.FC = () => {
   const dispatch = useReduxDispatch();

   const openModal = () => {
      dispatch(showModalComponent({
         name: "story-component-modal",
         modal: {
            title: "Component Dialog",
            backdrop: false,
            size: [400, 300],
         },
         component: "story:hello-world",
      }));
   };

   return <ModalLauncherStoryContent
      description={<p>Click the button to open a component modal dialog.</p>}
      buttonText="Open Component Modal"
      onOpen={openModal}
   />;
};

const UnregisteredComponentModalStoryContent: React.FC = () => {
   const dispatch = useReduxDispatch();

   const openModal = () => {
      dispatch(showModalComponent({
         name: "story-unknown-modal",
         modal: {
            title: "Unknown Component",
            backdrop: false,
            size: [400, 260],
         },
         component: "story:not-registered",
      }));
   };

   return <ModalLauncherStoryContent
      description={<>
         <p>Click the button to open a modal that references a component not in the registry.</p>
         <p>The ModalLauncher will display an error message inside the dialog.</p>
      </>}
      buttonText="Open Unregistered Component Modal"
      buttonVariant="warning"
      onOpen={openModal}
   />;
};

export default {
   title: "Viewer Containers / Modal Launcher",
   decorators: [
      withKnobs,
      (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined) => (
         <FakeApp mgMockMode={MapGuideMockMode.DoNotRender}>
            {storyFn()}
         </FakeApp>
      ),
   ],
};

/**
 * Shows the ModalLauncher when no modals are open.
 * The component renders nothing visible in this state.
 */
export const NoOpenModals = {
   render: () => {
      return (
         <ModalLauncherStoryContent
            description={<p>No modals are currently open. The ModalLauncher renders nothing in this state.</p>}
         />
      );
   },
   name: "No Open Modals",
};

/**
 * Opens a URL modal dialog that displays a URL inside an iframe.
 * Click "Open URL Modal" to dispatch the action and show the dialog.
 */
export const UrlModal = {
   render: () => <UrlModalStoryContent />,
   name: "URL Modal",
};

/**
 * Opens a component modal dialog that displays a registered React component.
 * Click "Open Component Modal" to dispatch the action and show the dialog.
 */
export const ComponentModal = {
   render: () => <ComponentModalStoryContent />,
   name: "Component Modal",
};

/**
 * Opens a modal dialog for an unregistered component, which triggers the error state.
 * Click "Open Unregistered Component Modal" to dispatch the action and see the error.
 */
export const UnregisteredComponentModal = {
   render: () => <UnregisteredComponentModalStoryContent />,
   name: "Unregistered Component Modal (Error State)",
};
