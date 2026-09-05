import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export function CustomerAvatar({
  imageUrl,
  name,
  size = 28,
}: {
  imageUrl: string;
  name: string;
  size?: number;
}) {
  if (!imageUrl) {
    return (
      <UserCircleIcon
        className="shrink-0 rounded-full text-gray-300"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={`${name}'s profile picture`}
      className="rounded-full"
      width={size}
      height={size}
    />
  );
}
