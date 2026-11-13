import { useState, useEffect } from 'react';
import Panel from './Panel';
import { supabase } from '../supabaseClient';

export default function PAstUTab() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching:", error);
      } else {
        setArticles(data);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <Panel title="PAstU Monthly Articles">
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length === 0 ? (
        <p>No articles yet. Check back soon!</p>
      ) : (
        <div className="card-grid">
          {articles.map((article) => (
            <div className="article-card" key={article.id}>
              <div className="card-img">🌌</div>
              <div className="card-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <button className="card-btn">Read Article</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}