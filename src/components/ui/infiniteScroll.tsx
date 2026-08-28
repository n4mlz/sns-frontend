"use client";

import { ReactNode, useEffect, useRef } from "react";

type InfiniteScrollProps = {
  children: ReactNode;
  hasMore: boolean;
  loadMore: () => Promise<void> | void;
  loader: ReactNode;
};

const InfiniteScroll = ({ children, hasMore, loadMore, loader }: InfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || loadingRef.current) return;

      loadingRef.current = true;
      Promise.resolve(loadMore()).finally(() => {
        loadingRef.current = false;
      });
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <>
      {children}
      {hasMore && (
        <>
          <div ref={sentinelRef} aria-hidden="true" />
          {loader}
        </>
      )}
    </>
  );
};

export default InfiniteScroll;
