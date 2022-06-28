import { TestReporter } from "./TestReporter";
import "../css/testframework.css";

const { jasmine } = window;
const jasmineEnv = jasmine.getEnv();

const testPanel = document.createElement("div");
testPanel.setAttribute("id", "test-panel");
document.body.appendChild(testPanel);

const reporter = new TestReporter();
reporter.setReportNode(testPanel);
jasmineEnv.updateInterval = 250;
jasmineEnv.randomizeTests(false);
jasmineEnv.addReporter(reporter);

window.describe = jasmineEnv.describe;
window.it = jasmineEnv.it;
window.beforeAll = jasmineEnv.beforeAll;
window.expect = jasmineEnv.expect;
window.jasmineEnv = jasmineEnv;

export function initiateTest() {
  require("../tests/test001.js");
  require("../tests/test002.js");
  require("../tests/test003.js");
  require("../tests/test004.js");
  require("../tests/test005.js");
  require("../tests/test006.js");
  require("../tests/test007.js");
  require("../tests/test008.js");
  require("../tests/test009.js");

  jasmineEnv.execute();
}
