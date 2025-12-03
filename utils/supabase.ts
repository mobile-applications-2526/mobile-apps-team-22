// 1. IMPORT THE POLYFILL FIRST
import 'react-native-url-polyfill/auto'; 

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL; // Or your hardcoded string
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // 2. TELL SUPABASE TO USE ASYNC STORAGE
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // React Native apps don't use URLs like browsers do
  },
});