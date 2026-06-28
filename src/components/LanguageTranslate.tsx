import { useEffect } from "react";
import { Globe2 } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: {
          new (
            options: {
              pageLanguage: string;
              autoDisplay: boolean;
              layout?: unknown;
            },
            element: string
          ): void;
          InlineLayout?: {
            SIMPLE: unknown;
          };
        };
      };
    };
  }
}

export default function LanguageTranslate() {
  useEffect(() => {
    if (document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) {
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout?.SIMPLE,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="language-translate relative flex h-12 items-center gap-2 rounded-full bg-white/80 px-3 text-fizzi-dark-purple shadow-[0_14px_28px_rgba(45,31,62,0.14)] ring-1 ring-fizzi-dark-purple/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white dark:bg-fizzi-dark-purple/85 dark:text-white dark:ring-white/20">
      <Globe2 className="h-5 w-5 shrink-0 text-fizzi-coral" />
      <div id="google_translate_element" className="min-w-[112px]" />
    </div>
  );
}
