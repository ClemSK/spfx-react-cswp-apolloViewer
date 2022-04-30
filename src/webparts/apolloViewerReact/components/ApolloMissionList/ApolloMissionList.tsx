import * as React from 'react';

import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { List } from 'office-ui-fabric-react/lib/List';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import styles from '../ApolloViewerReact/ApolloViewerReact.module.scss';

import { IMission } from '../../../../models';
import { ApolloMission } from '../';
import { IApolloMissionListProps, IApolloMissionListState } from '.';
import { IApolloMissionProps } from '../ApolloMission/IApolloMissionProps';

export class ApolloMissionList extends React.Component<
  IApolloMissionListProps,
  IApolloMissionListState
> {
  constructor(props: IApolloMissionListProps) {
    super(props);

    this.state = {
      filteredMissions: [],
      showAllMissions: false,
    };
  }

  public componentWillReceiveProps(newProps: IApolloMissionListProps): void {
    let newFilteredList: IMission[] = [];

    this.state.filteredMissions.forEach((filteredMission: IMission) => {
      // checking if filtered mission has been found
      if (newProps.missions.indexOf(filteredMission) >= 0) {
        newFilteredList.push(filteredMission);
      }
      this.setState({ filteredMissions: newFilteredList });
    });
  }

  public render(): React.ReactElement<IApolloMissionProps> {
    return (
      <div>
        <Toggle
          label="Show all or filtered missions?"
          onText="showing all missions"
          offText="showing selected missions"
          checked={this.state.showAllMissions}
          onChanged={this.onPickerToggleChanged}
        />

        <TagPicker
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Apollo missions...',
            noResultsFoundText: 'No matching Apollo mission found',
          }}
          onChange={this._onSelectedItemsChanged}
          onResolveSuggestions={this._onFilterChanged}
        />
        <List items={this._missionsToShow} onRenderCell={this._onRenderCell} />
      </div>
    );
  }

  private _onSelectedItemsChanged = (items: any[]): void => {
    const filteredMissions: any[] = items.map((item) => item.mission);

    this.setState((prevState: IApolloMissionListState) => {
      const newState: IApolloMissionListState = {
        showAllMissions: prevState.showAllMissions,
        filteredMissions: filteredMissions,
      };
      return newState;
    });
  };

  private get _missionsToShow(): IMission[] {
    return this.state.showAllMissions
      ? this.props.missions
      : this.state.filteredMissions;
  }

  private onPickerToggleChanged = (checked: boolean): void => {
    this.setState({ showAllMissions: checked });
  };

  private _onFilterChanged = (
    filterText: string,
    tagList: { key: string; name: string }[]
  ): { key: string; name: string; mission: IMission }[] => {
    const filteredMissions: IMission[] = this.props.missions.filter(
      (mission) => {
        if (
          mission.id.toLowerCase().indexOf(filterText.toLowerCase()) === 0 ||
          mission.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0
        )
          return mission;
      }
    );
    //   looping through the missions
    return filteredMissions.map((m) => ({
      key: this._getMissionUniqueId(m),
      name: `(${m.id}) ${m.name}`,
      mission: m,
    }));
  };

  private _onRenderCell = (
    mission: IMission,
    index: number | undefined
  ): JSX.Element => {
    return (
      <ApolloMission
        //   passing in the key to have unique ids for each list item to resolve an error
        key={this._getMissionUniqueId(mission)}
        mission={mission}
        onRemoveMission={this.props.onDeleteMission}
      />
    );
  };

  //   creating a unique ID
  private _getMissionUniqueId(mission: IMission): string {
    return `${mission.id} | ${mission.name}`.toLowerCase();
  }
}
