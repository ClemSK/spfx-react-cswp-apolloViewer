import * as React from 'react';
import styles from './ApolloViewerReact.module.scss';
import { IApolloViewerReactProps, IApolloViewerReactState } from '../';
import { ApolloMissionList } from '../ApolloMissionList/ApolloMissionList';
import { escape } from '@microsoft/sp-lodash-subset';
import { IMission } from '../../../../IMission';
import { MissionService } from '../../../../services';
import { IApolloMissionProps } from '../ApolloMission';

// the class is extending the react component where the properties and state are being passed in
export class ApolloViewerReact extends React.Component<
  IApolloViewerReactProps,
  IApolloViewerReactState
> {
  // where we are removing the mission
  // we are defining which missions to keep rather than which to delete
  //   does the mission that we have selected not equal a mission in the list
  //   look at immutable libraries
  private _removeMission = (missionToRemove: IMission): void => {
    const newMissions: IMission[] = this.state.missions.filter(
      (mission) => mission !== missionToRemove
    );
    this.setState({ missions: newMissions });
  };
  //   initialising the state for what the default values should be inside of a constructor
  // constructor has the properties passed in
  constructor(props: IApolloViewerReactProps) {
    //   passing the props back to the base component
    super(props);

    // init the state of hte missions - empty
    this.state = {
      missions: [],
    };
  }
  //   mounting is like loading / unloading to the page / DOM tree
  public componentDidMount(): void {
    //   here we define the state for the application
    this.setState({
      missions: MissionService.getMissions(),
    });
  }

  public render(): React.ReactElement<IApolloViewerReactProps> {
    const { description, environmentMessage, userDisplayName } = this.props;
    // rendering method
    return (
      <section className={`${styles.apolloViewerReact}`}>
        <div className={styles.welcome}>
          <span>Welcome to the React Apollo Missions Web Part!</span>
          {/* removing the hard coded mission and replacing it with the list component rendering all missions */}
          <ApolloMissionList
            //   setting the state for the missions
            missions={this.state.missions}
            onDeleteMission={this._removeMission}
          />
        </div>
      </section>
    );
  }
}
