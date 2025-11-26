import { Heart, Scale, Briefcase, Users } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface ForSoldiersProps {
  onNavigate: (id: string) => void;
}

export function ForSoldiers({ onNavigate }: ForSoldiersProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Heart,
      title: "Психологическая поддержка",
      description: "Анонимные чаты, группы поддержки и профессиональные консультации",
    },
    {
      icon: Scale,
      title: "Юридическая помощь",
      description: "Получение статуса, льготы, консультации по правовым вопросам",
    },
    {
      icon: Briefcase,
      title: "Помощь в трудоустройстве",
      description: "Вакансии от партнеров, программы переобучения и развития",
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Общение с теми, кто понимает. Братство и взаимная поддержка",
    },
  ];

  return (
    <section id="soldiers" ref={ref} className="py-20 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-green-900 mb-4">Для бойцов</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Шаг за шагом помогаем вернуться к полноценной жизни
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-slate-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-slate-200"
            >
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-green-800" />
              </div>
              <p className="text-slate-600">{service.description}</p>
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
            className="bg-green-800 hover:bg-green-700 text-white px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Получить помощь
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}