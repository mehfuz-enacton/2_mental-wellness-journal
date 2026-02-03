import { useRef, useState } from "react";
import Button from "../components/UI/Button";
import { FALLBACK_QUOTES } from "../data/fallbackQuotes";
// import { seedLocalStorage } from "../utils/seedData";

type Quote = {
  q: string;
  a: string;
};

type StoredQuote = {
  date: string;
  quote: Quote;
};

const STORAGE_KEY = "daily-quote";

const getTodayKey = () => new Date().toISOString().split("T")[0];

const getRandomFallbackQuote = (): Quote => {
  const index = Math.floor(Math.random() * FALLBACK_QUOTES.length);
  return FALLBACK_QUOTES[index];
};

const Home = () => {
  const todayKey = getTodayKey();

  const [quote, setQuote] = useState<Quote | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed: StoredQuote = JSON.parse(stored);
    return parsed.date === todayKey ? parsed.quote : null;
  });

  const [loading, setLoading] = useState<boolean>(() => !quote);

  const hasFetchedRef = useRef(false);

  const todayFormatted = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const saveQuote = (newQuote: Quote) => {
    const payload: StoredQuote = {
      date: todayKey,
      quote: newQuote,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setQuote(newQuote);
  };

  const fetchQuote = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://dummyjson.com/quotes/random`,
      );
      const data = await res.json();
      
      const apiQuote: Quote = {
        q: data.quote,
        a: data.author,
      };

      saveQuote(apiQuote);
    } catch {
      console.warn("Quote API failed, using fallback");

      const fallbackQuote = getRandomFallbackQuote();
      saveQuote(fallbackQuote);
    } finally {
      setLoading(false);
    }
  };

  if (!quote && !hasFetchedRef.current) {
    hasFetchedRef.current = true;
    fetchQuote();
  }

  const handleNewQuote = () => {
    fetchQuote();
  };

  return (
    <main className="min-h-screen bg-[#F6F7F3] px-4 py-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <section className="text-center">
          <h1 className="text-3xl font-semibold text-[#2F3E46] mb-2">
            Welcome back
          </h1>
          <p className="text-[#6B8E7F] text-sm">{todayFormatted}</p>
        </section>

        {/* <section className="bg-white rounded-2xl shadow-sm px-8 py-10 text-center"> */}
        <section
          className="
              relative  
              rounded-2xl shadow-sm
              px-8 py-10
              text-center
              bg-cover bg-center
              overflow-hidden
            "
          style={{
            backgroundImage: "url('src/assets/quotes-bg2.jpg')",
          }}
        >
          {loading ? (
            <p className="text-[#6B8E7F]">Loading today’s quote…</p>
          ) : (
            quote && (
              <>
                <p className="text-xl text-[#2F3E46] leading-relaxed mb-6">
                  “{quote.q}”
                </p>
                <span className="text-[#6B8E7F] font-medium">— {quote.a}</span>

                <div className="mt-8">
                  <Button onClick={handleNewQuote}>New Quote</Button>
                </div>

                {/* Only use for data seed when needed */}
                {/* <div className="mt-8">
                  <Button onClick={()=>{seedLocalStorage(30)}}>Seed Data</Button>
                </div> */}
              </>
            )
          )}
        </section>
      </div>
    </main>
  );
};

export default Home;
