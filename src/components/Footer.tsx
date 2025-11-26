import { Phone, Mail, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import logo from "figma:asset/e8fff8a3de7d338f958fe988e572cec3eda251bf.png";

// Иконка ВКонтакте
function VKIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.495c.6-.189 1.37 1.26 2.185 1.818.62.423 1.09.33 1.09.33l2.186-.03s1.143-.071.602-1.115c-.044-.085-.319-.67-1.64-1.897-1.385-1.284-1.2-1.076.468-3.298.904-1.048 1.266-1.686 1.153-1.96-.108-.261-.773-.192-.773-.192l-2.46.015s-.183-.025-.318.056c-.131.079-.216.264-.216.264s-.387 1.03-.902 1.906c-1.085 1.849-1.52 1.947-1.697 1.832-.412-.267-.309-1.073-.309-1.645 0-1.788.271-2.533-.527-2.726-.266-.064-.46-.107-1.137-.114-.869-.009-1.604.003-2.02.207-.277.135-.49.437-.36.454.161.021.525.098.718.362.249.34.24 1.104.24 1.104s.143 2.105-.334 2.365c-.328.179-.777-.186-1.742-1.854-.494-.85-.867-1.79-.867-1.79s-.072-.176-.2-.271c-.155-.114-.372-.15-.372-.15l-2.335.015s-.351.01-.48.162c-.114.135-.009.414-.009.414s1.816 4.25 3.873 6.393c1.885 1.966 4.025 1.836 4.025 1.836h.972z"/>
    </svg>
  );
}

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer ref={ref} className="bg-stone-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Позывной: Дом" className="w-12 h-12" />
              <span className="text-xl">ПОЗЫВНОЙ: ДОМ</span>
            </div>
            <p className="text-slate-400">
              Навигатор помощи для вернувшихся бойцов и их семей
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-white mb-4">Контакты</h3>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>+7 (800) 123-45-67</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>info@pozivnoy-dom.ru</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Москва, Россия</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-white mb-4">Разделы</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#soldiers" className="hover:text-white transition-colors">
                  Для бойцов
                </a>
              </li>
              <li>
                <a href="#families" className="hover:text-white transition-colors">
                  Для семей
                </a>
              </li>
              <li>
                <a href="#citizens" className="hover:text-white transition-colors">
                  Для жителей
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Связаться с нами
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-white mb-4">Мы в соцсетях</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="ВКонтакте"
              >
                <VKIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="MAX"
              >
                <span className="text-xs font-bold">MAX</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Телеграм"
              >
                <Send className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="border-t border-stone-800 pt-8 text-center text-stone-400"
        >
          <p>© 2025 Позывной: Дом. Все права защищены.</p>
          <p className="mt-2">
            Платформа создана для помощи вернувшимся бойцам и их семьям
          </p>
        </motion.div>
      </div>
    </footer>
  );
}