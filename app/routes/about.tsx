import { MetaFunction } from "@remix-run/react";


export const meta: MetaFunction = () => {
  return [{ title: "Giới Thiệu - [Tên Webshop]" }];
};

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Giới Thiệu Về Chúng Tôi</h1>
      
      <p className="text-lg text-gray-700 mb-6 text-justify">
        Chúng tôi là nhà cung cấp hàng đầu các sản phẩm camera an ninh dành cho doanh nghiệp, hợp tác trực tiếp với Geovision để mang đến những giải pháp giám sát hiện đại, chất lượng cao.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Sứ Mệnh Của Chúng Tôi</h2>
      <p className="text-lg text-gray-700 mb-6 text-justify">
        Chúng tôi cam kết cung cấp các sản phẩm camera giám sát tiên tiến, giúp doanh nghiệp đảm bảo an toàn, nâng cao hiệu suất quản lý và giám sát tài sản một cách hiệu quả.
      </p>
      
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Tại Sao Chọn Chúng Tôi?</h2>
      <ul className="list-disc pl-8 text-lg text-gray-700 mb-6 text-justify">
        <li className="mb-2">Sản phẩm chất lượng cao từ Geovision với công nghệ tiên tiến.</li>
        <li className="mb-2">Giải pháp tối ưu cho từng loại hình doanh nghiệp.</li>
        <li className="mb-2">Dịch vụ khách hàng tận tâm, hỗ trợ 24/7.</li>
        <li>Giá cả cạnh tranh nhờ hợp tác trực tiếp với nhà cung cấp.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Liên Hệ Với Chúng Tôi</h2>
      <p className="text-lg text-gray-700 mb-2">📧 Email: support@[tenwebshop].com</p>
      <p className="text-lg text-gray-700 mb-2">📞 Hotline: 0123 456 789</p>
      <p className="text-lg text-gray-700">📍 Địa chỉ: Số 123, Đường ABC, Quận XYZ, Thành phố HCM</p>
    </div>
  );
};

export default About;
