/** Shared, pure validation keeps the form's messages in English. */
export function validateContact(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = "Please enter your name.";
  else if (values.name.trim().length > 100)
    errors.name = "Please keep your name under 100 characters.";
  if (
    !values.email?.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = "Please enter a valid email address.";
  } else if (values.email.trim().length > 254)
    errors.email = "Please use an email address under 254 characters.";
  if (!values.message?.trim())
    errors.message =
      "Please tell me a little about your project or opportunity.";
  else if (values.message.trim().length > 5000)
    errors.message = "Please keep your message under 5,000 characters.";
  return errors;
}

export function createContactMailto(recipient, values) {
  const subject = `Website inquiry from ${values.name.trim().replace(/[\r\n]/g, " ")}`;
  const body = `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Compatible with a JSON form endpoint such as Formspree. No private key belongs in the browser. */
export async function submitContact(endpoint, values, fetcher = fetch) {
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok)
    throw new Error(
      "Your message could not be sent. Please try again or use the email link.",
    );
  const result = await response.json();
  if (result.ok !== true && result.success !== true) {
    throw new Error(
      "Delivery could not be confirmed. Please use the email link below.",
    );
  }
}
