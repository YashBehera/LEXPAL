"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import ExploreHeader from "./components/ExploreHeader";
import FilterSidebar from "./components/FilterSidebar";
import LawyerCard, { type LawyerCardProps } from "./components/LawyerCard";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
const LIMIT = 6;
const server_url = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

const ExplorePage: React.FC = () => {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [lawyers, setLawyers] = useState<LawyerCardProps[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 🔹 Fetch lawyers
  const fetchLawyers = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    const params = new URLSearchParams({
      limit: "6"
    });

    if (cursor) {
      params.append("cursor", cursor);
    }

    try {
      const res = await fetch(`${server_url}/api/explore/fetch/all-lawyers?${params.toString()}`);
      const data: {
        lawyers: LawyerCardProps[];
        nextCursor: string | null;
        hasMore: boolean;
      } = await res.json();

      // Use functional update to avoid stale state issues
      setLawyers(prev => {
        // Check for duplicates before adding new lawyers
        const existingIds = new Set(prev.map(lawyer => lawyer.id));
        const newLawyers = data.lawyers.filter(lawyer => !existingIds.has(lawyer.id));
        return [...prev, ...newLawyers];
      });

      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore]); // Removed 'loading' from dependencies

  // 🔹 Initial fetch only (not on fetchLawyers changes)
  useEffect(() => {
    if (lawyers.length === 0) {
      fetchLawyers();
    }
  }, []);

  // 🔹 Intersection Observer for infinite scroll
  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchLawyers();
        }
      },
      { threshold: 1 }
    );

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader);
    };
  }, [fetchLawyers, hasMore, loading]);

  return (
    <div className={styles.exploreRoot}>
      <ExploreHeader onOpenFilters={() => setIsFilterOpen(true)} router={router} />

      <main className={styles.mainContent}>
        {/* Lawyer Cards Grid */}
        <div className={styles.lawyerGrid}>
          {lawyers.map((l) => (
            <LawyerCard
              key={l.id}
              first_name={l.first_name}
              id={l.id}
              last_name={l.last_name}
              experience={l.experience}
              avg_rating={l.avg_rating}
              review_count={l.review_count}
              languages={l.languages}
              specialities={l.specialities}
              court_eligibility={l.court_eligibility}
              profile_picture={l.profile_picture}
              router={router}
            />
          ))}
        </div>

        {/* Loader trigger */}
        <div ref={loaderRef} className={styles.loader}>
          {loading && <p>Loading more advocates...</p>}
          {!hasMore && lawyers.length > 0 && (
            <p>All advocates loaded</p>
          )}
        </div>
      </main>

      <FilterSidebar open={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
};

export default ExplorePage;