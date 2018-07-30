import React from "react";
import { shallow } from "enzyme";

import Navbar from "./Navbar";

describe("shallow Navbar", () => {
	it("renders", () => {
		let wrapper = shallow(<Navbar />);
		expect(wrapper).toMatchSnapshot();
	});
});
