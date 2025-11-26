import { FileCheck, UserCheck, Link2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileCheck,
      title: "Заявка",
      description: "Заполните простую форму обращения на платформе",
      number: "01",
    },
    {
      icon: UserCheck,
      title: "Проверка куратором",
      description: "Куратор проверяет заявку и определяет нужный тип помощи",
      number: "02",
    },
    {
      icon: Link2,
      title: "Соединение с ресурсом",
      description: "Вас соединяют с нужным специалистом или волонтером",
      number: "03",
    },
    {
      icon: CheckCircle,
      title: "Решение проблемы",
      description: "Получаете необходимую помощь быстро и конфиденциально",
      number: "04",
    },
  ];

  return (
    <section className="py-20 px-6 bg-stone-900 text-white" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-white mb-4">Как это работает</h2>
          <p className="text-stone-300 max-w-2xl mx-auto">
            Простой и понятный процесс получения помощи
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-stone-800 p-8 rounded-xl border border-stone-700 hover:border-green-700 transition-all duration-300"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-green-800 rounded-full flex items-center justify-center"
                >
                  <span>{step.number}</span>
                </motion.div>
                
                <div className="w-16 h-16 bg-green-900/50 rounded-lg flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-green-400" />
                </div>
                
                <p className="text-stone-400">{step.description}</p>
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                  className="hidden lg:block absolute top-1/2 -right-8 w-8 h-0.5 bg-green-800 z-10 origin-left"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}