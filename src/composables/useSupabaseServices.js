import { createClient } from '@supabase/supabase-js'

export function useSupabaseServices() {   
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabaseSecurityKey = import.meta.env.VITE_SUPABASE_SECURITY_KEY
    const bucketPath = import.meta.env.VITE_BUCKET_PATH

    const supabase = createClient(supabaseUrl, supabaseSecurityKey)
    return supabase
}