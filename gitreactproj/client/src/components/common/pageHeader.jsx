function PageHeader({ title, description }) {
  return (
    <div className="row mb-4">
      <div className="col">
        <h1 style={{ textAlign: "center" }}>{title}</h1>

        {description && (
          <div style={{ textAlign: "center" }} className="col">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
