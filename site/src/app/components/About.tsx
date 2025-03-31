'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiTarget, FiBriefcase, FiCpu, FiChevronDown } from 'react-icons/fi';

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    otherGender: "",
    phoneNumber: "",
    state: "",
    city: "",
    country: "",
    occupation: "Your Occupation",
    otherOccupation: "",
    interest: [] as string[], // Ensure this is an empty array initially
  });

  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const interests = [
    "AI & Machine Learning",
    "Robotics & Automation",
    "Web & Mobile Development",
    "IoT & Hardware",
    "Cybersecurity",
  ];

  const features = [
    {
      icon: FiBox,
      title: '100+ Innovation Stalls',
      description: 'Explore a vast array of cutting-edge projects, from AI and robotics to sustainable technology solutions.',
    },
    {
      icon: FiCpu,
      title: 'Tech Innovation Hub',
      description: 'Witness groundbreaking innovations from our brightest minds across multiple engineering disciplines.',
    },
    {
      icon: FiBriefcase,
      title: 'Industry Connect',
      description: 'Interact with industry leaders and explore potential collaboration opportunities.',
    },
    {
      icon: FiTarget,
      title: 'Future Tech',
      description: "Experience tomorrow's technology today through interactive demonstrations and workshops.",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          interest: formData.interest.join(", "),
        }),
      });

      if (res.ok) {
        setStatus("Registration successful!");
        setFormData({
          name: '',
          email: '',
          age: '',
          gender: 'Select you gender',
          otherGender: '',
          phoneNumber: '',
          state: '',
          city: '',
          country: '',
          occupation: 'Your Occupation',
          otherOccupation: '',
          interest: [],
        });
      } else {
        setStatus("Failed to register.");
      }
    } catch (error) {
      setStatus("An error occurred.");
      console.error(error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      interest: checked
        ? [...prev.interest, value]
        : prev.interest.filter((item) => item !== value),
    }));
  };

  return (
    // Removed pt-40 and mt-32, using smaller values to reduce the gap
    <div className="relative min-h-screen pt-10 mt-0" id="about">
      {/* Main Content - No background styling as we're using the global background */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#141414] mb-6">
            Innovation Showcase
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Discover a world of innovation at CIT&apos;s largest tech exhibition featuring 100+ stalls of groundbreaking ideas and solutions
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#9EE666]/30 hover:border-[#9EE666]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="bg-[#67B044] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[#9EE666]/30 shadow-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#67B044] mb-2">100+</div>
              <div className="text-gray-600">Innovation Stalls</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#FFE600] mb-2">50+</div>
              <div className="text-gray-600">Live Demos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#67B044] mb-2">20+</div>
              <div className="text-gray-600">Tech Workshops</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#141414] mb-2">2000+</div>
              <div className="text-gray-600">Expected Visitors</div>
            </div>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          id='registration-section'
          className="mt-16 bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-[#9EE666]/30 max-w-2xl mx-auto shadow-sm"
        >
          <h3 className="text-2xl font-bold text-[#67B044] mb-6 text-center">
            Register for Open Day
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name*"
              required
              className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              required
              className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <input
              type='text'
              name='age'
              value={formData.age}
              onChange={handleChange}
              placeholder='Age*'
              required
              className='w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 appearance-none cursor-pointer'
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 appearance-none cursor-pointer"
            >
              <option hidden>Select your Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {formData.gender === 'Other' && (
              <input
                type="text"
                name="otherGender"
                value={formData.otherGender}
                onChange={handleChange}
                placeholder="Please specify"
                className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 appearance-none cursor-pointer"
              />
            )}
            <div className="flex gap-2">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Select State"
              className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 placeholder-gray-400"
            />
            <div className="relative w-full" ref={dropdownRef}>
              {/* Dropdown Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 border flex flex-row justify-between border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 cursor-pointer"
              >
                <span>
                  {formData.interest.length > 0
                    ? formData.interest.join(", ")
                    : "Select Your Interests"}
                </span>
                <FiChevronDown className="w-5 h-5 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute w-full mt-1 bg-white border border-[#9EE666]/40 rounded-lg shadow-lg z-10">
                  <div className="p-2 max-h-48 overflow-y-auto">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center gap-2 p-2 rounded hover:bg-[#9EE666]/10 cursor-pointer">
                        <input
                          type="checkbox"
                          name="interest"
                          value={interest}
                          checked={formData.interest.includes(interest)}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-[#67B044] focus:ring focus:ring-[#67B044]/30"
                        />
                        <span className="text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className='w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 appearance-none cursor-pointer'
            >
              <option hidden>Your Occupation</option>
              <option>Student</option>
              <option>Faculty/Professor</option>
              <option>Researcher</option>
              <option>Industry Professional</option>
              <option>Startup Founder/Entrepreneur</option>
              <option>Government Official</option>
              <option>Investor/Venture Capitalist</option>
              <option>Parent/Guardian</option>
              <option>School Representative {`(Principal/Teacher)`}</option>
              <option>Media/Journalist</option>
              <option>Other</option>
            </select>
            {/* Show Text Input if "Other" is selected */}
            {formData.occupation === 'Other' && (
              <input
                type="text"
                name="otherOccupation"
                value={formData.otherOccupation}
                onChange={handleChange}
                placeholder="Specify your occupation"
                className="w-full p-3 border border-[#9EE666]/40 rounded-lg bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-[#67B044] focus:border-transparent text-gray-700 appearance-none cursor-pointer"
              />
            )}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-lg bg-[#67B044] text-white font-bold text-lg shadow-md transition-all hover:shadow-lg hover:bg-[#67B044]/90"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              REGISTER NOW
            </motion.button>
          </form>
          {status && <p className="mt-4 text-center text-gray-600">{status}</p>}
        </motion.div>
      </div>
    </div>
  );
}