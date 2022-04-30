import * as React from 'react';
import styles from '../ApolloViewerReact/ApolloViewerReact.module.scss';
import { IApolloMissionProps } from './IApolloMissionProps';

// This component is to render each Apollo mission
// the empty object is a placeholder for state in this component
export class ApolloMission extends React.Component<IApolloMissionProps, {}> {
  private _handleOnRemoveClick = (
    //   listening for a mouse event, clicking on an anchor tag
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();

    this.props.onRemoveMission(this.props.mission);
  };
  //   here we are passing the properties to the render method
  public render(): React.ReactElement<IApolloMissionProps> {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td className="ms-textAlignRight">
                <strong>ID:</strong>
              </td>
              {/* passing dynamic properties */}
              <td>{this.props.mission.id}</td>
            </tr>
            <tr>
              <td className="ms-textAlignRight">
                <strong>Name:</strong>
              </td>
              <td>{this.props.mission.name}</td>
            </tr>
            <tr>
              <td className="ms-textAlignRight">
                <strong>Date:</strong>
              </td>
              <td>
                {this.props.mission.launch_date} - {this.props.mission.end_date}
              </td>
            </tr>
            <tr>
              <td className="ms-textAlignRight">
                <strong>Summary:</strong>
              </td>
              <td>{this.props.mission.summary}</td>
            </tr>
          </tbody>
        </table>
        <button>
          <a href={this.props.mission.wiki_href} className={styles.links}>
            Learn More
          </a>
        </button>
        <button>
          <a
            href="#"
            className={styles.links}
            onClick={this._handleOnRemoveClick}
          >
            Remove Mission
          </a>
        </button>
      </div>
    );
  }
}
