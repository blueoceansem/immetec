import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  Play,
  Rocket,
  ShoppingCart,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/imme-logo.png.asset.json";
import { useServerFn } from "@tanstack/react-start";
import { sendLeadToCrm } from "@/lib/crm.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gestão para Bares e Restaurantes | IMME" },
      { name: "description", content: "Vendas, estoque e caixa integrados para bares e restaurantes, com implantação acompanhada em até 5 dias." },
      { property: "og:title", content: "Gestão para Bares e Restaurantes | IMME" },
      { property: "og:description", content: "Vendas, estoque e caixa integrados, sem parar sua operação para migrar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const formSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  whatsapp: z.string().trim().min(8).max(20),
  revenue: z.string().min(1),
  city: z.string().trim().min(2).max(100),
  team: z.string().trim().regex(/^[1-9]\d{0,4}$/),
});

const solutions = [
  { icon: ShoppingCart, title: "VENDAS", items: ["Integração com as principais maquininhas", "Cardápio com imagens", "Comandas digitais", "Cashback e fidelização"] },
  { icon: Boxes, title: "ESTOQUE", items: ["Compras inteligentes", "Fichas técnicas", "CMV real e controlado", "Alerta de estoque crítico"] },
  { icon: WalletCards, title: "FINANCEIRO", items: ["Integração fiscal com SEFAZ", "Conciliação bancária", "Contas a pagar e receber", "DRE gerencial", "Fluxo de caixa"] },
];

const differences = [
  { icon: ClipboardCheck, title: "Implantação acompanhada", text: "Nossa equipe configura o sistema e acompanha sua operação durante todo o processo de implantação." },
  { icon: Rocket, title: "Migração sem parar sua operação", text: "Você não precisa começar do zero. A equipe da IMME cuida da migração dos dados essenciais para você trocar de sistema com mais segurança." },
  { icon: Zap, title: "Tudo conectado", text: "Vendas, estoque e financeiro trabalham com as mesmas informações, evitando dados espalhados e decisões no achismo." },
  { icon: Users, title: "Especialistas em bares e restaurantes", text: "Você não está contratando apenas um software. Está colocando uma equipe que entende da rotina da sua operação para trabalhar com você." },
];

const testimonials = [
  { name: "Restaurante Joia Carioca", person: "Ivan Pereira — Sócio Proprietário", video: "g8g8PAe0CKU" },
  { name: "Restaurante Barzin", person: "Aline Mattos — Diretora Geral", video: "BEMAWX7nMcM" },
  { name: "K08 Beach Club", person: "Vanessa Martins — Gerente", video: "yqvsWV_X-D0" },
];

function scrollToForm() {
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-2xl animate-float" aria-label="Painel ilustrativo do sistema IMME">
      <div className="absolute -inset-8 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-card p-3 shadow-soft md:p-5">
        <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground"><BarChart3 size={18} /></span><div><p className="text-xs font-bold text-primary">DASHBOARD</p><p className="text-[10px] text-muted-foreground">Visão geral da operação</p></div></div>
          <span className="rounded-full bg-violet-soft px-3 py-1 text-[10px] font-semibold text-primary">AO VIVO</span>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {[['Faturamento','R$ 241.159'],['Transações','16.011'],['Ticket médio','R$ 21,43']].map(([label,value]) => <div key={label} className="rounded-md bg-primary p-3 text-primary-foreground md:p-4"><p className="text-[9px] opacity-70 md:text-[10px]">{label}</p><p className="mt-1 text-xs font-bold md:text-base">{value}</p></div>)}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-3 rounded-md bg-secondary p-4">
            {[['Crédito','51%'],['Débito','36%'],['PIX','13%']].map(([label,value],i) => <div key={label}><div className="mb-1 flex justify-between text-[10px] font-medium"><span>{label}</span><span>{value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-border"><div className="h-full rounded-full bg-primary" style={{width:`${78-i*17}%`}} /></div></div>)}
          </div>
          <div className="relative min-h-36 rounded-md bg-secondary p-3">
            <p className="text-[10px] font-semibold">Performance da receita</p>
            <svg viewBox="0 0 320 120" className="mt-2 h-28 w-full" role="img" aria-label="Gráfico de receita em crescimento">
              {[20,50,80,110].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} className="stroke-border" strokeWidth="1" />)}
              <path d="M0 105 C25 102 28 92 48 96 S78 74 96 79 S124 42 145 50 S170 18 190 35 S214 80 235 59 S270 44 320 28" fill="none" className="stroke-primary animate-draw" strokeWidth="4" strokeLinecap="round" />
              <path d="M0 105 C25 102 28 92 48 96 S78 74 96 79 S124 42 145 50 S170 18 190 35 S214 80 235 59 S270 44 320 28 L320 120 L0 120Z" className="fill-primary/10" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-md bg-night p-3 text-primary-foreground shadow-brand md:-left-10"><span className="grid size-9 place-items-center rounded-md bg-accent"><CircleDollarSign size={19}/></span><div><p className="text-[10px] opacity-60">Fluxo de caixa</p><p className="text-sm font-bold">+18,4%</p></div></div>
    </div>
  );
}

