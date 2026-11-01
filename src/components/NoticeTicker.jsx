// src/components/NoticeTicker.jsx
export default function NoticeTicker({ message }) {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {message}
      </div>
    </div>
  );
}