import { createContext, useState, useContext, useEffect } from "react";
import { ReactNode } from "react";

interface UserProfile {
  username: string;
  email: string;
  phone_number: string;
  is_verified: boolean;
  fullname: string;
  profile_pic: string;
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

  const API_URL = "https://doctruyen-be-e0t7.onrender.com/api";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          setUserProfile(data.data);
          setUserChanged(false);
        } else {
          setUserProfile(null);
          setUserChanged(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
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
