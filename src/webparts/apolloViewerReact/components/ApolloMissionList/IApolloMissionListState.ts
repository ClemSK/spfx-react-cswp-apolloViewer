import { IMission } from '../../../../models';

export interface IApolloMissionListState {
  filteredMissions?: IMission[];
  showAllMissions: boolean;
}
