import assert from "node:assert/strict";
import { describe, it } from "node:test";

const loadScenarios = () => import("../src/data/blog-scenarios/index.js");

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
    badReference.edges[0].target = "does-not-exist";
    assert.throws(() => validateScenario(badReference), /unknown node/);
  });
});
