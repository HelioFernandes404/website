const locales = ["pt", "en"];

function fail(message) {
  throw new Error(`Invalid blog scenario: ${message}`);
}

export function validateScenario(scenario) {
  if (!scenario || typeof scenario.id !== "string" || scenario.id.length === 0) {
    fail("scenario needs a stable id");
  }
  if (!Array.isArray(scenario.nodes) || scenario.nodes.length === 0) fail("scenario needs nodes");
  if (!Array.isArray(scenario.edges)) fail("scenario needs edges");
  if (!Array.isArray(scenario.steps) || scenario.steps.length === 0) fail("scenario needs steps");

  const nodeIds = new Set();
  for (const node of scenario.nodes) {
    if (!node?.id || nodeIds.has(node.id)) fail(`duplicate or missing node id: ${node?.id ?? "unknown"}`);
    nodeIds.add(node.id);
  }
  const edgeIds = new Set();
  for (const edge of scenario.edges) {
    if (!edge?.id || edgeIds.has(edge.id)) fail(`duplicate or missing edge id: ${edge?.id ?? "unknown"}`);
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) fail(`edge ${edge.id} references an unknown node`);
  }
  const stepIds = new Set();
  for (const step of scenario.steps) {
    if (!step?.id || stepIds.has(step.id)) fail(`duplicate or missing step id: ${step?.id ?? "unknown"}`);
    stepIds.add(step.id);
  }
  for (const locale of locales) {
    const copy = scenario.copy?.[locale];
    if (!copy?.title || !copy?.summary || !Array.isArray(copy.steps)) {
      fail(`missing ${locale} scenario copy`);
    }
    if (copy.steps.length !== scenario.steps.length) fail(`${locale} step copy count differs`);
    for (const [index, step] of copy.steps.entries()) {
      if (!step?.title || !step?.body) fail(`missing ${locale} copy for step ${index + 1}`);
    }
    for (const node of scenario.nodes) {
      if (!copy.nodes?.[node.id]?.label) fail(`missing ${locale} node copy for ${node.id}`);
    }
  }
  return scenario;
}
