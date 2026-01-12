"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

type LawyerProfile = {
  id: string;
  first_name: string;
  last_name: string;
  experience: number;
  email: string;
  city: string;
  state: string;
  office_address: string;
  profile_picture: string;
  bar_license: string;
  aor_certified: boolean;
  court_eligibility: {
    district_court: boolean;
    high_court: boolean;
    supreme_court: boolean;
  };
  specialities: string[];
  languages: string[];
  description: string;
  avg_rating: number;
  review_count: number;
};

const LawyerProfilePage: React.FC = () => {
  const server_url = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [lawyer, setLawyer] = useState<LawyerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // Toggle Bookmark
  const toggleBookmark = async () => {
    if (saving) return;

    setSaving(true);
    setIsSaved(prev => !prev); // optimistic update

    try {
      if (!isSaved) {
        await fetch(`${server_url}/api/user/saved-lawyers/update/new-save/${id}`, {
          method: "POST",
          credentials: "include"
        });
      } else {
        await fetch(`${server_url}/api/user/saved-lawyers/update/delete-saved-lawyer/${id}`, {
          method: "DELETE",
          credentials: "include"
        });
      }
    } catch (err) {
      setIsSaved(prev => !prev); // rollback
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchLawyer = async () => {
      try {
        const res = await fetch(`${server_url}/api/explore/fetch/lawyer/${id}`, {
          method: "GET",
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch lawyer");
        const data: LawyerProfile = await res.json();
        setLawyer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const checkSaved = async () => {
      try {
        const res = await fetch(`${server_url}/api/user/saved-lawyers/fetch/isLawyerSaved/${id}`, {
          method: "GET",
          credentials: "include"
        });
        const data: { saved: boolean } = await res.json();
        setIsSaved(data.saved);
      } catch (e) { console.error(e); }
    };

    checkSaved();
    fetchLawyer();
  }, [id, server_url]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  if (!lawyer) {
    return <div className="flex items-center justify-center min-h-screen"><p>Advocate not found</p></div>;
  }

  return (
    <div className={styles.page}>

      {/* 1. Sticky Frosted Header */}
      <header className={styles.stickyHeader}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* We can fade this in on scroll later if needed */}
        {/* <span className={styles.headerTitle}>{lawyer.first_name}</span> */}

        <button className={styles.shareBtn} onClick={toggleBookmark}>
          <span className={`material-symbols-outlined ${isSaved ? 'check_circle' : ''}`}>
            {isSaved ? 'bookmark' : 'bookmark_border'}
          </span>
        </button>
      </header>

      {/* Spacer so content doesn't hide behind header */}
      <div className={styles.headerSpacer} />

      <main className={styles.main}>

        {/* 2. Hero Section (Contact Poster) */}
        <section className={styles.heroSection}>
          <div className={styles.heroAvatar} style={{ backgroundImage: `url(${lawyer.profile_picture})` }} />
          <h1 className={styles.heroName}>{lawyer.first_name} {lawyer.last_name}</h1>
          <p className={styles.heroMeta}>
            Advocate • {lawyer.city}, {lawyer.state} • {lawyer.experience} Years
          </p>

          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles.verified}`}>
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Verified
            </span>
            {lawyer.aor_certified && (
              <span className={`${styles.badge} ${styles.aor}`}>
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                AOR Certified
              </span>
            )}
          </div>
        </section>


        {/* 3. Bento Grid Details */}
        <div className={styles.bentoGrid}>

          {/* Rating Stat */}
          <div className={`${styles.card} ${styles.span4}`}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {lawyer.avg_rating} <span className="text-yellow-500 text-2xl">★</span>
              </span>
              <span className={styles.statLabel}>{lawyer.review_count} Reviews</span>
            </div>
          </div>

          {/* Languages */}
          <div className={`${styles.card} ${styles.span8}`}>
            <h3 className={styles.sectionTitle}>Languages Spoken</h3>
            <div className={styles.pillContainer}>
              {lawyer.languages.map(l => (
                <span key={l} className={styles.pill}>{l}</span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className={`${styles.card} ${styles.span12}`}>
            <h3 className={styles.sectionTitle}>About</h3>
            <p className={styles.paragraph}>{lawyer.description}</p>
          </div>

          {/* Specialities */}
          <div className={`${styles.card} ${styles.span6}`}>
            <h3 className={styles.sectionTitle}>Areas of Practice</h3>
            <div className={styles.pillContainer}>
              {lawyer.specialities.map(s => (
                <span key={s} className={styles.pill}>{s}</span>
              ))}
            </div>
          </div>

          {/* Courts & Location */}
          <div className={`${styles.card} ${styles.span6}`}>
            <h3 className={styles.sectionTitle}>Admissible Courts</h3>
            <div className="flex flex-col gap-3">
              {lawyer.court_eligibility.supreme_court &&
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="material-symbols-outlined">account_balance</span> Supreme Court
                </div>
              }
              {lawyer.court_eligibility.high_court &&
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="material-symbols-outlined">balance</span> High Court
                </div>
              }
              {lawyer.court_eligibility.district_court &&
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="material-symbols-outlined">gavel</span> District Court
                </div>
              }
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10">
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                {lawyer.office_address}
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 4. Floating Action Bar */}
      <div className={styles.floatingBar}>
        <button className={`${styles.actionBtn} ${styles.secondaryBtn}`} onClick={() => alert('Call feature coming soon')}>
          Call
        </button>
        <button
          className={`${styles.actionBtn} ${styles.primaryBtn}`}
          onClick={() => { router.push(`/User-Chat/${id}`) }}
        >
          Message
        </button>
      </div>

    </div>
  );
};

export default LawyerProfilePage;