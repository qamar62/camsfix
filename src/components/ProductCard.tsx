import { Check } from 'lucide-react';

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  features: string[];
}

export default function ProductCard({ title, image, price, features }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">{price}</p>
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
              <Check className="h-5 w-5 text-blue-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}