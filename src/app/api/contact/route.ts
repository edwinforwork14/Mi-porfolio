import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const resend = getResend();

    const emailHtml = buildEmailTemplate({ name, email, phone, message });

    await resend.emails.send({
      from: "Edwin Zuleta Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "edwinforwork14@gmail.com",
      subject: `Nuevo mensaje de ${name} — Portfolio Contact`,
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Message sent successfully! I'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailTemplate({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="padding-bottom:8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:32px 32px 0 32px;background:linear-gradient(135deg,#0a0a0a 0%,#1a0a2e 100%);border-radius:16px 16px 0 0;border:1px solid rgba(168,85,247,0.15);border-bottom:none;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(168,85,247,0.5);">Portfolio Contact</span>
                          <h1 style="margin:8px 0 0 0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">Nuevo Mensaje</h1>
                          <p style="margin:4px 0 0 0;font-size:14px;color:rgba(255,255,255,0.4);font-weight:400;">Recibiste un nuevo mensaje desde tu portfolio</p>
                        </td>
                        <td width="60" style="text-align:right;">
                          <span style="display:inline-block;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#7c3aed);text-align:center;line-height:48px;font-size:20px;">&#9993;</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Card -->
          <tr>
            <td style="padding:0 32px 32px 32px;background:linear-gradient(135deg,#0a0a0a 0%,#1a0a2e 100%);border-radius:0 0 16px 16px;border:1px solid rgba(168,85,247,0.15);border-top:none;">
              <table width="100%" cellpadding="0" cellspacing="0">
                
                <!-- Divider -->
                <tr>
                  <td style="padding:20px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.3),transparent);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Remitente -->
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(168,85,247,0.4);display:block;margin-bottom:6px;">Remitente</span>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="12" style="vertical-align:middle;">
                          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#a855f7;"></span>
                        </td>
                        <td style="vertical-align:middle;padding-left:8px;">
                          <span style="font-size:16px;font-weight:700;color:#ffffff;">${escapeHtml(name)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(168,85,247,0.4);display:block;margin-bottom:6px;">Email</span>
                    <a href="mailto:${escapeHtml(email)}" style="font-size:15px;color:#a855f7;text-decoration:underline;text-underline-offset:2px;text-decoration-color:rgba(168,85,247,0.3);font-weight:500;">${escapeHtml(email)}</a>
                  </td>
                </tr>

                ${
                  phone
                    ? `
                <tr>
                  <td style="padding-bottom:16px;">
                    <span style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(168,85,247,0.4);display:block;margin-bottom:6px;">Teléfono</span>
                    <span style="font-size:15px;color:rgba(255,255,255,0.8);font-weight:500;">${escapeHtml(phone)}</span>
                  </td>
                </tr>`
                    : ""
                }

                <!-- Divider -->
                <tr>
                  <td style="padding:16px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.2),transparent);"></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Mensaje -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <span style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(168,85,247,0.4);display:block;margin-bottom:10px;">Mensaje</span>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(168,85,247,0.05);border-radius:12px;border:1px solid rgba(168,85,247,0.08);">
                      <tr>
                        <td style="padding:16px 20px;">
                          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.85);line-height:1.7;font-weight:400;">${escapeHtml(message)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Timestamp -->
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);text-align:center;">
                      Enviado el ${new Date().toLocaleString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })} — via edwinzuleta.dev
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:16px;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">
                Este mensaje fue enviado desde el formulario de contacto de tu portfolio
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
