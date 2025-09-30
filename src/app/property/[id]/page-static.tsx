export default function StaticPropertyPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Property Details</h1>
      <p>This is a static test page to verify the route is working.</p>
      <p>If you can see this page, the routing is working correctly.</p>
      <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>
        Back to Home
      </a>
    </div>
  );
}