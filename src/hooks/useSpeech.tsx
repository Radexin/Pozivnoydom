import { useEffect } from "react";

export function useSpeech() {
  useEffect(() => {
    let speechEnabled = false;

    // Функция для проверки настроек
    const checkSettings = () => {
      const settings = localStorage.getItem("accessibilitySettings");
      speechEnabled = settings ? JSON.parse(settings).speechEnabled : false;
    };

    // Проверяем настройки при монтировании
    checkSettings();

    // Слушаем изменения настроек
    const handleSettingsChange = () => {
      checkSettings();
    };

    window.addEventListener("speechSettingsChanged", handleSettingsChange);

    const speak = (text: string) => {
      if (!speechEnabled) return;
      
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    };

    // Озвучка при выделении текста
    const handleSelection = () => {
      if (!speechEnabled) return;
      
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      if (selectedText && selectedText.length > 0) {
        speak(selectedText);
      }
    };

    // Озвучка кнопок и ссылок при наведении
    const handleMouseOver = (e: MouseEvent) => {
      if (!speechEnabled) return;
      
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A") {
        const text = target.textContent?.trim() || target.getAttribute("aria-label") || "";
        if (text) {
          speak(text);
        }
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("speechSettingsChanged", handleSettingsChange);
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);
}