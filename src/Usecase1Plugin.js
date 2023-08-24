import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import JPlugin from './components/CustomTaskList/JPlugin';

const PLUGIN_NAME = 'JiraPlugin';

export default class JiraPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    flex.AgentDesktopView.Panel2.Content.replace(<JPlugin key="JiraPlugin-component2" />, options);
  }
}
