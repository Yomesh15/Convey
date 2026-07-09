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

  if (loading) return <h1>Loading...</h1>;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};