function TestimonialCard({ name, person, video, index }: { name: string; person: string; video: string; index: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="reveal group overflow-hidden bg-night text-primary-foreground shadow-soft">
      <div className="relative aspect-[9/16] bg-night">
        {playing ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0&playsinline=1`} title={`Depoimento ${name}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Assistir ao depoimento de ${name}`} className="absolute inset-0 grid place-items-center">
            <img src={`https://i.ytimg.com/vi/${video}/oardefault.jpg`} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-night/35 transition duration-500 group-hover:bg-night/20" />
            <span className="relative grid size-14 place-items-center rounded-full bg-accent text-primary-foreground shadow-brand transition duration-300 group-hover:scale-110"><Play className="ml-0.5 size-6" /></span>
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-6"><div><p className="text-lg font-bold">{name}</p><p className="mt-2 text-sm text-primary-foreground/60">{person}</p></div><span className="text-xs text-primary-foreground/40">0{index + 1}</span></div>
    </article>
  );
}

function LeadForm() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const sendLead = useServerFn(sendLeadToCrm);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) { setError("Preencha todos os campos corretamente."); return; }
    setError("");
    const d = parsed.data;
    const text = `Olá, IMME! Quero falar com um especialista.\n\nNome: ${d.name}\nE-mail: ${d.email}\nWhatsApp: ${d.whatsapp}\nFaturamento mensal: ${d.revenue}\nCidade/UF: ${d.city}\nQuantidade de atendentes: ${d.team}`;
    // Open the WhatsApp tab synchronously so pop-up blockers allow it.
    const win = window.open("about:blank", "_blank");
    setSending(true);
    try {
      const res = await sendLead({ data: { Nome: d.name, WhatsApp: d.whatsapp, "Cidade/UF": d.city, "Faturamento mensal": d.revenue, "Quantidade de atendentes": Number(d.team) } });
      if (!res.ok) setError("Não foi possível registrar seus dados agora, mas você pode seguir pelo WhatsApp.");
    } catch {
      setError("Não foi possível registrar seus dados agora, mas você pode seguir pelo WhatsApp.");
    } finally {
      setSending(false);
    }
    const waUrl = `https://wa.me/5521967227622?text=${encodeURIComponent(text)}`;
    if (win) { win.opener = null; win.location.href = waUrl; } else window.location.href = waUrl;
  }
  const field = "h-12 w-full rounded-md border border-input bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
  return (
    <form onSubmit={submit} noValidate className="rounded-lg border border-primary/10 bg-card p-6 shadow-soft md:p-8">
      <div className="mb-7"><h2 className="text-2xl font-bold text-ink">Veja como a IMME pode organizar sua operação</h2><p className="mt-2 text-sm text-muted-foreground">Preencha os dados abaixo e fale com um especialista.</p></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Nome<input name="name" maxLength={100} className={`${field} mt-2`} placeholder="Digite seu nome" /></label>
        <label className="text-sm font-semibold">E-mail<input name="email" type="email" maxLength={255} className={`${field} mt-2`} placeholder="Digite seu melhor e-mail" /></label>
        <label className="text-sm font-semibold">WhatsApp<input name="whatsapp" inputMode="tel" maxLength={20} className={`${field} mt-2`} placeholder="Digite seu WhatsApp" /></label>
        <label className="text-sm font-semibold">Faturamento mensal<select name="revenue" defaultValue="" className={`${field} mt-2`}><option value="" disabled>Selecione uma opção</option><option>Até 100 Mil mensais</option><option>100 a 200 Mil mensais</option><option>201 a 500 Mil mensais</option><option>501 Mil a 1M mensais</option><option>1M a 3M mensais</option><option>Acima de 3M mensais</option></select></label>
        <label className="text-sm font-semibold">Cidade/UF<input name="city" maxLength={100} className={`${field} mt-2`} placeholder="Digite sua cidade" /></label>
        <label className="text-sm font-semibold">Quantidade de atendentes<input name="team" inputMode="numeric" maxLength={5} className={`${field} mt-2`} placeholder="Ex: 12" /></label>
      </div>
      {error && <p role="alert" className="mt-4 text-sm font-medium text-destructive">{error}</p>}
      <Button type="submit" size="lg" disabled={sending} className="mt-6 w-full">Quero falar com um especialista <ArrowRight /></Button>
      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">Ao enviar, você será direcionado para uma conversa no WhatsApp com o resumo da sua operação.</p>
    </form>
  );
}

