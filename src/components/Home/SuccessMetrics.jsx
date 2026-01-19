export default function SuccessMetrics() {
  const metrics = [
    { label: "Verified Caregivers", value: "500+" },
    { label: "Happy Families", value: "2,000+" },
    { label: "Hours of Care", value: "50,000+" },
    { label: "Cities Covered", value: "64" },
  ];

  return (
    <div className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <div key={i} className="text-center text-white">
            <div className="text-4xl md:text-5xl font-black mb-2">{m.value}</div>
            <div className="text-sm md:text-base font-medium opacity-80 uppercase tracking-widest">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
