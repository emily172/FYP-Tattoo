function Testimonials() {
  const testimonials = [
    { id: 1, name: 'Mary Collins', text: 'Amazing artistry and attention to detail!' },
    { id: 2, name: 'Jane Flynn', text: 'A wonderful experience from start to finish.' },
    { id: 3, name: 'Michael McCarthy', text: 'Highly recommend their talented team!' },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <h2 className="text-4xl font-extrabold text-center text-white mb-12">
        What Our <span className="text-indigo-500">Clients Say</span>
      </h2>

      {/* Enhanced Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="group bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 p-6 text-center"
          >
            {/* Gradient Overlay for Text */}
            <div className="relative">
              <p className="italic text-gray-300 group-hover:text-indigo-400 transition-colors">
                "{testimonial.text}"
              </p>
            </div>
            {/* Name Styling */}
            <h3 className="mt-4 font-bold text-white group-hover:text-indigo-400 transition-colors">
              - {testimonial.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
