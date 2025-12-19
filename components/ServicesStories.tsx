import Image from "next/image";

type Props = {
  whatsappNumber?: string;
};

const services = [
  {
    title: "Software Development",
    description: "Custom web and mobile applications built for performance and scalability.",
    image: "/services/software-development.jpg",
    message: "Hi! I'm interested in your Software Development service.",
  },
  {
    title: "Security Systems",
    description: "Advanced security solutions including alarms, access control and fire systems.",
    image: "/services/security-systems.jpg",
    message: "Hi! I'm interested in your Security Systems service.",
  },
  {
    title: "Monitoring Systems",
    description: "CCTV, IP cameras and smart monitoring for homes and businesses.",
    image: "/services/monitoring-systems.jpg",
    message: "Hi! I'm interested in your Monitoring Systems service.",
  },
];

export default function ServicesStories({ whatsappNumber }: Props) {
  const waBase =
    whatsappNumber && whatsappNumber.trim().length > 0
      ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`
      : null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Professional Services</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-3">
          High-quality professional services delivered by experienced specialists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => {
          const waLink = waBase
            ? `${waBase}?text=${encodeURIComponent(service.message)}`
            : null;

          return (
            <div
              key={service.title}
              className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
            >
              <div className="relative h-56">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-5">{service.description}</p>

                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-full px-5 py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Request on WhatsApp
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
