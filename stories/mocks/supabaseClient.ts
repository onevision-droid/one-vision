export const supabase = {
  from: () => ({
    insert: () => Promise.resolve({ data: null, error: null }),
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null })
    })
  }),
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve({ error: null }),
  }
};
