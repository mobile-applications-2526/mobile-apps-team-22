// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../utils/supabase';

// const AuthContext = createContext({
//   session: null,
//   user: null,
//   signOut: () => {},
// });

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const setData = async () => {
//       const { data: { session }, error } = await supabase.auth.getSession();
//       if (error) throw error;
//       setSession(session);
//       setUser(session?.user ?? null);
//       setLoading(false);
//     };

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     setData();

//     return () => {
//       listener?.subscription.unsubscribe();
//     };
//   }, []);

//   const value = {
//     session,
//     user,
//     signOut: () => supabase.auth.signOut(),
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };



import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const AuthContext = createContext({
  session: null,
  user: null,
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.warn("Session check error:", error.message);
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // --- ROBUST SIGNOUT FUNCTION ---
  const signOut = async () => {
    try {
      // 1. Try to tell Supabase server to delete session
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase signOut error:", error.message);
      }
    } catch (err) {
      // 2. Catch network errors (like TypeError: Network request failed)
      console.error("Network failed during sign out:", err);
    } finally {
      // 3. FORCE LOCAL CLEANUP
      // This runs no matter what happens above.
      setSession(null);
      setUser(null);
    }
  };

  const value = {
    session,
    user,
    signOut, // Use our new robust function here
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};