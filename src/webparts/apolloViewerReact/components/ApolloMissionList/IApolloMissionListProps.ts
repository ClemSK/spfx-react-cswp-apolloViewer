import { IMission, MissionOperationCallback } from '../../../../models';

export interface IApolloMissionListProps {
  missions?: IMission[];
  //   adding the mission callback to lift the state
  onDeleteMission?: MissionOperationCallback;
}
