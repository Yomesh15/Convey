const Protect = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/user/auth/check`, {
          withCredentials: true,
        });

        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return (
    <div className="animate-pulse">
      {/* Search */}
      <div className="h-11 rounded-lg bg-gray-300 mb-5"></div>

      {/* Users */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 mb-5">
          {/* Profile */}
          <div className="w-14 h-14 rounded-full bg-gray-300"></div>

          {/* Name & Message */}
          <div className="flex-1">
            <div className="h-4 w-40 rounded-full bg-gray-300 mb-2"></div>
            <div className="h-3 w-24 rounded-full bg-gray-300"></div>
          </div>
        </div>
      ))}
    </div>
  )

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};