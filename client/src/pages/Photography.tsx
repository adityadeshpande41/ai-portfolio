import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";

const photographyPhotos = [
  {
    id: 1,
    image: "/images/P1.jpg",
    title: "Light & Shadow",
    location: "Capturing moments"
  },
  {
    id: 2,
    image: "/images/P2.jpg",
    title: "Perspective",
    location: "Finding beauty"
  },
  {
    id: 3,
    image: "/images/P3.jpg",
    title: "Composition",
    location: "Through the lens"
  },
  {
    id: 4,
    image: "/images/P4.jpg",
    title: "Essence",
    location: "Frozen in time"
  }
];

export default function Photography() {
  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Photography
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Capturing the interplay of light and shadow, one frame at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {photographyPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-[4/5] hover:border-blue-500/30 transition-all"
            >
              <img 
                src={photo.image} 
                alt={photo.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{photo.title}</h3>
                <p className="text-sm text-zinc-300">{photo.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
