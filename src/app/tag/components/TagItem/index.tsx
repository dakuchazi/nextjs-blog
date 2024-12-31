'use client';

import { useRouter } from 'next/navigation';
import s from './index.module.scss';

interface TagItemProps {
    id: number;
    name: string;
    count?: number;
}

export default function TagItem({ id, name, count }: TagItemProps) {
    const router = useRouter();

    return (
        <span
            className={s.tagItem}
            onClick={() => router.push(`/artList?tag=${id}&key=tag`)}
        >
            {name}
            {count !== undefined && count > 0 && (
                <sup className={s.count}>{count}</sup>
            )}
        </span>
    );
}