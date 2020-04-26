import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import HelloTeams from './components/HelloTeams';
import { IHelloTeamsProps } from './components/IHelloTeamsProps';

export interface IHelloTeamsWebPartProps {
  
}

export default class HelloTeamsWebPart extends BaseClientSideWebPart <IHelloTeamsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IHelloTeamsProps> = React.createElement(
      HelloTeams,
      {
        context: this.context,
        teamsTheme: this.context.sdks.microsoftTeams.context.theme
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
