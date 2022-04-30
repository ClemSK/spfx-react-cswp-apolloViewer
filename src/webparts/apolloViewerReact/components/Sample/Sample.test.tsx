import * as React from 'react';
import 'jest';
import 'ts-jest';
// import { createRenderer } from 'react-test-renderer/shallow';
import { Sample, ISampleProps } from './Sample';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

test('should render Sample component correctly', () => {
  // const renderer = createRenderer();
  // renderer.render(<Sample />);
  // console.log(renderer.getRenderOutput());
  // expect(renderer.getRenderOutput()).toMatchSnapshot();

  const wrapper = shallow(<Sample />);
  expect(wrapper.find('span').text()).toBe('Hello Mundo:');
  expect(wrapper.find('li').length).toBe(3);
  expect(toJson(wrapper)).toMatchSnapshot();
});
