import * as React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs';
import { FakeApp } from './fake-app';
import TaskPaneContainer from '../containers/task-pane';


storiesOf("Task Pane", module)
    .addDecorator(withKnobs)
    .add("Task Pane", () => {
        return <FakeApp>
            <TaskPaneContainer />
        </FakeApp>;
    });