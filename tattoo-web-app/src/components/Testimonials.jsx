function Testimonials() {
    const testimonials = [
      { id: 1, name: 'John Doe', text: 'Amazing artistry and attention to detail!' },
      { id: 2, name: 'Jane Smith', text: 'A wonderful experience from start to finish.' },
      { id: 3, name: 'Sam Wilson', text: 'Highly recommend their talented team!' },
    ];
  
    return (
      <div className="p-8 bg-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          What Our <span className="text-indigo-500">Clients Say</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <p className="italic text-gray-600">"{testimonial.text}"</p>
              <h3 className="mt-4 font-bold text-gray-800">- {testimonial.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Testimonials;
  