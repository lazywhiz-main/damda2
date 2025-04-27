import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getPriceText = () => {
    const price = product.prices[0];
    if (price.amount2) {
      return `${formatPrice(price.amount)}~${formatPrice(price.amount2)}원`;
    }
    return `${formatPrice(price.amount)}원${price.description ? ` ${price.description}` : ''}`;
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            priority={false}
            quality={85}
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-serif text-ink/90">{product.name}</h3>
            <p className="text-lg handwriting text-ink/80">{product.title}</p>
            <p className="text-sm text-ink/60">{product.description}</p>
          </div>
          <p className="text-ink/80 font-medium">
            {getPriceText()}
          </p>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <Button
          variant={product.buttonType === 'buy' ? 'primary' : 'secondary'}
          onClick={() => {
            if (product.buttonType === 'buy') {
              window.location.href = `/shop/buy/${product.id}`;
            } else {
              window.location.href = `/contact?product=${product.id}`;
            }
          }}
        >
          {product.buttonType === 'buy' ? '구매하기' : '문의하기'}
        </Button>
      </div>
    </div>
  );
} 