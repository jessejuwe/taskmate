// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// import { supabaseAnonKey, supabaseUrl } from '@/config';

// export const createClient = () => {
//     const cookieStore = cookies();

//     return createServerClient(
//         supabaseUrl!, supabaseAnonKey!, 
//         {
//             cookies: {
//                 get(name: string) {
//                     return cookieStore.get(name)?.value;
//                 }
//             }
//         }
//     )
// }