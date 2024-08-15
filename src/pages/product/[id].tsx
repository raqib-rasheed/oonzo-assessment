import Image from 'next/image';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>Onzoo - {product.title}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta
          property="og:description"
          content={product.description}
        />
        <meta property="og:image" content={product.image} />
        <meta
          property="og:url"
          content={`https://yourdomain.com/product/${product.title}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta
          name="twitter:description"
          content={product.description}
        />
        <meta name="twitter:image" content={product.image} />
      </Head>
      <div className="bg-white min-h-screen p-8">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6 bordered">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
              <div className="flex space-x-4 mt-4">
                <button className="w-16 h-16 p-1 border border-gray-300 rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="object-cover rounded-lg"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-800">
                  {product.title}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  ${product.price}
                </p>
                <div className="flex items-center mt-4">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.round(product.rating.rate)
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.926c.969 0 1.371 1.24.588 1.81l-3.983 2.897a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.983-2.897a1 1 0 00-1.176 0l-3.983 2.897c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.465 9.101c-.783-.57-.38-1.81.588-1.81h4.926a1 1 0 00.95-.69l1.518-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    ({product.rating.count} reviews)
                  </span>
                </div>

                <p className="text-gray-700 mt-6">
                  {product.description}
                </p>
              </div>

              <div className="mt-6">
                <button className="w-full bg-yellow-500 text-white text-lg font-semibold py-3 rounded-lg hover:bg-green-500">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context
) => {
  const { id } = context.params!;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
