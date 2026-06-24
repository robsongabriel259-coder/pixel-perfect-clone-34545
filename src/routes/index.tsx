import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import heroMockup from "@/assets/hero-mockup.jpg.asset.json";
import tagSuperior from "@/assets/tag-superior.png.asset.json";
import bundle from "@/assets/bundle.png";
import kids from "@/assets/kids.png";
import wheel from "@/assets/wheel-sample.jpg";
import wheel01 from "@/assets/wheels/wheel-01.jpg.asset.json";
import wheel02 from "@/assets/wheels/wheel-02.jpg.asset.json";
import wheel03 from "@/assets/wheels/wheel-03.jpg.asset.json";
import wheel04 from "@/assets/wheels/wheel-04.jpg.asset.json";
import wheel05 from "@/assets/wheels/wheel-05.jpg.asset.json";
import wheel06 from "@/assets/wheels/wheel-06.jpg.asset.json";
import wheel07 from "@/assets/wheels/wheel-07.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Landing,
});

const CHECKOUT_BASIC = "https://pay.wiapy.com/TGNuxQv8M3?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";
const CHECKOUT_PRO = "https://pay.wiapy.com/v9vc0UDffDz?utm_source=organic&utm_campaign=&utm_medium=&utm_content=&utm_term=";

function CtaButton({ href = "#planos", children = "QUERO ADQUIRIR O MEU" }: { href?: string; children?: React.ReactNode }) {
  return (
    <a href={href} className="btn-cta btn-cta-hover text-sm md:text-base">{children}</a>
  );
}

function WheelCard({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-purple-card border-2 border-neon/40 p-4 shadow-lg flex flex-col gap-3 min-w-[240px] md:min-w-0">
      <span className="badge-top self-start" style={{ background: "#e02d6b", color: "#fff", borderColor: "#fff" }}>{tag}</span>
      <div className="rounded-xl overflow-hidden bg-white aspect-square">
        <img src={wheel} alt={title} loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-white font-extrabold text-sm uppercase">{title}</h3>
      <p className="text-white/80 text-xs leading-snug">{desc}</p>
    </div>
  );
}

function WheelsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const scrollTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };
  const go = (dir: number) => {
    const next = Math.max(0, Math.min(WHEELS.length - 1, idx + dir));
    setIdx(next);
    scrollTo(next);
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const cardW = (el.children[0] as HTMLElement)?.clientWidth ?? 1;
    const i = Math.round(el.scrollLeft / cardW);
    if (i !== idx) setIdx(i);
  };
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-2">
        <h2 className="text-center text-purple-deep font-black text-2xl md:text-3xl uppercase mb-8 px-4">
          Conheça algumas das 210 rodas<br className="hidden md:block" /> matemáticas que você vai receber
        </h2>
        <div className="relative">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-purple-deep text-4xl md:text-5xl font-light px-2 select-none disabled:opacity-30"
            disabled={idx === 0}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Próximo"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-purple-deep text-4xl md:text-5xl font-light px-2 select-none disabled:opacity-30"
            disabled={idx === WHEELS.length - 1}
          >
            ›
          </button>
          <div
            ref={ref}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none px-10"
            style={{ scrollbarWidth: "none" }}
          >
            {WHEELS.map((w) => (
              <div key={w.title} className="snap-center shrink-0 w-full flex justify-center">
                <WheelCard {...w} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {WHEELS.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir para ${i + 1}`}
              onClick={() => { setIdx(i); scrollTo(i); }}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-purple-deep" : "bg-purple-deep/25"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const WHEELS = [
  { tag: "EDUCAÇÃO INFANTIL", title: "RODA DOS NÚMEROS", desc: "Atividade lúdica para reconhecer numerais e quantidades com a criança." },
  { tag: "1º ANO/2º ANO", title: "ADIÇÃO E SUBTRAÇÃO", desc: "Roda completa para praticar contas básicas de forma visual." },
  { tag: "2º ANO/3º ANO", title: "MULTIPLICAÇÃO", desc: "A criança preenche cada fatia da roda com o resultado da multiplicação." },
  { tag: "4º ANO/5º ANO", title: "FRAÇÕES E DECIMAIS", desc: "Anotação visual para registrar e revisar frações e números decimais." },
];

const BENEFITS = [
  { icon: "📚", title: "PRONTO PARA IMPRIMIR", desc: "Escolha a roda, imprima e aplique sem criar do zero." },
  { icon: "👍", title: "MUITO FÁCIL DE APLICAR", desc: "A criança completa, registra e revisa o conteúdo." },
  { icon: "⭐", title: "MATERIAL LÚDICO E VISUAL", desc: "Cada roda vira um mapa visual criado pela criança." },
  { icon: "🏠", title: "IDEAL PARA CASA OU ESCOLA", desc: "Use nas aulas, no reforço ou na revisão diária." },
];

const IDEAL = [
  { icon: "🎓", title: "AJUDAR NA MATEMÁTICA", desc: "Torne a matemática mais clara e visual." },
  { icon: "🎈", title: "TORNAR AS AULAS MAIS LEVES E DIVERTIDAS", desc: "Aplicações lúdicas que engajam e motivam." },
  { icon: "📈", title: "ACOMPANHAR A EVOLUÇÃO COM MAIS CLAREZA", desc: "As rodas mostram o progresso da criança." },
  { icon: "⏱️", title: "APLICAR SEM CRIAR ATIVIDADES DO ZERO", desc: "Escolha, imprima e aplique em poucos minutos." },
];

const ITEM_LIST = [
  "210 Rodas de Anotação Matemática",
  "07 Blocos por Ano Escolar",
  "30 Rodas em Cada Bloco",
  "Cartões Visuais Preenchíveis",
  "Aplicação Rápida em Aula",
  "Atividades de Registro e Revisão",
  "Rodas com 6 Fatias Guiadas",
  "Conteúdos por Ano Escolar",
  "Arquivos Prontos para Imprimir",
  "Uso em Casa, Aula ou Reforço",
  "Acesso Digital Imediato",
];

const BONUSES = [
  { n: "01", title: "REVISÃO MATEMÁTICA EM 5 MIN", cards: "20 CARTÕES", desc: "Revise em 5 minutos o que foi esquecido e reforce os pontos que ainda geram dúvidas." },
  { n: "02", title: "EXPLIQUE COMO VOCÊ PENSOU", cards: "20 CARTÕES", desc: "Descubra onde a criança se confunde e ajude-a a explicar o próprio raciocínio." },
  { n: "03", title: "ACOMPANHAMENTO DA APRENDIZAGEM", cards: "20 CARTÕES", desc: "Identifique avanços e dificuldades antes que pequenas dúvidas atrasem a aprendizagem." },
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
    <main className="bg-purple-deep text-white overflow-x-hidden">
      {/* Top bar — purple bg with neon green stacked text */}
      <div className="bg-purple-deep text-neon text-center py-[11px] px-3 font-black uppercase text-[1.40625rem] leading-none tracking-wide border-b-2 border-neon">
        RODAS MATEMÁTICAS<br />PRONTAS PARA<br />IMPRIMIR E APLICAR
      </div>


      {/* HERO */}
      <section className="pt-5 pb-10 bg-purple-deep relative">
        <div className="max-w-md md:max-w-3xl mx-auto px-5 pt-2 flex flex-col items-center text-center gap-5">
          <img
            src={tagSuperior.url}
            alt="+200 Rodas Matemáticas"
            width={600}
            height={120}
            className="w-auto h-10 md:h-12"
          />


          <img
            src={heroMockup.url}
            alt="Rodas matemáticas mockup"
            width={1024}
            height={1024}
            className="w-full max-w-[288px] md:max-w-[336px] drop-shadow-2xl"
          />

          <div className="btn-cta text-xs md:text-sm cursor-default !py-2 !px-5">
            PARA ALUNOS DE 04 A 10 ANOS
          </div>

          <h1 className="text-xl md:text-3xl font-black uppercase leading-[0.95] py-3 mt-5">
            TENHA + 200 RODAS<br />
            MATEMÁTICAS PREENCHÍVEIS<br />
            E ORGANIZADAS DA<br />
            EDUCAÇÃO INFANTIL AO 5º<br />
            ANO, PARA ENSINAR,<br />
            PRATICAR E REVISAR<br />
            CONTEÚDOS SEM CRIAR<br />
            ATIVIDADES DO ZERO.
          </h1>

          <p className="text-white/90 text-[1.05rem] md:text-[1.2rem] font-medium px-2 leading-[0.96]">
            Transforme cada cinteúdo em um mapa visual construido pelos alunos com anotações.
          </p>

          <div className="text-orange-soft font-extrabold text-lg md:text-xl">
            Apenas R$ 17,90
          </div>

          <CtaButton />
        </div>
      </section>


      {/* WHEELS CAROUSEL */}
      <WheelsCarousel />


      {/* PRONTO PARA APLICAR */}
      <section className="bg-purple-dark py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase">
            <span className="text-neon">Você receberá um material</span><br />
            <span className="text-white underline decoration-neon decoration-4 underline-offset-4">pronto para aplicar</span>
          </h2>
          <p className="text-neon mt-4 italic font-semibold text-sm md:text-base">
            Tudo organizado por ano escolar e conteúdo para facilitar
          </p>
          <p className="text-white/80 text-sm md:text-base">
            sua rotina e transformar cada aula em uma anotação matemática visual.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-purple-card rounded-2xl p-5 border-2 border-white/10 flex flex-col items-center text-center gap-2">
                <div className="text-4xl">{b.icon}</div>
                <h3 className="font-extrabold text-sm uppercase">{b.title}</h3>
                <p className="text-white/75 text-xs leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-white text-lg md:text-xl font-bold">
            Mais do que atividades: <span className="italic">anotações matemáticas</span><br />
            visuais construídas pela própria criança.
          </p>

          <div className="flex justify-center mt-8">
            <img src={bundle} alt="Material completo" loading="lazy" width={1024} height={768} className="w-full max-w-xl" />
          </div>

          <div className="mt-10 max-w-3xl mx-auto bg-white text-purple-deep rounded-2xl border-4 border-orange-badge p-6 md:p-8 flex items-center gap-4">
            <img src={kids} alt="" loading="lazy" width={120} height={120} className="hidden md:block w-24 h-24 object-contain" />
            <p className="font-black uppercase text-sm md:text-lg text-center flex-1">
              Este material ajuda a criança a transformar a matemática em uma anotação visual leve, clara e prática.
            </p>
          </div>

          <div className="mt-6"><CtaButton /></div>
        </div>
      </section>

      {/* IDEAL PARA VOCÊ */}
      <section className="bg-purple-deep py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-white text-xl md:text-2xl font-black uppercase mb-8">Ideal para você que deseja:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IDEAL.map((b) => (
              <div key={b.title} className="bg-purple-card rounded-2xl p-5 border-2 border-neon/30 flex flex-col items-center text-center gap-2">
                <div className="text-4xl">{b.icon}</div>
                <h3 className="font-extrabold text-xs md:text-sm uppercase">{b.title}</h3>
                <p className="text-white/75 text-xs leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-white/80 mt-6 text-sm">Pouco tempo por dia que faz toda a diferença.</p>
          <div className="mt-6"><CtaButton /></div>
        </div>
      </section>

      {/* VOCÊ VAI RECEBER */}
      <section className="bg-purple-dark py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center font-black uppercase text-lg md:text-2xl mb-8">
            🎁 Você vai receber ao adquirir seu produto 🎁
          </h2>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <img src={kids} alt="Crianças usando o material" loading="lazy" width={768} height={512} className="w-full rounded-2xl bg-white p-2" />
            <div className="bg-white text-purple-deep rounded-2xl p-6 border-2 border-orange-badge">
              <div className="bg-orange-badge text-white text-center font-black uppercase py-2 rounded-md mb-4 border-2 border-[#2a1300]">
                ITEM 01
              </div>
              <ul className="space-y-2 text-sm">
                {ITEM_LIST.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-neon-dark font-black">✓</span>{i}</li>
                ))}
              </ul>
              <p className="text-center font-black uppercase mt-4 text-neon-dark">E muito mais...</p>
            </div>
          </div>
        </div>
      </section>

      {/* BÔNUS */}
      <section className="bg-purple-deep py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-neon font-black uppercase text-xl md:text-2xl">
            E para facilitar ainda<br />mais a aplicação
          </h2>
          <p className="text-white/80 italic mt-3">Você também vai receber…</p>
          <div className="badge-top mt-6 mx-auto" style={{ background: "var(--orange-badge)", color: "#fff" }}>03 BÔNUS EXCLUSIVOS</div>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {BONUSES.map((b) => (
              <div key={b.n} className="bg-purple-card rounded-2xl border-2 border-neon/30 p-5 text-left">
                <div className="text-neon font-black text-sm">BÔNUS {b.n}</div>
                <h3 className="font-black uppercase text-base mt-1">{b.title}</h3>
                <div className="badge-top mt-3" style={{ background: "var(--neon)", color: "#0a2410", borderColor: "#0a2410" }}>{b.cards}</div>
                <p className="text-white/80 text-sm mt-3 leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><CtaButton /></div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="bg-white text-purple-deep py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center font-black uppercase text-xl md:text-2xl mb-10">
            Escolha a melhor opção<br />para você
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Básico */}
            <div className="rounded-2xl border-2 border-purple-deep/20 p-6 flex flex-col shadow-lg bg-white">
              <h3 className="text-center font-black uppercase text-lg">Acesso Básico</h3>
              <p className="text-center text-xs text-purple-deep/70 mt-1">Para quem quer as 210 rodas prontas para imprimir e aplicar.</p>
              <img src={wheel} alt="" loading="lazy" width={512} height={512} className="w-40 h-40 object-cover mx-auto my-4 rounded-xl" />
              <p className="text-center text-xs">✓ 210 Rodas de matemática prontas para imprimir e aplicar (em PDF)</p>
              <div className="text-center my-4">
                <div className="text-sm font-bold">R$</div>
                <div className="text-5xl font-black text-neon-dark leading-none">17,90</div>
                <div className="text-xs mt-1">ou 3X de R$ 6,92 no cartão</div>
              </div>
              <a href={CHECKOUT_BASIC} target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta-hover text-sm w-full">ESCOLHER ACESSO BASICO</a>
              <p className="text-center text-[10px] mt-4 text-purple-deep/70 uppercase">
                Atenção: temos uma oferta ainda mais vantajosa para você! Veja logo abaixo
              </p>
            </div>

            {/* Pro Premium */}
            <div className="relative rounded-2xl border-4 border-neon-dark p-6 flex flex-col shadow-2xl bg-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-top" style={{ background: "var(--orange-badge)", color: "#fff", borderColor: "#2a1300" }}>
                MAIS ESCOLHIDO
              </div>
              <h3 className="text-center font-black uppercase text-lg mt-2">Acesso</h3>
              <h3 className="text-center font-black uppercase text-2xl text-neon-dark">Pro Premium</h3>
              <p className="text-center text-xs text-purple-deep/70 mt-1">Para quem quer as 210 rodas e os 3 bônus para revisar e acompanhar.</p>
              <div className="bg-purple-deep rounded-xl p-3 my-4">
                <div className="text-center text-white text-xs font-bold mb-2">MATERIAL COMPLETO</div>
                <img src={bundle} alt="" loading="lazy" width={1024} height={768} className="w-full rounded-md" />
              </div>
              <div className="text-center my-2">
                <div className="text-sm line-through text-purple-deep/60">R$ 39,90</div>
                <span className="inline-block bg-orange-badge text-white text-xs font-black px-2 py-0.5 rounded">30% OFF</span>
                <div className="text-sm font-bold mt-1">R$</div>
                <div className="text-5xl font-black text-neon-dark leading-none">27,90</div>
                <div className="text-xs mt-1">ou 6X de R$ 6,52 no cartão</div>
              </div>
              <p className="text-center text-[11px] font-bold uppercase mb-3">
                Tudo do ACESSO básico + BONUS EXCLUSIVOS EM PDF (Receba Imediatamente)
              </p>
              <ul className="space-y-1.5 text-xs mb-4">
                {PREMIUM_LIST.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-neon-dark font-black">✓</span>{i}</li>
                ))}
              </ul>
              <a href={CHECKOUT_PRO} target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta-hover text-sm w-full">ESCOLHER ACESSO PRO PREMIUM</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-purple-deep py-14">
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
