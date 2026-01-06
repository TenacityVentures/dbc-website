'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-4 pt-16"
        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Dream Big for Children
          </h1>
          <p
            className="text-2xl md:text-3xl mb-4 font-semibold"
            style={{ color: 'var(--secondary)' }}
          >
            Empowering Young Lives
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            A community-based organization supporting vulnerable children, families, and youth in Sierra Leone through education, protection, and sustainable development.
          </p>
          <a
            href="#donate"
            className="inline-block px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--primary)',
            }}
          >
            Support Our Mission
          </a>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Who We Are"
            subtitle="Dream Big for Children Organization (DBC) is a community-based, non-profit organization established in 2022 in Sierra Leone."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg text-center max-w-4xl mx-auto"
          >
            <p className="mb-4">
              We work with vulnerable children, families, women, and youth to improve child well-being and strengthen families through education, child protection, and sustainable community development.
            </p>
            <p>
              Our work focuses on supporting vulnerable children within their families and communities so they can grow in safe, caring, and supportive environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-8 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Our Vision
              </h3>
              <p className="text-lg">
                A Sierra Leone where every child has the opportunity to thrive, learn, and reach their full potential.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8 bg-white rounded-lg shadow-lg"
            >
              <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Our Mission
              </h3>
              <p className="text-lg">
                To improve the lives of deprived and vulnerable children and families through education support, child protection, economic empowerment, and sustainable community development.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Core Values"
            subtitle="Principles that guide everything we do"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Child-centred care', desc: 'The best interests of the child guide all our actions' },
              { title: 'Accountability and transparency', desc: 'We act responsibly and ethically' },
              { title: 'Community participation', desc: 'Communities are partners in change' },
              { title: 'Equity and inclusion', desc: 'Every child deserves equal opportunity' },
              { title: 'Sustainability', desc: 'We promote long-term, self-reliant solutions' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
                  {value.title}
                </h4>
                <p className="text-gray-700">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section id="programs" className="py-20 px-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Focus Areas"
            subtitle="Comprehensive programs that create lasting impact"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Education',
                desc: 'We support most vulnerable children with school materials, follow-up, and encouragement to ensure they stay in school and succeed.',
                icon: '📚',
              },
              {
                title: 'Child Protection',
                desc: 'We work with families and communities to protect children, prevent abuse, and promote family-based care.',
                icon: '🛡️',
              },
              {
                title: 'Health & Well-being',
                desc: 'We promote child nutrition, psychosocial well-being, and healthy development through community support.',
                icon: '💚',
              },
              {
                title: 'Empowerment & Collaboration',
                desc: 'We empower the most vulnerable families through skills training and livelihoods support and collaborate with partners to create sustainable impact.',
                icon: '🤝',
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{area.icon}</div>
                <h4 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                  {area.title}
                </h4>
                <p className="text-gray-700 text-lg">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Impact"
            subtitle="Making a difference in communities across Sierra Leone"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '40+', label: 'Children Supported Annually' },
              { number: '5', label: 'Communities Engaged' },
              { number: '300+', label: 'Community Members Impacted' },
              { number: '2022', label: 'Year Established' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
              >
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: 'var(--secondary)' }}
                >
                  {stat.number}
                </div>
                <div className="text-lg" style={{ color: 'var(--primary)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Partner With Us"
            subtitle="Dream Big for Children Organization welcomes partnerships with organizations, institutions, and individuals who share our commitment to child protection, family strengthening, and sustainable development."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h4 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
              We seek partnerships that support:
            </h4>
            <ul className="text-left text-lg space-y-3 max-w-2xl mx-auto mb-8">
              <li>✓ Family strengthening and child protection</li>
              <li>✓ Education and child development</li>
              <li>✓ Economic empowerment and livelihoods</li>
              <li>✓ Capacity building and learning</li>
            </ul>
            <p className="text-xl font-semibold" style={{ color: 'var(--accent)' }}>
              Together, we can create lasting change for children and families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title="Support Our Work"
            subtitle="Your support helps us provide education materials, strengthen families, and protect vulnerable children."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            <p className="text-xl mb-8">
              Every contribution—big or small—helps a child stay in school, a family become stronger, and a community grow.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: 'var(--secondary)',
                color: 'var(--primary)',
              }}
            >
              Contact Us to Donate
            </a>
            <p className="text-sm mt-6 opacity-80">
              (Online donation options will be added soon)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4" style={{ backgroundColor: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Get In Touch"
            subtitle="Have questions or want to partner with us? We would love to hear from you."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-8 text-lg">
              <div>
                <h4 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                  Address
                </h4>
                <p>Simbaru-2, Hanci Road</p>
                <p>Bo, Sierra Leone</p>
              </div>
              <div>
                <h4 className="font-bold mb-2" style={{ color: 'var(--primary)' }}>
                  Contact
                </h4>
                <p>
                  <strong>Phone:</strong> +232 76 762965
                </p>
                <p>
                  <strong>Email:</strong> mohamedskillz32@gmail.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
