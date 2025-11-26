import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileMenuProps {
  onNavigate: (id: string) => void;
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "soldiers", label: "Для бойцов" },
    { id: "families", label: "Для семей" },
    { id: "citizens", label: "Для жителей" },
    { id: "chat", label: "Чат" },
    { id: "contact", label: "Связаться" },
  ];

  const handleNavigate = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Кнопка меню */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 bg-green-800 text-white p-3 rounded-lg shadow-xl lg:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Затемненный фон */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Панель меню */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-stone-800 shadow-2xl z-40 lg:hidden overflow-y-auto"
            >
              <div className="p-8 pt-20">
                {/* Навигация */}
                <nav className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavigate(item.id)}
                      className="w-full text-left px-4 py-3 rounded-lg text-stone-200 hover:bg-green-800 transition-colors"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}