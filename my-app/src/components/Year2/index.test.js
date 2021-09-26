import FullYear from "./index";
import { mount } from "enzyme";
import CircularProgress from "../Spinner/index";
import Root from "../Root";

let wrapped;
describe("UI Display", () => {
  beforeEach(() => {
    wrapped = mount(
      <Root>
        <FullYear />
      </Root>
    );
    // wrapped.update();
  });

  afterEach(() => {
    wrapped.unmount();
  });

  it("has a div with container id when mounting", () => {
    expect(wrapped.find("#container").length).toEqual(1);
  });

  it("has a circular progress when mounting", () => {
    expect(wrapped.find(CircularProgress).length).toEqual(1);
  });
});