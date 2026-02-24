export default function Complete() {
  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="card shadow-sm text-center">
        <div className="card-body p-5">
          <div className="display-4 mb-3">✅</div>
          <h2 className="mb-3">訂單完成</h2>
          <p className="text-secondary mb-4">
            感謝您的購買！我們已收到您的訂單，
            稍後會將訂單確認信寄送至您的 Email。
          </p>
        </div>
      </div>
    </div>
  );
}