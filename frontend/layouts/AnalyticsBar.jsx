import AnayticsSidebar from "../src/components/AnayticsSidebar";
import { useAuthStore } from "../src/store/authStore";
const Sidebar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const userId = user?._id;

  return <>{userId && <AnayticsSidebar />}</>;
};

export default Sidebar;
