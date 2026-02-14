import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useAuth();

  const dateFormat = (dateString) => {
    if (!dateString) return "----/--/--";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (loading)
    return <div className="text-center mt-10 text-red-500">Loading...</div>;

  if (!user)
    return (
      <div className="text-center mt-10">
        Login or Register First to Show Profile Page.
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-68px)] flex justify-center items-center">
      <div className="border border-secondary/70 rounded-3xl overflow-hidden w-full max-w-sm bg-primary/20 backdrop-blur-sm">
        {/* Banner العلوي */}
        <div className="bg-linear-to-r from-blue-500/40 to-purple-500/40 w-full h-32 relative">
          {/* دائرة وهمية لصورة المستخدم ليعطي شكل Profile حقيقي 👤 */}
          <div className="absolute -bottom-10 left-6 w-20 h-20 bg-secondary rounded-full border-4 border-bg flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="mt-8 px-6 py-4">
          <h1 className="text-xl">{user.name}</h1>
          <h3 className="text-gray-300">{user.email}</h3>
          <h3 className="text-gray-300">
            Joined At: {dateFormat(user.createdAt)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
