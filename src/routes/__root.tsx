import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?inline";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <div className="mt-6">
          <Link to="/" className="btn-cta btn-cta-hover">Voltar ao início</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-cta btn-cta-hover mt-6">Tentar novamente</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "+200 Rodas Matemáticas" },
      { name: "description", content: "Tenha +200 rodas matemáticas preenchíveis, organizadas da Educação Infantil ao 5º ano, para ensinar, praticar e revisar conteúdos sem criar atividades do zero." },
      { property: "og:title", content: "+200 Rodas Matemáticas" },
      { property: "og:description", content: "Tenha +200 rodas matemáticas preenchíveis, organizadas da Educação Infantil ao 5º ano, para ensinar, praticar e revisar conteúdos sem criar atividades do zero." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "+200 Rodas Matemáticas" },
      { name: "twitter:description", content: "Tenha +200 rodas matemáticas preenchíveis, organizadas da Educação Infantil ao 5º ano, para ensinar, praticar e revisar conteúdos sem criar atividades do zero." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/PqSH7qHpLlfy6FxqZg92POUpmnH2/social-images/social-1782322155707-Logo_11zon.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/PqSH7qHpLlfy6FxqZg92POUpmnH2/social-images/social-1782322155707-Logo_11zon.webp" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap",
        media: "print",
        onLoad: "this.media='all'",
      } as any,
    ],
    styles: [{ children: appCss }] as any,
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://cdn.utmify.com.br" />
        <link rel="dns-prefetch" href="https://cdn.utmify.com.br" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  if (window.__utmfyPixelInstalled) return;
  window.__utmfyPixelInstalled = true;

  var UTMFY_PIXEL_ID = "6a39e17a693fbb4e2be2af2c";
  var META_PIXEL_ID = "1044829704880739";
  var UTMFY_SCRIPT_SRC = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
  var UTMFY_EVENTS_PATH = "tracking.utmify.com.br/tracking/v1/events";
  var CHECKOUT_EVENT = "Initiate" + "Checkout";
  var SALE_EVENT = "Pur" + "chase";

  window.pixelId = UTMFY_PIXEL_ID;
  window.__pixelEventsSent = window.__pixelEventsSent || {};
  window.__metaPixelsInitialized = window.__metaPixelsInitialized || {};
  window.__priceSectionViewed = false;

  function eventKey(eventName) {
    if (eventName === "ViewContent") return "viewcontent_precos";
    if (eventName === "Lead") return "lead_qualificado_checkout";
    return String(eventName || "").toLowerCase();
  }

  function shouldBlockFbq(argsLike) {
    var args = Array.prototype.slice.call(argsLike || []);
    var command = args[0];
    var eventName = args[1];

    if (command === "init") {
      if (window.__metaPixelsInitialized[eventName]) return true;
      window.__metaPixelsInitialized[eventName] = true;
      return false;
    }

    if (command === "track" || command === "trackCustom") {
      if (eventName === CHECKOUT_EVENT || eventName === SALE_EVENT) return true;
      if (eventName === "ViewContent" && !window.__priceSectionViewed) return true;

      var key = eventKey(eventName);
      if (window.__pixelEventsSent[key]) return true;
      window.__pixelEventsSent[key] = true;
    }

    return false;
  }

  function installFbqGuards() {
    if (typeof window.fbq !== "function") return;

    if (window.fbq.queue && !window.fbq.queue.__utmfyGuarded) {
      var originalPush = window.fbq.queue.push;
      window.fbq.queue.push = function () {
        if (shouldBlockFbq(arguments[0])) return this.length;
        return originalPush.apply(this, arguments);
      };
      window.fbq.queue.__utmfyGuarded = true;
    }

    if (window.fbq.callMethod && !window.fbq.__utmfyCallMethodGuarded) {
      var originalCallMethod = window.fbq.callMethod;
      window.fbq.callMethod = function () {
        if (shouldBlockFbq(arguments)) return;
        return originalCallMethod.apply(this, arguments);
      };
      window.fbq.__utmfyCallMethodGuarded = true;
    }
  }

  if (typeof window.fbq !== "function") {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  }

  installFbqGuards();
  window.fbq("init", META_PIXEL_ID);

  var guardTimer = setInterval(installFbqGuards, 50);
  setTimeout(function () {
    clearInterval(guardTimer);
    installFbqGuards();
  }, 10000);

  if (window.fetch && !window.fetch.__utmfyGuarded) {
    var originalFetch = window.fetch;
    var guardedFetch = function (input, init) {
      try {
        var url = typeof input === "string" ? input : input && input.url;
        var body = init && init.body;

        if (url && url.indexOf(UTMFY_EVENTS_PATH) !== -1 && body) {
          var payload = JSON.parse(body);
          var type = payload && payload.type;
          var blocked = type === CHECKOUT_EVENT || type === SALE_EVENT || (type === "ViewContent" && !window.__priceSectionViewed);

          if (blocked) {
            return Promise.resolve(new Response(JSON.stringify({
              lead: { _id: null },
              event: { _id: null },
              sendWebEvents: false
            }), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            }));
          }
        }
      } catch (error) {}

      return originalFetch.apply(this, arguments);
    };

    guardedFetch.__utmfyGuarded = true;
    window.fetch = guardedFetch;
  }

  function firePixelOnce(key, eventName, params) {
    if (window.__pixelEventsSent[key]) return;

    function sendEvent() {
      installFbqGuards();
      if (typeof window.fbq === "function") {
        window.fbq("track", eventName, params || {});
        return !!window.__pixelEventsSent[key];
      }
      return false;
    }

    if (!sendEvent()) {
      var attempts = 0;
      var waitForPixel = setInterval(function () {
        attempts++;
        if (sendEvent() || attempts >= 20) clearInterval(waitForPixel);
      }, 150);
    }
  }

  firePixelOnce("pageview", "PageView", {
    page_location: window.location.href,
    page_title: document.title
  });

  if (!document.querySelector('script[src="' + UTMFY_SCRIPT_SRC + '"]')) {
    var a = document.createElement("script");
    a.setAttribute("async", "");
    a.setAttribute("defer", "");
    a.setAttribute("src", UTMFY_SCRIPT_SRC);
    document.head.appendChild(a);
  }

  document.addEventListener("click", function (e) {
    var target = e.target;
    var link = target && target.closest ? target.closest(".checkout-link") : null;
    if (!link) return;

    var url = link.getAttribute("data-checkout-url") || link.getAttribute("href");
    if (!url || url === "#") return;

    e.preventDefault();
    e.stopImmediatePropagation();

    firePixelOnce("lead_qualificado_checkout", "Lead", {
      content_name: "Lead Qualificado",
      content_category: "Clique para Checkout",
      lead_type: "qualified_checkout_click",
      page_location: window.location.href
    });

    setTimeout(function () {
      window.location.href = url;
    }, 200);
  }, true);

  document.addEventListener("DOMContentLoaded", function () {
    var priceSection = document.getElementById("secao-precos");

    if (priceSection && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            window.__priceSectionViewed = true;
            firePixelOnce("viewcontent_precos", "ViewContent", {
              content_name: "Sessao de Precos",
              content_category: "Landing Page",
              page_location: window.location.href
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.35 });

      observer.observe(priceSection);
    }

  });
})();
            `.trim(),
          }}
        />
        <HeadContent />
      </head>
      <body>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1044829704880739&ev=PageView&noscript=1" alt="" />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
