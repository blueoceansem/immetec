import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  Nome: z.string().trim().min(2).max(100),
  WhatsApp: z.string().trim().min(8).max(20),
  "Cidade/UF": z.string().trim().min(2).max(100),
  "Faturamento mensal": z.string().trim().min(1).max(100),
  "Quantidade de atendentes": z.number().int().min(1).max(99999),
});

export const sendLeadToCrm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env["CRM_WEBHOOK_URL"];
    const token = process.env["CRM_WEBHOOK_TOKEN"];
    if (!url || !token) {
      console.error("CRM webhook not configured");
      return { ok: false as const, error: "not_configured" };
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.error("CRM webhook error", res.status, await res.text().catch(() => ""));
        return { ok: false as const, error: "crm_error" };
      }
      return { ok: true as const };
    } catch (e) {
      console.error("CRM webhook failed", e);
      return { ok: false as const, error: "network" };
    }
  });
