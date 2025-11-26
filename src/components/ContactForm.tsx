import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { projectId, publicAnonKey } from "../utils/supabase/info";

export function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    message: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4fefa63c/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setStatusMessage(data.message || "Ваша заявка успешно отправлена!");
        setFormData({
          name: "",
          status: "",
          message: "",
          contact: "",
        });
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || "Произошла ошибка при отправке заявки");
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setSubmitStatus("error");
      setStatusMessage("Не удалось отправить заявку. Проверьте подключение к интернету.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-6 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-stone-900 mb-4">Свяжитесь с нами</h2>
          <p className="text-stone-600">
            Оставьте заявку, и мы свяжемся с вами в ближайшее время
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit} 
          className="bg-slate-50 p-8 rounded-xl border border-slate-200"
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-slate-700 mb-2">
              Ваше имя
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="status" className="block text-slate-700 mb-2">
              Ваш статус
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Выберите статус</option>
              <option value="soldier">Боец</option>
              <option value="family">Член семьи</option>
              <option value="citizen">Житель / Волонтер</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-slate-700 mb-2">
              Суть обращения
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
              placeholder="Опишите, чем мы можем помочь"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="contact" className="block text-slate-700 mb-2">
              Контакты (телефон или email)
            </label>
            <input
              type="text"
              id="contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+7 (___) ___-__-__ или email@example.com"
              required
            />
          </div>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                submitStatus === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {submitStatus === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{statusMessage}</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            className="w-full bg-green-800 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Отправка...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Отправить заявку
              </>
            )}
          </motion.button>

          <p className="text-slate-500 mt-4 text-center">
            Все обращения обрабатываются конфиденциально
          </p>
        </motion.form>
      </div>
    </section>
  );
}