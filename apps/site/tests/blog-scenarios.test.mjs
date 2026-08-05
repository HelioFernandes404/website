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

  it("ships validated healthy, degraded, and fixed Alertmanager topology sharing the same nodes", async () => {
    const { amHealthyScenario, amDegradedScenario, amFixedScenario, validateScenario } = await loadScenarios();
    const scenarios = [amHealthyScenario, amDegradedScenario, amFixedScenario];
    const nodeIds = amHealthyScenario.nodes.map((node) => node.id).sort();

    for (const scenario of scenarios) {
      assert.equal(validateScenario(scenario), scenario);
      assert.equal(scenario.copy.pt.steps.length, scenario.steps.length);
      assert.equal(scenario.copy.en.steps.length, scenario.steps.length);
      assert.deepEqual(scenario.nodes.map((node) => node.id).sort(), nodeIds);
    }

    const gossipEdge = (scenario) => scenario.edges.find((edge) => edge.id === "gossip");
    assert.equal(gossipEdge(amHealthyScenario).tone, "ok");
    assert.equal(gossipEdge(amDegradedScenario).tone, "danger");
    assert.equal(gossipEdge(amFixedScenario).tone, "ok");

    const duplicateNotify = (scenario) => scenario.edges.filter((edge) => edge.id.endsWith("-slack") && edge.active).length;
    assert.equal(duplicateNotify(amHealthyScenario), 1);
    assert.equal(duplicateNotify(amDegradedScenario), 2);
    assert.equal(duplicateNotify(amFixedScenario), 1);
  });
});
