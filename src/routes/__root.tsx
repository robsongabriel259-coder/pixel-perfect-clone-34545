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
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" />
        <link rel="dns-prefetch" href="https://cdn.utmify.com.br" />
        {/* Meta Pixel Base */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
var LANDING_META_PIXEL_ID = '1044829704880739';

window.__landingMetaPixelInitialized = false;
window.__landingMetaEventsSent = window.__landingMetaEventsSent || {};
window.__landingMetaManualCall = false;

window.__sendLandingMetaBeacon = function(eventName, params, eventId) {
  try {
    var query = new URLSearchParams({
      id: LANDING_META_PIXEL_ID,
      ev: eventName,
      dl: window.location.href,
      rl: document.referrer || '',
      if: 'false',
      ts: String(Date.now()),
      sw: String(window.screen && window.screen.width ? window.screen.width : ''),
      sh: String(window.screen && window.screen.height ? window.screen.height : ''),
      v: '2.9.345',
      r: 'stable',
      eid: eventId
    });

    if (params) {
      Object.keys(params).forEach(function(key) {
        if (params[key] !== undefined && params[key] !== null) {
          query.append('cd[' + key + ']', String(params[key]));
        }
      });
    }

    new Image(1, 1).src = 'https://www.facebook.com/tr?' + query.toString();
  } catch (error) {}
};

window.__shouldBlockLandingFbqCall = function(args) {
  var command = args && args[0];
  var value = args && args[1];

  if (command === 'init' && value === LANDING_META_PIXEL_ID && window.__landingMetaPixelInitialized) {
    return true;
  }

  if (command === 'track' && (value === 'InitiateCheckout' || value === 'Purchase')) {
    return true;
  }

  if (
    !window.__landingMetaManualCall &&
    command === 'track' &&
    window.__landingMetaEventsSent &&
    window.__landingMetaEventsSent[value]
  ) {
    return true;
  }

  return false;
};

window.__trackLandingMeta = function(eventName, params) {
  if (window.__landingMetaEventsSent[eventName]) return;

  var eventId = 'lp_' + eventName + '_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  window.__landingMetaEventsSent[eventName] = true;

  try {
    if (typeof window.fbq === 'function') {
      window.__landingMetaManualCall = true;
      window.fbq('track', eventName, params || {}, { eventID: eventId });
      window.__landingMetaManualCall = false;
    }
  } catch (error) {
    window.__landingMetaManualCall = false;
  }

  window.__sendLandingMetaBeacon(eventName, params || {}, eventId);
};

!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){
    n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
  };
  if(!f._fbq)f._fbq=n;
  n.push=n;
  n.loaded=!0;
  n.version='2.0';
  n.queue=[];
  t=b.createElement(e);
  t.async=!0;
  t.src=v;
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s);
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

if (window.fbq && window.fbq.queue) {
  var landingOriginalQueuePush = window.fbq.queue.push.bind(window.fbq.queue);
  window.fbq.queue.push = function(args) {
    if (window.__shouldBlockLandingFbqCall(args)) return window.fbq.queue.length;
    return landingOriginalQueuePush(args);
  };
}

fbq('init', '1044829704880739');
window.__landingMetaPixelInitialized = true;

(function waitForLandingFbqCallMethod() {
  var attempts = 0;
  var interval = setInterval(function() {
    attempts += 1;

    if (window.fbq && window.fbq.callMethod && !window.fbq.__landingDeduped) {
      var originalCallMethod = window.fbq.callMethod;
      window.fbq.callMethod = function() {
        if (window.__shouldBlockLandingFbqCall(arguments)) return;
        return originalCallMethod.apply(window.fbq, arguments);
      };
      window.fbq.__landingDeduped = true;
      clearInterval(interval);
    }

    if (attempts >= 80) clearInterval(interval);
  }, 50);
})();

window.__trackLandingMeta('PageView');
`.trim(),
          }}
        />
        {/* UTMFY Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.pixelId = "6a39e17a693fbb4e2be2af2c";
var utmfyScript = document.createElement("script");
utmfyScript.setAttribute("async", "");
utmfyScript.setAttribute("defer", "");
utmfyScript.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
document.head.appendChild(utmfyScript);
`.trim(),
          }}
        />
        {/* UTMFY UTMs */}
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
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
