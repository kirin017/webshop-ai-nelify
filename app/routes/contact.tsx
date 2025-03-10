import { MetaFunction } from "@remix-run/react";


export const meta: MetaFunction = () => {
  return [{ title: "Liên Hệ - [Tên Webshop]" }];
};

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Liên Hệ</h1>
      
      <p className="text-lg text-gray-700 mb-6 text-justify">
        Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi. Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn!
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Thông Tin Liên Hệ</h2>
      <p className="text-lg text-gray-700 mb-2">📧 Email: support@[tenwebshop].com</p>
      <p className="text-lg text-gray-700 mb-2">📞 Hotline: 0123 456 789</p>
      <p className="text-lg text-gray-700 mb-6">📍 Địa chỉ: Số 123, Đường ABC, Quận XYZ, Thành phố HCM</p>

    </div>
  );
};

export default Contact;