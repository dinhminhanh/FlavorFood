// Lunch.tsx
import React, { useState } from 'react';
import { Clock, Calculator } from 'lucide-react';
import FilterMenu from '../../../components/FileterMenu'; 
import { useNavigate } from 'react-router-dom';

interface Recipe {
  title: string;
  description: string;
  time: string;
  calories: number;
  imageUrl: string;
  category: string; // Để đảm bảo phân loại
}

// Các công thức món ăn bữa chính
const lunchRecipes: Recipe[] = [
  {
    title: 'Noodle Soup With Shrimps',
    description: 'Savory & Spicy',
    time: '35 minutes',
    calories: 520,
    imageUrl:
      'https://www.sliderrevolution.com/wp-content/uploads/revslider/food-recipe-carousel/dish1-min.png',
    category: 'Bữa chính',
  },
  {
    title: 'Grilled Chicken with Vegetables',
    description: 'Protein Rich & Delicious',
    time: '40 minutes',
    calories: 600,
    imageUrl:
      'https://www.sliderrevolution.com/wp-content/uploads/revslider/food-recipe-carousel/dish2-min.png',
    category: 'Bữa chính',
  },
  {
    title: 'Beef Steak with Potatoes',
    description: 'Classic & Hearty',
    time: '45 minutes',
    calories: 700,
    imageUrl:
      'https://www.sliderrevolution.com/wp-content/uploads/revslider/food-recipe-carousel/dish3-min.png',
    category: 'Bữa chính',
  },
  {
    title: 'Pasta Carbonara',
    description: 'Creamy & Flavorful',
    time: '30 minutes',
    calories: 500,
    imageUrl:
      'https://www.sliderrevolution.com/wp-content/uploads/revslider/food-recipe-carousel/dish4-min.png',
    category: 'Bữa chính',
  },
];

const Lunch: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Bữa chính');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <main className="container mx-auto">
        <div className="relative text-center mt-20">
          <h2 className="text-4xl font-bold mb-2">Các món bữa chính ngon miệng</h2>
          <p className="text-gray-600 text-lg mb-8">
            Khám phá những món ăn bữa chính đầy đủ năng lượng và hấp dẫn
          </p>
        </div>

        {/* Thêm FilterMenu vào đây */}
        <div className="flex justify-center items-center ">
          <FilterMenu activeFilter={activeFilter} setActiveFilter={(filter: string) => {
            setActiveFilter(filter);
            // Điều hướng đến route tương ứng dựa trên filter
            const filterPaths: { [key: string]: string } = {
              'Tất cả': '/meals',
              'Bữa sáng': '/meals/breakfast',
              'Bữa chính': '/meals/lunch',
              'Đồ uống': '/meals/drinks',
              'Tráng miệng': '/meals/dessert',
              'Bữa chay': '/meals/vegetarian',
            };
            navigate(filterPaths[filter] || '/meals');
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {lunchRecipes.map((recipe, index) => (
            <div key={index} className="relative pt-20">
              <div
                className="bg-gradient-to-b from-yellow-50 to-white rounded-lg shadow-lg hover:scale-105 transition-all ease-in-out"
                style={{ height: '400px' }}
              >
                <div className="relative flex justify-center">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full -mt-20 object-cover transform origin-center"
                  />
                </div>

                <div className="p-6 flex flex-col items-center h-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center hover:text-yellow-500 transition-colors duration-300 cursor-pointer line-clamp-2">
                    {recipe.title}
                  </h2>

                  <p className="text-gray-600 text-center mb-4 text-sm">
                    {recipe.description}
                  </p>

                  <div className="border-t border-gray-300 my-4 w-full"></div>

                  <div className="flex justify-between items-center text-gray-500 text-sm w-full">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      <span>{recipe.calories} calories</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Lunch;