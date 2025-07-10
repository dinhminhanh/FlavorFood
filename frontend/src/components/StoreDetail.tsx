import { Clock, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import { formatTime } from "../utils/fomatDate";
import { formatCurrency } from "../utils/fomatPrice";
import { formatQuantity } from "../utils/fomatQuantity";
import { removeVietnameseTones } from "../utils/vietnameseUtils";

const highlightSearchTerm = (text: string, searchTerm: string): React.ReactNode => {
  if (!searchTerm) return text;

  const normalizedText = removeVietnameseTones(text).toLowerCase();
  const normalizedSearch = removeVietnameseTones(searchTerm).toLowerCase();

  if (normalizedText.includes(normalizedSearch)) {
    return <span className="text-red-600 font-bold">{text}</span>;
  }

  return text;
};

const StoreDetails: React.FC<{ store: any, searchTerm: string }> = ({ store, searchTerm }) => {
  const [imgError, setImgError] = useState(false);
  store.ingredientSource = [
    {
      name: "Trang trại hữu cơ Organica",
      location: "Đà Lạt",
      type: "Rau củ quả đạt chuẩn hữu cơ",
      certified: true
    },
    {
      name: "Hợp tác xã chăn nuôi An Việt",
      location: "Sơn Tây, Hà Nội",
      type: "Thịt heo và thịt bò sạch",
      certified: true
    },

  ]
  

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{store.name}</h2>
      </div>
      <img
        src={imgError ? '/fallback-image.png' : store.image}
        alt={store.name}
        className="w-full max-w-md h-48 object-cover rounded-lg mb-4"
        onError={() => setImgError(true)}
      />
      {/* <p className="mb-1">{store.description}</p> */}
    
      <h3 className="flex items-center text-lg font-semibold text-black mb-4">
  
  Nguồn nguyên liệu đảm bảo an toàn thực phẩm
</h3>

{store.ingredientSource && store.ingredientSource.length > 0 ? (
  <ul className="space-y-4">
    {store.ingredientSource.map((source: any, index: number) => (
      <li key={index} className="flex items-start">
        {/* <MapPin className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" /> */}
        <div>
          <p className="text-gray-900 font-medium">
            {highlightSearchTerm(source.name, searchTerm)}
          </p>
          <p className="text-sm text-gray-700">
            {source.type} – {source.location}
          </p>
          {source.certified ? (
            <p className="text-xs text-green-700 font-semibold">
              ✅ Đã được chứng nhận an toàn thực phẩm
            </p>
          ) : (
            <p className="text-xs text-gray-500 italic">
              Chưa có chứng nhận chính thức
            </p>
          )}
        </div>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500 italic">Chưa có thông tin về nguồn nguyên liệu.</p>
)}

<p className="mt-4 text-xs text-gray-500 italic">
  * Cửa hàng cam kết chỉ sử dụng nguyên liệu rõ nguồn gốc, kiểm tra định kỳ theo quy định của Bộ Y tế.
</p>


      <div className="flex items-center gap-4 mt-4 mb-2 text-black">
        <MapPin className="text-blue-500 w-10 h-10" />
        <span>Địa chỉ: {store.address}</span>
      </div>

      <div className="flex items-center gap-4 mb-2 text-black">
        <Phone className="text-green-500 w-5 h-5" />
        <span>SĐT: {store.phone_number}</span>
      </div>

      <div className="flex items-center gap-4 mb-2 text-black">
        <Clock className="text-black w-5 h-5" />
        <span>
          Giờ mở cửa: {formatTime(store.openHours)} - {formatTime(store.closeHours)}
        </span>
      </div>

      <h3 className="font-semibold text-xl mt-4 mb-2">Nguyên liệu</h3>
      <table className="w-full table-auto text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Tên</th>
            <th className="py-2 px-4 border-b text-left">Số lượng</th>
            <th className="py-2 px-4 border-b text-left">Giá</th>
          </tr>
        </thead>
        <tbody>
          {store.ingredients
            .slice()
            .sort((a: any, b: any) => {
              const normalizedSearch = removeVietnameseTones(searchTerm).toLowerCase();
              const aMatch = removeVietnameseTones(a.title).toLowerCase().includes(normalizedSearch);
              const bMatch = removeVietnameseTones(b.title).toLowerCase().includes(normalizedSearch);
              return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
            })
            .map((item: any, index: number) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">
                  {highlightSearchTerm(item.title, searchTerm)}
                </td>
                <td className="py-2 px-4">{formatQuantity(item.quantity)}</td>
                <td className="py-2 px-4">{formatCurrency(item.price)}/{item.unit}</td>
              </tr>
            ))}
        </tbody>

      </table>
    </div>
  );
};

export default StoreDetails;
