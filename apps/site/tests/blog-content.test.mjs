import { access, readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.resolve(__dirname, "../src/content/blog");
const expectedSlugs = [
  "alert-dedup-glpi-servicenow-redis",
  "gitops-argocd-helm-client-onboarding",
  "k3s-multi-tenant-migration-checklist",
  "llm-rag-observability-metrics",
  "microservices-node-python-reliability-patterns",
  "mlflow-tracking-deploy-latency",
  "prometheus-exporters-aruba-meraki-zabbix",
  "rag-crm-langchain-llamaindex",
  "rag-evaluation-production-minimum-tests",
  "redis-beyond-cache-idempotency",
  "sql-vs-nosql-decision-guide",
  "stripe-whatsapp-architecture",
  "terraform-ansible-responsibility-split",
  "victoriametrics-vs-prometheus-at-scale",
];

describe("site blog content migration", () => {
  it("ships all migrated hub slugs as markdown entries", async () => {
    for (const slug of expectedSlugs) {
      await access(path.join(blogDir, `${slug}.md`));
    }
  });

  it("stores required frontmatter keys in migrated entries", async () => {
    const sampleFile = path.join(blogDir, "k3s-multi-tenant-migration-checklist.md");
    const content = await readFile(sampleFile, "utf8");

    assert.match(content, /^---\n[\s\S]*title:/m);
    assert.match(content, /^---\n[\s\S]*description:/m);
    assert.match(content, /^---\n[\s\S]*pubDate:/m);
    assert.match(content, /^---\n[\s\S]*category:/m);
  });
});