function Index() {
  return <main>
    <header className="absolute inset-x-0 top-0 z-20"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-8"><img src={logoAsset.url} alt="IMME Tecnologia" className="h-14 w-auto"/><button onClick={scrollToForm} className="hidden text-sm font-semibold text-primary md:inline-flex">Fale com um especialista <ArrowRight className="ml-2" size={17}/></button></div></header>

    <section className="relative min-h-[760px] overflow-hidden bg-background pt-36 md:min-h-[820px]">
      <div className="absolute right-0 top-0 h-full w-1/3 bg-violet-soft/45 [clip-path:polygon(58%_0,100%_0,100%_100%,0_100%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 md:px-8 lg:grid-cols-[.95fr_1.05fr]">
        <div className="animate-fade-in"><h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] text-ink md:text-6xl">Seu bar ou restaurante com <span className="text-primary">gestão e controle</span> totalmente integrados.</h1><p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">Do controle manual pro sistema de verdade: vendas, estoque e caixa organizados, sem parar sua operação pra migrar.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={scrollToForm} size="lg">Fale com um especialista agora <ArrowRight/></Button><button onClick={()=>document.getElementById('solucao')?.scrollIntoView({behavior:'smooth'})} className="inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-semibold text-primary">Como funciona a implantação <ArrowDown size={17}/></button></div></div>
        <DashboardMockup />
      </div>
    </section>

    <section id="formulario" className="relative z-10 -mt-8 px-5 pb-24 md:px-8"><div className="mx-auto max-w-5xl"><LeadForm/></div></section>

    <section id="solucao" className="section-pad overflow-hidden bg-night text-primary-foreground"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="reveal grid gap-6 md:grid-cols-2 md:items-end"><div><h2 className="text-3xl font-bold leading-tight md:text-5xl">Tudo o que sua operação precisa. <span className="text-accent">Conectado em um só lugar.</span></h2></div><p className="text-base leading-relaxed text-primary-foreground/70">A IMME integra <strong className="text-primary-foreground">VENDAS, FINANCEIRO e ESTOQUE</strong> em uma única visão para organizar a sua operação</p></div>
      <div className="mt-14 grid gap-4 lg:grid-cols-3">{solutions.map((s,i)=><article key={s.title} className="reveal group border border-primary-foreground/15 bg-primary-foreground/[.04] p-7 transition duration-500 hover:-translate-y-2 hover:border-accent/60"><div className="mb-8 flex items-center justify-between"><span className="grid size-12 place-items-center rounded-md bg-accent text-primary-foreground"><s.icon/></span><span className="text-5xl font-bold text-primary-foreground/10">0{i+1}</span></div><h3 className="text-xl font-bold">{s.title}</h3><ul className="mt-5 space-y-3">{s.items.map(item=><li key={item} className="flex gap-3 text-sm text-primary-foreground/70"><Check className="mt-0.5 size-4 shrink-0 text-accent"/>{item}</li>)}</ul></article>)}</div>
      <div className="reveal mt-20 grid gap-10 border-t border-primary-foreground/15 pt-16 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold text-accent">E A IMPLANTAÇÃO?</p><h2 className="mt-3 text-4xl font-bold">É aqui que entra o Método 5D.</h2></div><div><p className="text-lg leading-relaxed text-primary-foreground/70">A IMME não entrega apenas o sistema. Nossa equipe entende sua operação, configura tudo e acompanha sua equipe para colocar a solução para rodar.</p><div className="my-8 flex flex-col gap-4 md:flex-row md:items-center">{['Diagnóstico','Implantação','Acompanhamento'].map((x,i)=><div key={x} className="flex items-center gap-4"><span className="font-semibold">{x}</span>{i<2&&<ArrowRight className="rotate-90 text-accent md:rotate-0"/>}</div>)}</div><p className="font-bold text-accent">Go-live em até 5 dias após o recebimento dos dados essenciais.</p><p className="mt-3 text-lg">Você foca em vender. A gente cuida do resto.</p><Button variant="light" size="lg" className="mt-7" onClick={scrollToForm}>Quero organizar minha operação <ArrowRight/></Button></div></div>
    </div></section>

    <section className="section-pad bg-background"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="reveal max-w-3xl"><h2 className="text-3xl font-bold text-ink md:text-5xl">Mais do que um sistema. Uma operação preparada para rodar.</h2></div><div className="mt-14 grid border-l border-t border-border md:grid-cols-2">{differences.map(({icon:Icon,title,text})=><article key={title} className="reveal border-b border-r border-border p-7 transition-colors hover:bg-secondary md:p-10"><Icon className="mb-8 size-9 text-primary"/><h3 className="text-xl font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div><Button className="mt-10" size="lg" onClick={scrollToForm}>Quero conhecer a IMME <ArrowRight/></Button></div></section>

    <section className="section-pad bg-violet-soft"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="reveal text-center"><h2 className="text-3xl font-bold text-ink md:text-5xl">Resultados que já fazem parte da operação IMME.</h2></div><div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-primary/15 lg:grid-cols-4">{[['+500','Clientes atendidos e em crescimento'],['+1.000','Estabelecimentos transformados'],['+15%','De aumento médio no faturamento'],['+94%','De satisfação com o suporte']].map(([n,t])=><div key={n} className="reveal bg-background p-6 md:p-9"><p className="text-3xl font-extrabold text-primary md:text-5xl">{n}</p><p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">{t}</p></div>)}</div><h3 className="mt-20 text-center text-2xl font-bold text-ink">Quem vive a operação, sente a diferença.</h3><div className="mt-8 grid gap-4 md:grid-cols-3">{testimonials.map((t,i)=><TestimonialCard key={t.name} {...t} index={i}/>)}</div><p className="mt-8 text-center text-sm text-muted-foreground">Confira os depoimentos de quem já viveu a transformação na operação.</p></div></section>

    <section className="relative overflow-hidden bg-night py-24 text-primary-foreground md:py-32"><div className="absolute -right-20 -top-20 size-96 rounded-full border border-accent/20"/><div className="absolute -right-5 top-12 size-64 rounded-full border border-accent/20"/><div className="relative mx-auto max-w-4xl px-5 text-center md:px-8"><h2 className="text-4xl font-bold leading-tight md:text-6xl">Sua operação pode estar te dando lucro ou só trabalho.</h2><p className="mt-4 text-2xl font-semibold text-accent">Descubra qual dos dois.</p><p className="mx-auto mt-7 max-w-2xl leading-relaxed text-primary-foreground/70">Fale com um especialista, entenda onde sua operação pode melhorar e receba um plano personalizado para o seu negócio.</p><Button variant="light" size="lg" className="mt-9" onClick={scrollToForm}>Falar com um especialista <ArrowRight/></Button><p className="mt-5 text-xs text-primary-foreground/50">Ao clicar, você será direcionado para uma conversa no WhatsApp com o resumo da sua operação.</p></div></section>

    <footer className="bg-background"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-8 md:flex-row md:px-8"><img src={logoAsset.url} alt="IMME Tecnologia" className="h-10 w-auto"/><p className="text-xs text-muted-foreground">© 2026 IMME Tecnologia. Todos os direitos reservados.</p></div></footer>
  </main>;
}