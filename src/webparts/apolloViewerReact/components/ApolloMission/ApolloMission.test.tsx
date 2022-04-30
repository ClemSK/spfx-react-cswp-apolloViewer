import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { IMission } from '../../../../models';
import { ApolloMission } from './';

let _mission: IMission = undefined;
let _onRemoveMissionCallback: jest.Mock;

beforeAll(() => {
  _mission = {
    id: 'AS-510',
    name: 'Apollo 15',
    launch_date: '07/26/1971',
    end_date: '08/07/1971',
    image: 'apollo-15.png',
    wiki_href: 'https://en.wikipedia.org/wiki/Apollo_15',
    summary:
      'First Extended LM and rover, landed in Hadley-Apennine. Surface EVA time:18:33 hr. Samples returned: 169.10 pounds (76.70 kg).',
    crew: [
      {
        role: 'Commander',
        astronaut_id: '26',
      },
      {
        role: 'Pilot',
        astronaut_id: '17',
      },
      {
        role: 'Sr Pilot',
        astronaut_id: '31',
      },
      {
        role: 'Command Module Pilot',
        astronaut_id: '31',
      },
      {
        role: 'Lunar Module Pilot',
        astronaut_id: '17',
      },
    ],
  };
});

beforeEach(() => {
  // create callback for clicking remove button
  _onRemoveMissionCallback = jest.fn();
});

test('should render mission', () => {
  const wrapper = shallow(
    <ApolloMission
      mission={_mission}
      onRemoveMission={_onRemoveMissionCallback}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

test('raise onRemoveMission event when remove button clicked', () => {
  // create component
  const wrapper = shallow(
    <ApolloMission
      mission={_mission}
      onRemoveMission={_onRemoveMissionCallback}
    />
  );

  // get all anchor tags which are actually butotns
  const buttons = wrapper.find('a');
  expect(buttons.length).toBe(2);

  const removeButton: ShallowWrapper = buttons.at(1);
  removeButton.simulate('click', { preventDefault: () => undefined });

  expect(_onRemoveMissionCallback).toHaveBeenCalled();
  expect(_onRemoveMissionCallback).toHaveBeenCalledTimes(1);
  expect(_onRemoveMissionCallback).toHaveBeenCalledWith(_mission);
});
