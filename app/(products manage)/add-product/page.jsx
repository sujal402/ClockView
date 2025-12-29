import AddProductPage from '../../../components/add-product-form.jsx';
import { pageSEO } from '../../../lib/SEO.tsx';

export const metadata = pageSEO({
  title: "Add Product - Manage Products",
  path: "/add-product",
});


export default function AddProduct() {
 return <AddProductPage />;
}
