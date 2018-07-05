const expect = require("expect");
const React = require("react");
import App from "../../public/Components/App.jsx";
import Enzyme from "enzyme";
import Jest from "jest";
import shallow from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("React", () => {
  describe("<App />", () => {
    let wrapper;
    let user;

    before(() => {
      wrapper = Enzyme.shallow(<App />);
      
    });
    
    it('Renders a <div> with id "app-container"', () => {
      expect(wrapper.type()).toEqual("div");
      expect(wrapper.props().id).toEqual("app-container");
    });

    it('Should handle click on login button', () => {
      let window = wrapper.find('Login').simulate('click', { preventDefault() {} });
      expect(window.alert).toHaveBeenCalledWith('clicked');
    });
  });
});
