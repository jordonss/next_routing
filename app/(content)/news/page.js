"use client";

import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [news, setNews] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch("http://localhost:8080/news");
			// Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        setError("Failed to fetch news");
        setLoading(false);
        return; // Stop further processing
      }

      const data = await response.json();
      setLoading(false);
			setNews(data);
      
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let newContent;

  if (news) {
    newContent = <NewsList news={news} />;
  }

  return (
    <>
      <h1>News Page</h1>
      {newContent}
    </>
  );
}
