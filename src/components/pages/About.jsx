import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Users, Globe, Leaf, Sparkles } from "lucide-react";

// Data definitions
const values = [
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Every product is rigorously tested to meet international hospitality standards.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description: "Dedicated account managers ensure personalized service for every client.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving hospitality businesses across 30+ countries with reliable logistics.",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Growing range of eco-friendly products to help you meet green hospitality goals.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
];

const About = () => (
  <main className="min-h-screen bg-white font-sans text-slate-700 antialiased overflow-hidden">
    
    {/* Hero Header */}
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-100 rounded-full"
        >
          About Our Company
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-700 via-slate-800 to-indigo-600 bg-clip-text text-transparent"
        >
          Redefining Hospitality <br className="hidden md:block"/>Standards
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 leading-relaxed"
        >
          Your trusted partner for premium supplies, delivering excellence across continents.
        </motion.p>
      </div>
      
      {/* Decorative Background Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
    </section>

    {/* Main Story Section */}
    <section className="container mx-auto py-12 md:py-1 px-4">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-2 first-letter:float-left first-letter:mt-1">
              Formerly known as Neom Hospitality Supplies LLC, we have been a reliable name in the UAE's hospitality supply industry. With years of experience, we are a trusted wholesale & retail supplier for hotels, resorts, hospitals, restaurants, and various businesses.
            </p>

            {/* Highlight Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-l-4 border-indigo-500 pl-6 py-4 bg-indigo-50/50 rounded-r-xl my-8 flex gap-4 items-start"
            >
              <Sparkles className="w-7 h-7 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-2xl text-slate-900 leading-snug mb-1">
                  Turnkey OSSE Provider
                </h3>
                <p className="text-base text-slate-500">
                  Operating across the GCC & Africa region.
                </p>
              </div>
            </motion.div>

            <p>
              Our local production facility, expedited export to the GCC Region, and commitment to client satisfaction make us a reliable one-stop solution. At Neom, we prioritize quality, innovation, and long-term partnerships.
            </p>
          </div>

          {/* Stats Grid - Fixed Alignment */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
            {[
              { value: "300+", label: "Happy Customer" },
              { value: "150+", label: "Supply Brands" },
              { value: "400+", label: "Products" },
              { value: "100+", label: "Projects Completed" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 tracking-tight">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <motion.img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
              alt="Luxury resort pool"
              className="w-full h-auto object-cover aspect-[4/3]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
          </div>
          
          {/* Decorative background elements */}
          <motion.div 
            initial={{ rotate: 0 }}
            whileInView={{ rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="absolute -bottom-8 -right-8 w-full h-full bg-indigo-100 rounded-2xl z-0"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default About;