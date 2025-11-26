import { MessageCircle, GraduationCap, Home, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface ForFamiliesProps {
  onNavigate: (id: string) => void;
}

export function ForFamilies({ onNavigate }: ForFamiliesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: MessageCircle,
      title: "Консультации для близких",
      description: "Психологическая поддержка супругов, родителей и родственников",
    },
    {
      icon: GraduationCap,
      title: "Помощь детям",
      description: "Детские психологи, репетиторы и развивающие программы",
    },
    {
      icon: Home,
      title: "Адресная бытовая помощь",
      description: "Помощь от волонтеров в решении повседневных задач",
    },
    {
      icon: FileText,
      title: "Юридическая поддержка",
      description: "Консультации по семейным и социальным вопросам",
    },
  ];

  return (
    <section id="families" ref={ref} className="py-20 px-6 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-stone-800 mb-4">Для семей</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Комплексная поддержка для тех, кто ждет и поддерживает
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
              className="bg-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 border border-stone-200"
            >
              <div className="w-16 h-16 bg-stone-200 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-stone-700" />
              </div>
              <p className="text-stone-600">{service.description}</p>
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
            className="bg-stone-700 hover:bg-stone-600 text-white px-10 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Запросить поддержку
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}