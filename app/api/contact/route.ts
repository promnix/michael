import { Resend } from "resend";

type ContactRequest = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return Response.json({ message: "Invalid form submission." }, { status: 400 });
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const projectType = clean(body.projectType);
  const budget = clean(body.budget);
  const timeline = clean(body.timeline);
  const message = clean(body.message);

  if (!name || !email || !projectType || !message) {
    return Response.json(
      { message: "Name, email, project type, and project details are required." },
      { status: 400 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { message: "Contact form delivery is not configured yet." },
      { status: 503 },
    );
  }

  const { error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>", // replace with your verified domain sender
    to: "promiseedwin624@gmail.com",                     // replace with your email
    replyTo: email,
    subject: `New project enquiry from ${name}`,
    html: `
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;margin:0 auto;font-family:sans-serif;">
        <tr>
          <td style="background:#1a1a1a;padding:24px 28px;">
            <p style="margin:0;font-size:11px;letter-spacing:0.08em;color:#888;text-transform:uppercase;margin-bottom:6px;">New project enquiry</p>
            <p style="margin:0;font-size:20px;font-weight:600;color:#f5f0e8;">${name}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;border-bottom:1px solid #eeeeee;">
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
              <tr>
                <td style="padding:8px 0;color:#888;width:120px;vertical-align:top;">Email</td>
                <td style="padding:8px 0;color:#111;font-weight:500;">${email}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;vertical-align:top;">Project type</td>
                <td style="padding:8px 0;color:#111;">${projectType}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;vertical-align:top;">Budget</td>
                <td style="padding:8px 0;color:#111;">${budget || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#888;vertical-align:top;">Timeline</td>
                <td style="padding:8px 0;color:#111;">${timeline || "Not provided"}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 28px;">
            <p style="margin:0 0 10px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:0.06em;">Project details</p>
            <p style="margin:0;font-size:15px;color:#111;line-height:1.7;white-space:pre-wrap;">${message}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 28px;background:#f9f9f9;border-top:1px solid #eee;">
            <p style="margin:0;font-size:12px;color:#aaa;">Sent via your portfolio contact form</p>
          </td>
        </tr>
      </table>
    `,
  });

  if (error) {
    return Response.json(
      { message: "The contact form could not send right now. Please try again later." },
      { status: 502 },
    );
  }

  return Response.json({ message: "Message sent. I will reply soon." });
}