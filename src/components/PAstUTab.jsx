import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the editor styles

export default function PAstUTab({ isModerator }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handlePublish = async () => {
    if (newTitle.trim() === "" || newContent.trim() === "") return;
    
    const { error } = await supabase
      .from('articles')
      // We now save HTML content instead of plain text
      .insert([{ title: newTitle, description: newContent }]);

    if (error) {
      alert("Error publishing: " + error.message);
    } else {
      setNewTitle("");
      setNewContent("");
      fetchArticles();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    await supabase.from('articles').delete().eq('id', id);
    fetchArticles();
  };

  return (
  <div className="forum-page-container">
    
    {/* The new main heading */}
    <h2 className="forum-page-title">PAstU Monthly Articles</h2>
    
    {/* THE MODERATOR WRITER SECTION */}
    {isModerator && (
      <div className="forum-editor-container">
        <div className="forum-editor-header">
          <span className="editor-avatar">M</span>
          <h3>Write a New Article...</h3>
        </div>
        
        <input 
          type="text" 
          className="forum-title-input"
          placeholder="Article Title (e.g., Nov 2026: Jupiter Opposition)" 
          value={newTitle} 
          onChange={e => setNewTitle(e.target.value)}
        />
        
        <div className="quill-wrapper">
          <ReactQuill 
            theme="snow" 
            value={newContent} 
            onChange={setNewContent} 
            placeholder="Write your article content here..."
          />
        </div>
        
        <div className="forum-editor-footer">
          <button className="forum-submit-btn" onClick={handlePublish}>
            Submit Article
          </button>
        </div>
      </div>
    )}

    {/* FORUM THREAD LIST */}
    {loading ? (
      <p>Loading articles...</p>
    ) : articles.length === 0 ? (
      <p>No articles yet. Check back soon!</p>
    ) : (
      <div className="forum-thread-list">
        {articles.map((article) => (
          <div className="forum-post" key={article.id}>
            
            <div className="forum-post-sidebar">
              <div className="forum-avatar">M</div>
              <strong>Moderator</strong>
              <span className="forum-rank">Admin</span>
              <span className="forum-post-count">Posts: 1</span>
            </div>

            <div className="forum-post-content">
              <div className="forum-post-header">
                <h3>{article.title}</h3>
                <span className="forum-date">
                  {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <div 
                className="forum-post-body" 
                dangerouslySetInnerHTML={{ __html: article.description }} 
              />
              
              <div className="forum-post-footer">
                {isModerator && (
                  <button className="forum-delete-btn" onClick={() => handleDelete(article.id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    )}
  </div>
);
}