import { useState, useEffect } from "react";
import { Volume2, Eye, Type, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AccessibilitySettings {
  fontSize: "normal" | "large" | "xlarge";
  colorScheme: "normal" | "highContrast" | "inverted";
  speechEnabled: boolean;
}

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessibilityMenu({ isOpen, onClose }: AccessibilityMenuProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: "normal",
    colorScheme: "normal",
    speechEnabled: false,
  });

  // Загрузка настроек из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("accessibilitySettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // Применение настроек
  useEffect(() => {
    localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
    
    // Применяем размер шрифта
    document.documentElement.setAttribute("data-font-size", settings.fontSize);
    
    // Применяем цветовую схему
    document.documentElement.setAttribute("data-color-scheme", settings.colorScheme);
    
    // Триггерим событие для обновления озвучки
    window.dispatchEvent(new CustomEvent("speechSettingsChanged", { detail: settings }));
  }, [settings]);

  const speak = (text: string) => {
    if (!settings.speechEnabled) return;
    
    // Останавливаем предыдущее воспроизведение
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const changeFontSize = (size: "normal" | "large" | "xlarge") => {
    setSettings({ ...settings, fontSize: size });
    speak(`Размер шрифта изменён на ${size === "normal" ? "обычный" : size === "large" ? "большой" : "очень большой"}`);
  };

  const changeColorScheme = (scheme: "normal" | "highContrast" | "inverted") => {
    setSettings({ ...settings, colorScheme: scheme });
    speak(`Цветовая схема изменена на ${scheme === "normal" ? "обычную" : scheme === "highContrast" ? "высокий контраст" : "инвертированную"}`);
  };

  const toggleSpeech = () => {
    const newState = !settings.speechEnabled;
    setSettings({ ...settings, speechEnabled: newState });
    if (newState) {
      speak("Озвучка включена. Теперь при наведении на кнопки и выделении текста будет воспроизводиться озвучка");
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* Панель меню доступности */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Затемненный фон */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Панель настроек */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Заголовок */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                  <h2 className="text-slate-900">Настройки доступности</h2>
                  <button
                    onClick={onClose}
                    onMouseEnter={() => speak("Закрыть меню")}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Закрыть"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Озвучка */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Volume2 className="w-6 h-6 text-green-800" />
                    <h3 className="text-slate-900">Озвучка</h3>
                  </div>
                  <button
                    onClick={toggleSpeech}
                    className={`w-full px-4 py-3 rounded-lg transition-all ${
                      settings.speechEnabled
                        ? "bg-green-800 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {settings.speechEnabled ? "Озвучка включена" : "Озвучка выключена"}
                  </button>
                </div>

                {/* Размер шрифта */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Type className="w-6 h-6 text-green-800" />
                    <h3 className="text-slate-900">Размер шрифта</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => changeFontSize("normal")}
                      className={`w-full px-4 py-3 rounded-lg transition-all text-left ${
                        settings.fontSize === "normal"
                          ? "bg-green-800 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Обычный (100%)
                    </button>
                    <button
                      onClick={() => changeFontSize("large")}
                      className={`w-full px-4 py-3 rounded-lg transition-all text-left ${
                        settings.fontSize === "large"
                          ? "bg-green-800 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Большой (125%)
                    </button>
                    <button
                      onClick={() => changeFontSize("xlarge")}
                      className={`w-full px-4 py-3 rounded-lg transition-all text-left ${
                        settings.fontSize === "xlarge"
                          ? "bg-green-800 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Очень большой (150%)
                    </button>
                  </div>
                </div>

                {/* Цветовая схема */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-green-800" />
                    <h3 className="text-slate-900">Цветовая схема</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => changeColorScheme("normal")}
                      className={`w-full px-4 py-3 rounded-lg transition-all text-left ${
                        settings.colorScheme === "normal"
                          ? "bg-green-800 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Обычная
                    </button>
                    <button
                      onClick={() => changeColorScheme("highContrast")}
                      className={`w-full px-4 py-3 rounded-lg transition-all text-left ${
                        settings.colorScheme === "highContrast"
                          ? "bg-green-800 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Высокий контраст
                    </button>
                    <button
                      onClick={() => changeColorScheme("inverted")}
                      className={`w-full px-4 py-3 rounded-lg transition-all text-left ${
                        settings.colorScheme === "inverted"
                          ? "bg-green-800 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      Инвертированные цвета
                    </button>
                  </div>
                </div>

                {/* Информация */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-slate-700">
                    Настройки сохраняются автоматически и будут применены при следующем посещении сайта.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}