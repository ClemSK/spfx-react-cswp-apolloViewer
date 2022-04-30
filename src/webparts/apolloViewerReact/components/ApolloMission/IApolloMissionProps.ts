import { IMission, MissionOperationCallback } from '../../../../models';

// Here are the properties that will be on each mission

export interface IApolloMissionProps {
  mission: IMission;
  onRemoveMission: MissionOperationCallback;
}
