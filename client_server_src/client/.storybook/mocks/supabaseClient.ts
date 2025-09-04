const mockSupabase = {
  auth: {
    getSession: () =>
      Promise.resolve({
        data: { session: null }, 
      }),
    onAuthStateChange: (callback: any) => {
      // Simulate no user logged in
      callback("SIGNED_OUT", null);
      return {
        data: { subscription: { unsubscribe: () => {} } },
      };
    },
    signInWithOAuth: async () => {
      console.log("Mock signInWithOAuth called");
    },
    signOut: async () => {
      console.log("Mock signOut called");
      return { error: null };
    },
  },
};

export default mockSupabase;