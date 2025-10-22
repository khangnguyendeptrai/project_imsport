import { useLocation, Link } from "react-router-dom";

const Breadcrumb = ({ data }) => {
  const location = useLocation();
  const currentSlug = location.pathname.replace("/", ""); // ví dụ "/giay" → "giay"

  let breadcrumbItems = [{ name: "Trang chủ", slug: "/" }];

  // Tìm slug cha (ví dụ "donam")
  const parent = data.find(item => item.slug === currentSlug);

  if (parent) {
    // Trường hợp đang ở cấp cha
    breadcrumbItems.push({
      name: parent.categoriesType,
      slug: `/${parent.slug}`,
    });
  } else {
    // Trường hợp là slug con (ví dụ "giay")
    data.forEach(item => {
      const child = item.categories?.find(c => c.slug === currentSlug);
      if (child) {
        breadcrumbItems.push({
          name: item.categoriesType,
          slug: `/${item.slug}`,
        });
        breadcrumbItems.push({
          name: child.name,
          slug: `/${child.slug}`,
        });
      }
    });
  }

  return (
    <div className="container py-3">
      <nav className="text-sm text-gray-600 p-10">
        {breadcrumbItems.map((item, index) => (
          <span key={index}>
            {index > 0 && <span className="mx-2">/</span>} 
            
            {index < breadcrumbItems.length - 1 ? (
              // Link cho các mục cha (ĐÃ BỎ hover:underline)
              <Link 
                to={item.slug} 
                className="text-blue-600 no-underline hover:text-blue-800"
              >
                {item.name}
              </Link>
            ) : (
              // Link cho mục hiện tại (ĐÃ CHUYỂN TỪ <span> SANG <Link>)
              <Link 
                to={item.slug}
                className="text-gray-800 font-medium no-underline"
              >
                {item.name}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;