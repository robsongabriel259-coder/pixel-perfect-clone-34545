import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import heroMockup from "@/assets/mockup-novo-hero.png.asset.json";
import tagSuperior from "@/assets/tag-superior.png.asset.json";
import bundle from "@/assets/bundle.webp";
import mockupCheckoutPremium from "@/assets/mockup-checkout-premium.jpg.asset.json";
import mockupRodas from "@/assets/mockup-rodas.png.asset.json";
import mockupCompleto from "@/assets/mockup-receber.png.asset.json";
import wheel from "@/assets/capa-front.jpg.asset.json";
import wheel01 from "@/assets/wheels-new/wheel-01.jpg.asset.json";
import wheel02 from "@/assets/wheels-new/wheel-02.jpg.asset.json";
import wheel03 from "@/assets/wheels-new/wheel-03.jpg.asset.json";
import wheel04 from "@/assets/wheels-new/wheel-04.jpg.asset.json";
import wheel05 from "@/assets/wheels-new/wheel-05.jpg.asset.json";
import wheel06 from "@/assets/wheels-new/wheel-06.jpg.asset.json";
import wheel07 from "@/assets/wheels-new/wheel-07.jpg.asset.json";
import wheel08 from "@/assets/wheels-new/wheel-08.jpg.asset.json";
import wheel09 from "@/assets/wheels-new/wheel-09.jpg.asset.json";
import wheel10 from "@/assets/wheels-new/wheel-10.jpg.asset.json";
import bonus01 from "@/assets/bonus-new-01.png.asset.json";
import bonus02 from "@/assets/bonus-new-02.png.asset.json";
import bonus03 from "@/assets/bonus-new-03.png.asset.json";

export const Route = createFileRoute("/")({
  component: Landing,
});

const CHECKOUT_BASIC = "https://pay.wiapy.com/Rhw-89WaTU";
const CHECKOUT_PRO = "https://pay.wiapy.com/v936wChw0E-";

function CtaButton({ href = "#secao-precos", children = "QUERO ADQUIRIR O MEU" }: { href?: string; children?: React.ReactNode }) {
  return (
    <a href={href} className="btn-cta btn-cta-hover btn-cta-pulse text-sm md:text-base">{children}</a>
  );
}

function WheelCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-purple-card border-2 border-neon/40 p-4 shadow-lg flex flex-col gap-3 min-w-[240px] md:min-w-0">
      <span className="badge-top self-start" style={{ background: "#e02d6b", color: "#fff", borderColor: "#fff" }}>{tag}</span>
      <div className="rounded-xl overflow-hidden bg-white aspect-square">
        <img src={wheel.url} alt={title} loading="lazy" decoding="async" width={500} height={500} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-white font-extrabold text-sm uppercase">{title}</h3>
      <p className="text-white/80 text-xs leading-snug">{desc}</p>
    </div>
  );
}

function WheelsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const isPausedRef = useRef(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const wheels = [...WHEELS, ...WHEELS];

  const getOriginalIndex = (scrollLeft: number, cardW: number) => {
    const i = Math.round(scrollLeft / cardW) % WHEELS.length;
    return i < 0 ? i + WHEELS.length : i;
  };

  const scrollTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };

  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.clientWidth ?? 1;
    const currentOriginal = getOriginalIndex(el.scrollLeft, cardW);
    const nextOriginal = (currentOriginal + dir + WHEELS.length) % WHEELS.length;
    setIdx(nextOriginal);
    scrollTo(nextOriginal);
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.clientWidth ?? 1;
    const i = getOriginalIndex(el.scrollLeft, cardW);
    if (i !== idx) setIdx(i);
  };

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 3000);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const speed = 0.8;
    const half = el.scrollWidth / 2;

    const scroll = () => {
      if (!el || isPausedRef.current) {
        rafRef.current = requestAnimationFrame(scroll);
        return;
      }

      el.scrollLeft += speed;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }

      rafRef.current = requestAnimationFrame(scroll);
    };

    rafRef.current = requestAnimationFrame(scroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-2">
        <h2 className="text-center text-purple-deep font-black uppercase mb-8 px-4 max-w-[90%] md:max-w-[65%] mx-auto" style={{ fontSize: "28px", lineHeight: "28px" }}>
          Veja alguns dos 200 mapas de intervenção terapeutica que você vai receber
        </h2>
        <div className="relative mx-auto max-w-[318px] md:max-w-[360px]">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => { pauseAutoScroll(); go(-1); }}
            className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-10 text-purple-deep text-5xl md:text-6xl font-light select-none disabled:opacity-30"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próximo"
            onClick={() => { pauseAutoScroll(); go(1); }}
            className="absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 text-purple-deep text-5xl md:text-6xl font-light select-none disabled:opacity-30"
          >
            ›
          </button>
          <div
            ref={ref}
            onScroll={onScroll}
            className="flex overflow-x-auto scrollbar-none gap-5"
            style={{ scrollbarWidth: "none" }}
          >
            {wheels.map((w, i) => (
              <div key={i} className="shrink-0 w-full flex justify-center">
                <img src={w.src} alt={w.alt} loading="lazy" decoding="async" width={600} height={825} className="w-full h-auto rounded-[20px]" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {WHEELS.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para ${i + 1}`}
              onClick={() => { pauseAutoScroll(); setIdx(i); scrollTo(i); }}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-purple-deep" : "bg-purple-deep/25"}`}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <span aria-hidden className="text-cyan-500 text-xl leading-none font-bold">←</span>
            <span className="text-purple-deep font-extrabold text-xs tracking-wide">ARRASTE PARA O LADO</span>
            <span aria-hidden className="text-base leading-none">🫳</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const WHEELS = [
  { src: wheel01.url, alt: "Consciência Sonora" },
  { src: wheel02.url, alt: "Consciência Silábica" },
  { src: wheel03.url, alt: "Reconhecimento de Palavras" },
  { src: wheel04.url, alt: "Frases Frequentes" },
  { src: wheel05.url, alt: "Expansão de Vocabulário" },
  { src: wheel06.url, alt: "Compreensão de Comandos" },
  { src: wheel07.url, alt: "Construção de Frases" },
  { src: wheel08.url, alt: "Consciência Fonológica" },
  { src: wheel09.url, alt: "Sequência Lógica" },
  { src: wheel10.url, alt: "Atenção e Funções Executivas" },
];

const BENEFITS = [
  { icon: "📚", title: "PRONTO PARA IMPRIMIR", desc: "Receba os mapas em PDF, organizados por áreas de intervenção, para usar com praticidade no atendimento." },
  { icon: "👍", title: "DIRETO PARA APLICAR", desc: "Você não precisa criar materiais do zero. Basta escolher o mapa conforme o objetivo da criança e conduzir a sessão." },
  { icon: "⭐", title: "VISUAL, LÚDICO E ORGANIZADO", desc: "Mapas com cores, ilustrações e estrutura clara para facilitar o engajamento e a compreensão infantil." },
  { icon: "🏠", title: "FEITO PARA INTERVENÇÃO PSICOPEDAGÓGICA", desc: "Recursos pensados para apoiar habilidades como atenção, linguagem, comandos, sequência lógica, vocabulário e funções executivas." },
];

const IDEAL = [
  { icon: "🖨️", title: "Ter recursos prontos para a sessão", desc: "Pare de perder tempo criando materiais do zero antes de cada atendimento." },
  { icon: "🎯", title: "Conduzir intervenções com mais clareza", desc: "Use mapas visuais para organizar a proposta, o objetivo e a mediação da criança." },
  { icon: "🧩", title: "Apoiar crianças com dificuldades de aprendizagem", desc: "Trabalhe habilidades importantes de forma visual, lúdica e estruturada." },
  { icon: "✨", title: "Deixar seus atendimentos mais profissionais", desc: "Entregue uma experiência mais organizada, bonita e com alto valor percebido." },
];

const ITEM_LIST = [
  "200 Mapas de Intervenção Visual",
  "10 Áreas Psicopedagógicas",
  "20 Mapas em Cada Área",
  "Cartões em A4 Horizontal",
  "Prontos para Imprimir",
  "Aplicação Rápida em Sessão",
  "Linguagem, Atenção e Cognição",
  "Sequência, Comandos e Vocabulário",
  "Funções Executivas e Aprendizagem",
  "Capas Organizadoras Inclusas",
  "Acesso Digital Imediato",
];

const BONUSES = [
  { n: "01", img: bonus01.url, desc: "Modelos visuais para registrar a sessão e organizar a continuidade." },
  { n: "02", img: bonus02.url, desc: "Fichas visuais para acompanhar avanços, dificuldades e próximos passos." },
  { n: "03", img: bonus03.url, desc: "Materiais visuais para investigar habilidades e definir prioridades." },
];

const PREMIUM_LIST = [
  "210 Rodas de Anotação Matemática Visual;",
  "07 Blocos organizados por idade e ano escolar;",
  "30 Rodas Matemáticas em cada bloco;",
  "Conteúdos da Educação Infantil ao 5º ano;",
  "Rodas preenchíveis com 06 partes guiadas;",
  "Mapas visuais para registrar e revisar as aulas;",
  "20 Cartões de Revisão Matemática em 5 Minutos;",
  "20 Cartões \u201CExplique Como Você Pensou\u201D;",
  "20 Cartões de Acompanhamento da Aprendizagem;",
  "Material digital pronto para imprimir e aplicar.",
];

const FAQ = [
  { q: "Qual é a forma de pagamento?", a: "Você pode fazer o pagamento pelo pix ou cartão de crédito." },
  { q: "O pagamento é seguro?", a: "Sim, o pagamento é 100% seguro, onde utilizamos uma das maiores plataformas de vendas do mundo, a Wiapy. O acesso ao APP é imediato." },
  { q: "Como funciona a garantia?", a: "O periodo é de 7 dias de garantia incondicional. Caso você não goste, devolvemos o seu investimento sem burocracia. Basta solicitar o cancelamento da sua compra." },
  { q: "Como vou ter acesso ao Material?", a: "Assim que o seu pagamento for concluído, enviaremos um email com todos os dados de login para você acessar e baixar o material." },
];


function Landing() {
  return (
    <main className="text-white overflow-x-hidden relative">
      {/* Top bar — purple bg with neon green stacked text */}
      <div className="text-neon text-center py-[2px] px-3 font-black uppercase text-[1.40625rem] leading-none tracking-wide border-b-2 border-neon relative z-10" style={{ background: "#12002e" }}>
        Mapas de intervenção terapeutica<br />para psicopedagogas.
      </div>


      {/* HERO */}
      <section className="pt-5 pb-10 relative overflow-hidden" style={{
        background: `
          radial-gradient(ellipse 70% 45% at 50% 20%, rgba(210, 70, 230, 0.55), transparent 65%),
          radial-gradient(ellipse 90% 60% at 50% 55%, rgba(150, 50, 220, 0.45), transparent 70%),
          radial-gradient(circle at 15% 30%, rgba(255, 60, 180, 0.28), transparent 40%),
          radial-gradient(circle at 85% 40%, rgba(180, 60, 255, 0.3), transparent 45%),
          radial-gradient(ellipse 130% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%),
          linear-gradient(180deg, #1c0342 0%, #35098a 30%, #2a0670 60%, #180338 100%)
        `
      }}>
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 30% at 50% 45%, rgba(255,180,255,0.15), transparent 70%)"
        }} />

        <div className="max-w-md md:max-w-3xl mx-auto px-1 md:px-5 pt-2 flex flex-col items-center text-center gap-5">
          <img
            src={heroMockup.url}
            alt="Mapas de intervenção terapêutica para psicopedagogas"
            width={504}
            height={565}
            fetchPriority="high"
            decoding="async"
            className="w-full max-w-[331px] md:max-w-[387px] drop-shadow-2xl"
          />


          <h1 className="text-[24px] leading-[24px] font-black py-3 mt-4 text-balance -mx-3 md:mx-0 px-3 md:px-0">
            Receba +200 Mapas Visuais separados por objetivo, prontos para imprimir e aplicar na sua sessão terapeutica com mais clareza, organização e segurança profissional.
          </h1>


          <div className="text-orange-soft font-extrabold text-lg md:text-xl">
            Apenas R$ 17,90
          </div>

          <CtaButton />
        </div>
      </section>


      {/* WHEELS CAROUSEL */}
      <WheelsCarousel />


      {/* PRONTO PARA APLICAR */}
      <section className="bg-purple-glow py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase leading-[0.875]">
            <span className="text-neon block">VOCÊ RECEBERÁ UM<br />MATERIAL</span>
            <span className="text-orange-soft underline decoration-orange-soft decoration-4 underline-offset-4 block mt-[5px] leading-[1.1]">
              PRONTO PARA CONDUZIR<br />SUAS SESSÕES
            </span>
          </h2>
          <p className="text-neon mt-[38px] italic font-extrabold text-[22px] leading-tight">
            Tudo organizado para você imprimir,<br />escolher o objetivo da intervenção
          </p>
          <p className="text-white mt-4 text-[17px] leading-snug max-w-xs mx-auto">
            e aplicar com mais segurança na sua rotina de intervenção psicopedagógica.
          </p>

          <div className="grid grid-cols-1 gap-5 mt-10 max-w-sm mx-auto">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border-2 border-orange-soft flex flex-col items-center text-center gap-3 shadow-lg">
                <div className="text-5xl">{b.icon}</div>
                <h3 className="font-extrabold text-lg uppercase text-purple-deep leading-tight">{b.title}</h3>
                <p className="text-purple-deep text-[17px] font-medium leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>


          <p className="text-white mt-12 text-[22px] font-extrabold leading-[1.05]">
            Mais do que simples folhas para preencher, este material foi criado para ajudar a psicopedagoga a conduzir intervenções com mais clareza, intencionalidade e organização.
          </p>

          <p className="text-neon mt-6 text-[20px] font-extrabold underline decoration-neon decoration-2 underline-offset-4">
            Escolha, imprima, aplique e revise.
          </p>

          <div className="flex justify-center mt-8">
            <img src={mockupRodas.url} alt="Material completo Rodas Matemáticas" loading="lazy" decoding="async" width={680} height={742} className="w-full max-w-[389px] h-auto border-[2px] border-neon rounded-[15px]" />
          </div>

          <div className="mt-10 max-w-3xl mx-auto bg-white text-purple-deep rounded-2xl border-4 border-orange-badge p-6 md:p-8 flex items-center justify-center">
            <p className="font-black uppercase text-center flex-1" style={{ fontSize: "28px", lineHeight: "28px" }}>
              Este material ajuda a transformar a sessão em uma experiência mais visual, clara e direcionada.
            </p>
          </div>

          <div className="mt-6"><CtaButton /></div>
        </div>
      </section>

      {/* IDEAL PARA VOCÊ */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-purple-deep font-black uppercase mb-8" style={{ fontSize: "28px", lineHeight: "28px" }}>Ideal para você que deseja:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {IDEAL.map((b) => (
              <div key={b.title} className="bg-purple-deep rounded-2xl p-8 border-2 border-orange-badge flex flex-col items-center text-center gap-4">
                <div className="text-5xl">{b.icon}</div>
                <h3 className="font-black text-lg uppercase text-neon leading-tight">{b.title}</h3>
                <p className="text-white text-[17px] font-medium leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-purple-deep mt-8 text-base font-semibold">Pouco tempo por dia que faz toda a diferença.</p>
          <div className="mt-6"><CtaButton /></div>
        </div>
      </section>

      {/* VOCÊ VAI RECEBER */}
      <section className="bg-purple-glow py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center font-black uppercase mb-8" style={{ fontSize: "28px", lineHeight: "28px" }}>
            🎁 Você vai receber ao adquirir seu produto 🎁
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <img src={mockupCompleto.url} alt="Mockup material completo Rodas Matemáticas" loading="lazy" decoding="async" width={700} height={700} className="w-full mx-auto h-auto" />
            <div className="bg-white text-purple-deep rounded-2xl p-6 border-2 border-orange-badge">
              <div className="bg-orange-badge text-white text-center font-black uppercase py-2 rounded-md mb-4 border-2 border-[#2a1300]">
                ITEM 01
              </div>
              <ul className="space-y-2 text-[15px] leading-snug font-medium">
                {ITEM_LIST.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-neon-dark font-black">✓</span>{i}</li>
                ))}
              </ul>
              <p className="text-center font-black uppercase mt-4 text-[19px] text-[#2eb800]">E MUITO MAIS...</p>
            </div>
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="bg-purple-glow py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-neon font-black uppercase" style={{ fontSize: "26px", lineHeight: "26px" }}>
            E PARA FACILITAR AINDA<br />MAIS A APLICAÇÃO
          </h2>
          <p className="text-white/80 italic mt-5" style={{ fontSize: "26px", lineHeight: "26px" }}>Você também vai receber…</p>
          <div className="badge-top mt-6 mx-auto" style={{ background: "var(--orange-badge)", color: "#fff", fontSize: "26px", lineHeight: "26px" }}>03 BÔNUS EXCLUSIVOS</div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {BONUSES.map((b) => (
              <div key={b.n} className="flex flex-col">
                <div className="rounded-2xl overflow-hidden bg-white">
                  <img src={b.img} alt={`Bônus ${b.n}`} loading="lazy" decoding="async" width={708} height={1000} className="w-full h-auto block" />
                </div>
                <p className="text-white text-center mt-5 leading-snug" style={{ fontSize: "16px" }}>{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10"><CtaButton /></div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="secao-precos" className="bg-white text-purple-deep py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center font-black uppercase mb-10" style={{ fontSize: "28px", lineHeight: "28px" }}>
            Escolha a melhor opção<br />para você
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Básico */}
            <div className="rounded-2xl border-2 border-purple-deep/20 p-6 flex flex-col shadow-lg bg-white">
              <h3 className="text-center font-black uppercase" style={{ fontSize: "28px" }}>Acesso Básico</h3>
              <p className="text-center text-purple-deep/70 mt-1 mb-[30px]" style={{ fontSize: "18px", lineHeight: "18px" }}>Para quem quer as 210 rodas prontas para imprimir e aplicar.</p>
              <img src={wheel.url} alt="" loading="lazy" decoding="async" width={500} height={500} className="w-[134px] h-auto mx-auto mb-[30px] rounded-xl" />
              <p className="text-center mb-[30px]" style={{ fontSize: "18px", lineHeight: "18px" }}>✓ 210 Rodas de matemática prontas para imprimir e aplicar (em PDF)</p>
              <div className="text-center mb-[30px]">
                <div className="text-sm font-bold">R$</div>
                <div className="text-5xl font-black text-neon-dark leading-none">17,90</div>
                <div className="mt-1" style={{ fontSize: "18px", lineHeight: "18px" }}>ou 3X de R$ 6,92 no cartão</div>
              </div>
              <a href={CHECKOUT_BASIC} target="_blank" rel="noopener noreferrer" className="checkout-link btn-cta btn-cta-hover text-sm w-full mb-[30px] !bg-white !text-black !border-black/20 !shadow-[0_4px_0_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.1)]">ESCOLHER ACESSO BASICO</a>
              <p className="text-center uppercase" style={{ fontSize: "22px", lineHeight: "22px", fontWeight: 600, color: "red", textShadow: "0px 3px 6px rgba(255, 0, 0, 0.5)" }}>
                Atenção: temos uma oferta ainda mais vantajosa para você! Veja logo abaixo
              </p>
              <ArrowDownCircle className="mx-auto mt-2" size={40} color="red" />
            </div>

            {/* Pro Premium */}
            <div className="relative rounded-2xl border-4 border-neon-dark p-6 flex flex-col shadow-2xl bg-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-top" style={{ background: "var(--orange-badge)", color: "#fff", borderColor: "#2a1300" }}>
                MAIS ESCOLHIDO
              </div>
              <h3 className="text-center font-black uppercase mt-2" style={{ fontSize: "28px", lineHeight: "26px" }}>Acesso</h3>
              <h3 className="text-center font-black uppercase text-neon-dark mb-[30px]" style={{ fontSize: "28px", lineHeight: "26px" }}>Pro Premium</h3>
              <p className="text-center text-purple-deep/70 mt-1 mb-[30px]" style={{ fontSize: "18px", lineHeight: "18px" }}>Para quem quer as 210 rodas e os 3 bônus para revisar e acompanhar.</p>
              <div className="mb-[30px]">
                <img src={mockupCheckoutPremium.url} alt="Material completo - Rodas Matemáticas e bônus" loading="lazy" decoding="async" width={1228} height={760} className="w-full h-auto rounded-md" />
              </div>
              <div className="text-center mb-[30px]">
                <div className="text-sm line-through text-purple-deep/60">R$ 39,90</div>
                <span className="inline-block bg-orange-badge text-white text-xs font-black px-2 py-0.5 rounded">30% OFF</span>
                <div className="text-sm font-bold mt-1">R$</div>
                <div className="text-5xl font-black text-neon-dark leading-none">27,90</div>
                <div className="mt-1" style={{ fontSize: "18px", lineHeight: "18px" }}>ou 6X de R$ 6,52 no cartão</div>
              </div>
              <p className="text-center text-[11px] font-bold uppercase mb-[30px]">
                Tudo do ACESSO básico + BONUS EXCLUSIVOS EM PDF (Receba Imediatamente)
              </p>
              <ul className="mb-[30px]" style={{ fontSize: "18px", lineHeight: "18px" }}>
                {PREMIUM_LIST.map((i) => (
                  <li key={i} className="flex gap-2 mb-2"><span className="text-neon-dark font-black">✓</span>{i}</li>
                ))}
              </ul>
              <a href={CHECKOUT_PRO} target="_blank" rel="noopener noreferrer" className="checkout-link btn-cta btn-cta-hover text-sm w-full mb-[30px]">ESCOLHER ACESSO PRO PREMIUM</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-purple-glow py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center font-black uppercase text-2xl md:text-3xl">Perguntas Frequentes</h2>
          <p className="text-center text-white/70 mt-2 mb-8 text-sm">Suas principais dúvidas respondidas abaixo</p>
          <div className="space-y-3">
            {FAQ.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-purple-dark py-10 px-4 text-center text-white/70 text-xs leading-relaxed">
        <p className="font-bold mb-2">"Copyright © 2026 | Todos os direitos reservados.</p>
        <p className="max-w-2xl mx-auto">
          Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook.
          Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.
          A compra deste material não garante nenhum tipo de resultado. Fazemos todos os esforços para indicar claramente e mostrar todas as provas do produto e usamos resultados reais de alunos."
        </p>
      </footer>
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl overflow-hidden text-purple-deep">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 font-bold text-sm md:text-base"
      >
        <span>{q}</span>
        <span className="text-neon-dark text-2xl font-black shrink-0 ml-3">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-4 text-sm text-purple-deep/80">{a}</div>}
    </div>
  );
}
