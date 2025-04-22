import { oauthClient } from "@/lib/auth/client";
import { createContext, useContext, useEffect, useState } from "react";
import { openAuthSessionAsync } from "expo-web-browser";
import { Agent } from "@atproto/api";

interface AuthCtx {
  isLoggedIn: boolean;
  user: any;
  login: () => void;
  logout: () => void;
  loading: boolean;
  agent: Agent | null;
  error: any;
}

const AuthContext = createContext<AuthCtx>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: false,
  agent: null,
  error: null,
});

const getProfile = async (agent: Agent) => {
  const profileResponse = await agent.com.atproto.repo
    .getRecord({
      repo: agent.assertDid,
      collection: "app.bsky.actor.profile",
      rkey: "self",
    })
    .catch(() => undefined);

  if (profileResponse?.data) {
    return profileResponse.data;
  } else {
    throw new Error("Failed to fetch profile");
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<AuthCtx["isLoggedIn"]>(false);
  const [user, setUser] = useState<AuthCtx["user"]>(null);
  const [loading, setLoading] = useState<AuthCtx["loading"]>(false);
  const [error, setError] = useState<AuthCtx["error"]>(null);
  const [agent, setAgent] = useState<AuthCtx["agent"]>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const result = await oauthClient.init();

        if (result) {
          const { session } = result;
          const agent = new Agent(session);
          const profile = await getProfile(agent);
          setUser(profile);
          setAgent(agent);
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUser(null);
        setAgent(null);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const handle = "eliot.pds.eliot.sh";
      // const handle = "eliot.sh";
      const loginUrl = await oauthClient.authorize(handle);
      console.log("loginUrl", loginUrl);
      const res = await openAuthSessionAsync(loginUrl.toString());
      console.log("res", res);

      if (res.type === "success") {
        const params = new URLSearchParams(res.url.split("?")[1]);
        const { session } = await oauthClient.callback(params);
        const agent = new Agent(session);
        const profile = await getProfile(agent);
        setUser(profile);
        setAgent(agent);
        setIsLoggedIn(true);
      } else {
        console.error("Login failed");
        setIsLoggedIn(false);
        setUser(null);
        setAgent(null);
        setError("Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setIsLoggedIn(false);
      setUser(null);
      setAgent(null);
      setError("Error during login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    oauthClient.revoke(agent?.did || "");
    console.log("Logged out");
    setIsLoggedIn(false);
    setUser(null);
    setAgent(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, loading, error, agent }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error("useAuth must be used within an AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
