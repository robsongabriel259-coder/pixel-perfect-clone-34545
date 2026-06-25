import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?inline";

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


const UTMIFY_PIXEL_SCRIPT = `window.pixelId = "6a3c8e30b967e34a5ea4e208";
var a = document.createElement("script");
a.setAttribute("async", "");
a.setAttribute("defer", "");
a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
document.head.appendChild(a);`;

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: UTMIFY_PIXEL_SCRIPT }} />
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        ></script>
      </head>
      <body>
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
