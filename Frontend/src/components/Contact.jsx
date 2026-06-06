import React,{useState} from "react";
import { MapPin, Mail, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 px-6 py-23"
    >
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 md:p-12 grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <span className="px-4 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
            Get In Touch
          </span>

          <h2 className="text-3xl font-bold mt-4 text-gray-800">
            Let's Connect
          </h2>

          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl">
              <MapPin className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Location</h4>
              <p className="text-gray-500">Anand, Gujarat, India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-xl">
              <Mail className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Email</h4>
              <p className="text-gray-500">FinMatrix.support@gmail.com</p>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-300 outline-none"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-300 outline-none"
            />
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-300 outline-none resize-none"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
