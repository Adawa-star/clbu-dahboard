export default function Panel({ id, title, children }) {
  return (
    <div className="panel" role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`}>
      <div className="panel-header">
        <h2>{title}</h2>
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
}
