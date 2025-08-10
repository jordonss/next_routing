import NewsList from "@/components/news-list";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";

export default function FilteredNewsPage({ params }) {
  const filter = params.filter;
  const selectedYear = filter?.[0]; // Assuming the first part of the filter is the year
  const selectedMonth = filter?.[1]; // Assuming the second part of the filter is the month

  let news;
  let links = getAvailableNewsYears();

  if (selectedYear && !selectedMonth) {
    // If only year is selected, get all news for that year
    news = getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }

  if (selectedYear && selectedMonth) {
    news = getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = [];
  }

  let newsContent = <p>No news available for this selection.</p>;

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  }

  if (
    (selectedYear && getAvailableNewsYears().includes(+selectedYear)) ||
    (selectedMonth &&
      !getAvailableNewsMonths(selectedYear).includes(+selectedMonth))
  ) {
    throw new Error("Invalid news selection");
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear
                ? `/archive/${selectedYear}/${link}`
                : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
}
