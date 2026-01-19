export const metadata = {
  title: "Contact Us | CareHub",
  description: "Get in touch with CareHub for any questions or support.",
};

export default function ContactPage() {
  return (
    <div className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-3xl shadow-xl">
          <h1 className="text-4xl font-bold font-serif text-primary mb-6">Get in Touch</h1>
          <p className="text-gray-600 mb-8">
            Have questions about our services or need help booking a caregiver? Our support team is here for you 24/7.
          </p>
          
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input type="text" placeholder="John Doe" className="input input-bordered w-full focus:input-primary" />
              </div>
              <div className="form-control">
                <label className="label">Email</label>
                <input type="email" placeholder="john@example.com" className="input input-bordered w-full focus:input-primary" />
              </div>
            </div>
            <div className="form-control">
              <label className="label">Subject</label>
              <input type="text" placeholder="General Inquiry" className="input input-bordered w-full focus:input-primary" />
            </div>
            <div className="form-control">
              <label className="label">Message</label>
              <textarea placeholder="How can we help you?" className="textarea textarea-bordered h-32 focus:textarea-primary"></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block rounded-full text-white mt-4">Send Message</button>
          </form>
        </div>
        
        <div className="flex flex-col justify-center space-y-8">
          <div className="bg-primary text-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Support Center</h3>
            <p className="opacity-90 mb-6">Our dedicated team is ready to assist you with any inquiries or issues you may have. Contact us via phone, email, or visit our office.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">📞</div>
                <span>+880 1234 567 890</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">✉️</div>
                <span>info@carehub.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">📍</div>
                <span>123 Care Street, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary p-8 rounded-3xl shadow-lg text-white">
            <h3 className="text-2xl font-bold mb-2">Emergency?</h3>
            <p className="opacity-90">Call our 24/7 emergency hotline for immediate assistance.</p>
            <div className="text-3xl font-black mt-4">+880 999 111 222</div>
          </div>
        </div>
      </div>
    </div>
  );
}
