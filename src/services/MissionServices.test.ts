import 'ts-jest';
import { MissionService } from './';

describe('Mission Service', () => {
  describe('getMissions', () => {
    test('returns multiple missions', () => {
      const missions = MissionService.getMissions();

      expect(missions.length).toBeGreaterThan(1);
    });
  });

  describe('getMission', () => {
    test(' get one mission', () => {
      const mission = MissionService.getMission('AS-201');
      expect(mission).toBeDefined();
    });
    test(' get a specific mission', () => {
      const mission = MissionService.getMission('AS-501');
      expect(mission).toBeDefined();
      expect(mission.name).toBe('Apollo 4');
    });
    test(' no valid mission', () => {
      const mission = MissionService.getMission('AS-XXX');
      expect(mission).toBeUndefined();
    });
  });
});
