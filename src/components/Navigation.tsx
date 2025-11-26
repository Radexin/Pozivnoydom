import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface NavigationProps {
  onNavigate: (id: string) => void;
  onOpenAccessibility: () => void;
}

export function Navigation({ onNavigate, onOpenAccessibility }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 bg-stone-800/95 backdrop-blur-sm shadow-md z-40 hidden lg:block"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-8">
          {/* Навигационные ссылки */}
          <button
            onClick={() => onNavigate("soldiers")}
            className="text-stone-200 hover:text-green-400 transition-colors"
          >
            Для бойцов
          </button>
          <button
            onClick={() => onNavigate("families")}
            className="text-stone-200 hover:text-green-400 transition-colors"
          >
            Для семей
          </button>
          <button
            onClick={() => onNavigate("citizens")}
            className="text-stone-200 hover:text-green-400 transition-colors"
          >
            Для жителей
          </button>
          <button
            onClick={() => onNavigate("chat")}
            className="text-stone-200 hover:text-green-400 transition-colors"
          >
            Чат
          </button>

          {/* Кнопка доступности */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAccessibility}
            className="flex items-center gap-2 bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Доступность</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}