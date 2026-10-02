import { notFound } from 'next/navigation';
import { getProductById } from '@/services/productService';
import ProductDetailContent from '@/app/product/[id]/ProductDetailContent';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let product;
  try {
    product = await getProductById(parseInt(id));
  } catch (error) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
