import { HandHeart, Building2, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

// Иконка рубля
const RubleIcon = ({ className }: { className?: string }) => (
  <span className={className} style={{ fontSize: '2rem', fontWeight: 'bold' }}>₽</span>
);

interface ForCitizensProps {
  onNavigate: (id: string) => void;
}

export function ForCitizens({ onNavigate }: ForCitizensProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const ways = [
    {
      icon: HandHeart,
      title: "Стать волонтером",
      description: "Помощь с автомобилем, бытовые задачи, сопровождение",
    },
    {
      icon: Building2,
      title: "Предложить работу",
      description: "Бизнес может предоставить вакансии для вернувшихся бойцов",
    },
    {
      icon: Lightbulb,
      title: "Стать экспертом",
      description: "Психологи, юристы и другие специалисты — ваш опыт ценен",
    },
    {
      icon: RubleIcon,
      title: "Поддержать финансово",
      description: "Ваша помощь позволит расширить возможности платформы",
    },
  ];

  return (
    <section id="citizens" ref={ref} className="py-20 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-amber-900 mb-4">Для жителей</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Каждый может внести вклад в возвращение героев к мирной жизни
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {ways.map((way, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-stone-200"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center text-center mt-[0px] mr-[0px] mb-[24px] ml-[0px] leading-none">
                <way.icon className="w-8 h-8 text-amber-900" />
              </div>
              <p className="text-stone-600">{way.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate("contact")}
            className="bg-amber-900 hover:bg-amber-800 text-white px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Присоединиться
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}