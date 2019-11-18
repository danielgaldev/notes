import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import App from '../App';

let mounted;

beforeEach(() => {
  moxios.install();
  moxios.stubRequest('/api/v1/items/', { status: 200, response: [{ id: 1, text: 'asd' }] });
  mounted = mount(<App />);
});

it('renders and fetches without crashing', done => {
  moxios.wait(() => {
    mounted.update();
    expect(mounted.find('li')).toHaveLength(1);
    done();
  });
});

afterEach(() => {
  mounted.unmount();
  moxios.uninstall();
});
