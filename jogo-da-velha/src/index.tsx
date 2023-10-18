import React, {ReactElement} from "react";
import {  AppBootstrap } from './components';
import Navigator from "./configs/navigator";
import  {SettingsProvider } from "./contexts/settings-context";
import { Amplify, Auth } from 'aws-amplify'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)


export default function App(): ReactElement {
  return (
    <AppBootstrap>
      <SettingsProvider>
        <Navigator/>
      </SettingsProvider>
    </AppBootstrap>
  );
}

