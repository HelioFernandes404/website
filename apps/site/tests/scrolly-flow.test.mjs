import assert from "node:assert/strict";
import { describe, it } from "node:test";

const loadState = () => import("../src/utils/scrolly-flow.js");
const loadScenarios = () => import("../src/data/blog-scenarios/index.js");

describe("scrolly flow state", () => {
  it("selects most visible narrative step", async () => {
    const { selectActiveStep } = await loadState();
    const entry = (step, ratio, isIntersecting = true) => ({
      isIntersecting, intersectionRatio: ratio, target: { dataset: { scrollyStep: String(step) } },
    });
    assert.equal(selectActiveStep([entry(0, 0.3), entry(1, 0.8)], 0), 1);
    assert.equal(selectActiveStep([entry(0, 0, false)], 2), 2);
  });

  it("clamps steps and only enables explore at end", async () => {
    const { normalizeStepIndex, canExplore } = await loadState();
    assert.equal(normalizeStepIndex(8, 3), 2);
    assert.equal(normalizeStepIndex(-1, 3), 0);
    assert.equal(canExplore(1, 3), false);
    assert.equal(canExplore(2, 3), true);
  });
});

describe("blog scenarios", () => {
  it("ships validated centralized and federated RBAC topology with PT and EN copy", async () => {
    const { rbacCentralizedScenario, rbacFederatedScenario, validateScenario } = await loadScenarios();
    for (const scenario of [rbacCentralizedScenario, rbacFederatedScenario]) {
      assert.equal(validateScenario(scenario), scenario);
      assert.equal(scenario.copy.pt.steps.length, scenario.steps.length);
      assert.equal(scenario.copy.en.steps.length, scenario.steps.length);
    }
  });

  it("rejects missing translations and unknown graph references", async () => {
    const { rbacCentralizedScenario, validateScenario } = await loadScenarios();
    const missingEnglish = structuredClone(rbacCentralizedScenario);
    delete missingEnglish.copy.en.nodes.core;
    assert.throws(() => validateScenario(missingEnglish), /missing en node copy/);

    const badReference = structuredClone(rbacCentralizedScenario);
    badReference.steps[0].activeNodes.push("does-not-exist");
    assert.throws(() => validateScenario(badReference), /unknown id/);
  });
});
