"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface Props {
  src: string;
  /** Smaller image used on narrow screens */
  mobileSrc?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * A CSS background image is downloaded as soon as the element renders, even when
 * it is far below the fold. This wrapper only sets the background once the
 * element is within ~one screen of the viewport.
 */
export default function LazyBackground({ src, mobileSrc, className, style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setImage(mobileSrc && window.innerWidth < 768 ? mobileSrc : src);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [src, mobileSrc]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, backgroundImage: image ? `url('${image}')` : undefined }}
    >
      {children}
    </div>
  );
}
