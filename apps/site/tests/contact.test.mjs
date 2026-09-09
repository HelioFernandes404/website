import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createContactMailto, submitContact, validateContact } from "../src/utils/contact.js";

const values = { name: "Alex Smith", email: "alex@example.com", message: "Our deployment pipeline needs a review." };

describe("contact form", () => {
  it("rejects blank fields, whitespace, malformed email, and excessive length", () => {
    assert.deepEqual(Object.keys(validateContact({ name: " ", email: "invalid", message: "\n" })), ["name", "email", "message"]);
    assert.ok(validateContact({ ...values, email: "a@b" }).email);
    assert.ok(validateContact({ ...values, name: "a".repeat(101) }).name);
    assert.ok(validateContact({ ...values, message: "a".repeat(5001) }).message);
    assert.deepEqual(validateContact(values), {});
  });

  it("encodes the email draft without allowing subject parameters to be injected", () => {
    const unusual = { name: "Alex & Jo\r\nBcc: somebody@example.com", email: "alex+work@example.com", message: "K3s & CI/CD?\nCost: $100. #reliability" };
    const url = new URL(createContactMailto("heliodevhub@gmail.com", unusual));
    assert.equal(url.protocol, "mailto:");
    assert.equal(url.pathname, "heliodevhub@gmail.com");
    assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
    assert.doesNotMatch(url.searchParams.get("subject"), /[\r\n]/);
    assert.ok(url.searchParams.get("body").includes(unusual.message));
    assert.ok(url.searchParams.get("body").includes(unusual.email));
  });

  it("posts only the contact fields and requires explicit delivery acceptance", async () => {
    let request;
    await submitContact("/contact", { ...values, name: " Alex Smith " }, async (url, options) => {
      request = { url, ...options };
      return Response.json({ ok: true });
    });
    assert.equal(request.url, "/contact");
    assert.equal(request.method, "POST");
    assert.deepEqual(JSON.parse(request.body), values);
    assert.equal(request.headers.Accept, "application/json");
    assert.ok(request.signal instanceof AbortSignal);
    await submitContact("/contact", values, async () => Response.json({ success: true }));
  });

  it("never treats an HTTP error, HTML response, or unconfirmed response as sent", async () => {
    for (const response of [
      Response.json({ ok: false }, { status: 422 }),
      Response.json({ ok: true }, { status: 500 }),
      Response.json({}),
      Response.json({ success: false }),
      new Response("<html>Not a form endpoint</html>"),
    ]) {
      await assert.rejects(submitContact("/contact", values, async () => response));
    }
    await assert.rejects(submitContact("/contact", values, async () => { throw new TypeError("Network offline"); }));
  });
});
