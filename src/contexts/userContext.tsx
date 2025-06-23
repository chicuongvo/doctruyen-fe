import { getCurrentUser } from "@/api/users.api";
import { createContext, useState, useContext, useEffect } from "react";
import { ReactNode } from "react";

interface UserProfile {
  username: string;
  email: string;
  phone_number: string;
  is_verified: boolean;
  fullname: string;
  profile_pic: string;
  role: string;
  story_likes: {
    like_id: string;
    liked_at: string;
    user_id: string;
    story_id: string;
  }[];
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  userChanged: boolean;
  setUserChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userChanged, setUserChanged] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getCurrentUser();

        const data = response.data;

        if (data.success) {
          setUserProfile(data.data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUserProfile(null);
      } finally {
        setUserChanged(false);
      }
    };

    fetchUserProfile();
  }, [userChanged]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        userChanged,
        setUserChanged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
