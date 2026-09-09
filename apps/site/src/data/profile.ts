// Professional copy is based on the existing project case studies and the
// owner's stated SRE/DevOps focus. Add verified employer/title details here
// when available; project dates below are not employment dates.
export const profile = {
  name: "Hélio Fernandes",
  role: "SRE & DevOps Engineer",
  email: "heliodevhub@gmail.com",
  linkedin: "https://www.linkedin.com/in/heliofernandes/",
  github: "https://github.com/HelioFernandes404",
  hub: "https://hub.heliosuns404.com",
  description:
    "SRE and DevOps engineer with a software engineering background. Reliable infrastructure, observable systems, and automated delivery, from code to production.",
};

export const expertise = [
  {
    title: "Understand the system.",
    label: "Software & architecture",
    description:
      "Backend development is the foundation of my work. I build APIs and integrations, understand application behavior, and trace problems across service boundaries.",
    evidence: "Multi-tenant backends · APIs · Integration design",
  },
  {
    title: "Make delivery repeatable.",
    label: "DevOps & automation",
    description:
      "I connect development to production through automated pipelines, versioned infrastructure, and deployments with a clear path to rollback.",
    evidence: "CI/CD · GitOps · Infrastructure as code",
  },
  {
    title: "Keep production dependable.",
    label: "Reliability & observability",
    description:
      "I work on availability, useful telemetry, and incident response. The aim is to understand failures, reduce operational noise, and make recovery easier.",
    evidence: "Metrics & logs · Alerting · Incident diagnosis",
  },
];

export const experience = [
  {
    period: "Since December 2024",
    project: "SystemFrame",
    focus: "Reliability & platform operations",
    description:
      "Operating a multi-tenant observability platform. GitOps delivery, custom exporters, and alert-to-ticket integrations bring infrastructure and incident response together.",
    href: "/projects/systemframe/",
    employer: "", // Optional: add the verified employer, if appropriate to publish.
    jobTitle: "", // Optional: add the verified employment title.
  },
  {
    period: "July 2022 — December 2024",
    project: "Dai Tec AI",
    focus: "Software engineering & automated delivery",
    description:
      "Building a conversational AI platform: Node.js and TypeScript services, recurring billing, tenant isolation, and CI/CD across three AWS environments.",
    href: "/projects/dai-tec-ai/",
    employer: "",
    jobTitle: "",
  },
];

export const skills = [
  {
    title: "Infrastructure & cloud",
    items: [
      "Kubernetes / K3s",
      "Docker",
      "AWS · ECR / ECS",
      "Azure",
      "Terraform",
      "Helm",
      "Cloudflare",
    ],
  },
  {
    title: "Delivery & automation",
    items: ["GitHub Actions", "ArgoCD", "Ansible", "CI/CD", "GitOps", "n8n"],
  },
  {
    title: "Observability & reliability",
    items: [
      "Prometheus",
      "Grafana",
      "Loki",
      "VictoriaMetrics",
      "Alertmanager",
      "GLPI / ServiceNow",
    ],
  },
  {
    title: "Software & data",
    items: [
      "TypeScript",
      "Node.js",
      "Python",
      "MongoDB",
      "Stripe",
      "Qdrant / RAG",
      "OpenFGA",
    ],
  },
];

export const testimonials = [
  {
    text: "I had the pleasure of working with Helio. What stands out most is the strategic vision he brings to the team.",
    author: "Acacio Fernandes",
    role: "Head of Technology",
  },
  {
    text: "He brought technical clarity to the project and designed an infrastructure foundation built to scale safely.",
    author: "Juliana Herane",
    role: "Product Owner",
  },
  {
    text: "He doesn't just deliver code: he delivers end-to-end solutions, with technical judgment and a focus on the business.",
    author: "Andre Dini",
    role: "Tech Lead",
  },
];
