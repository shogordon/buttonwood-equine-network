export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      buyer_profiles: {
        Row: {
          additional_requirements: string | null
          age_max: number | null
          age_min: number | null
          created_at: string | null
          disciplines: Database["public"]["Enums"]["horse_discipline"][] | null
          experience_level:
            | Database["public"]["Enums"]["horse_experience_level"]
            | null
          height_max: number | null
          height_min: number | null
          id: string
          is_active: boolean | null
          location_preference: string | null
          price_range: Database["public"]["Enums"]["price_range"] | null
          profile_name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_requirements?: string | null
          age_max?: number | null
          age_min?: number | null
          created_at?: string | null
          disciplines?: Database["public"]["Enums"]["horse_discipline"][] | null
          experience_level?:
            | Database["public"]["Enums"]["horse_experience_level"]
            | null
          height_max?: number | null
          height_min?: number | null
          id?: string
          is_active?: boolean | null
          location_preference?: string | null
          price_range?: Database["public"]["Enums"]["price_range"] | null
          profile_name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_requirements?: string | null
          age_max?: number | null
          age_min?: number | null
          created_at?: string | null
          disciplines?: Database["public"]["Enums"]["horse_discipline"][] | null
          experience_level?:
            | Database["public"]["Enums"]["horse_experience_level"]
            | null
          height_max?: number | null
          height_min?: number | null
          id?: string
          is_active?: boolean | null
          location_preference?: string | null
          price_range?: Database["public"]["Enums"]["price_range"] | null
          profile_name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      horse_profiles: {
        Row: {
          age: number
          breed: string | null
          color: string | null
          created_at: string | null
          description: string | null
          disciplines: Database["public"]["Enums"]["horse_discipline"][] | null
          experience_level:
            | Database["public"]["Enums"]["horse_experience_level"]
            | null
          featured: boolean | null
          gender: string | null
          health_records: string | null
          height: number | null
          horse_name: string
          id: string
          images: string[] | null
          is_available: boolean | null
          location: string | null
          price: number | null
          training_level: string | null
          updated_at: string | null
          user_id: string
          videos: string[] | null
        }
        Insert: {
          age: number
          breed?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          disciplines?: Database["public"]["Enums"]["horse_discipline"][] | null
          experience_level?:
            | Database["public"]["Enums"]["horse_experience_level"]
            | null
          featured?: boolean | null
          gender?: string | null
          health_records?: string | null
          height?: number | null
          horse_name: string
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          location?: string | null
          price?: number | null
          training_level?: string | null
          updated_at?: string | null
          user_id: string
          videos?: string[] | null
        }
        Update: {
          age?: number
          breed?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          disciplines?: Database["public"]["Enums"]["horse_discipline"][] | null
          experience_level?:
            | Database["public"]["Enums"]["horse_experience_level"]
            | null
          featured?: boolean | null
          gender?: string | null
          health_records?: string | null
          height?: number | null
          horse_name?: string
          id?: string
          images?: string[] | null
          is_available?: boolean | null
          location?: string | null
          price?: number | null
          training_level?: string | null
          updated_at?: string | null
          user_id?: string
          videos?: string[] | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          buyer_liked: boolean | null
          buyer_profile_id: string
          created_at: string | null
          horse_profile_id: string
          id: string
          is_mutual_match: boolean | null
          matched_at: string | null
          seller_liked: boolean | null
          seller_responded: boolean | null
        }
        Insert: {
          buyer_liked?: boolean | null
          buyer_profile_id: string
          created_at?: string | null
          horse_profile_id: string
          id?: string
          is_mutual_match?: boolean | null
          matched_at?: string | null
          seller_liked?: boolean | null
          seller_responded?: boolean | null
        }
        Update: {
          buyer_liked?: boolean | null
          buyer_profile_id?: string
          created_at?: string | null
          horse_profile_id?: string
          id?: string
          is_mutual_match?: boolean | null
          matched_at?: string | null
          seller_liked?: boolean | null
          seller_responded?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_buyer_profile_id_fkey"
            columns: ["buyer_profile_id"]
            isOneToOne: false
            referencedRelation: "buyer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_horse_profile_id_fkey"
            columns: ["horse_profile_id"]
            isOneToOne: false
            referencedRelation: "horse_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          match_id: string
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          match_id: string
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          match_id?: string
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_responses: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          question: string
          step_number: number
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          question: string
          step_number: number
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          question?: string
          step_number?: number
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          onboarding_completed: boolean | null
          phone: string | null
          profile_image_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          additional_info: string | null
          created_at: string
          email: string
          experience: string | null
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          phone: string | null
          updated_at: string
          user_type: string
        }
        Insert: {
          additional_info?: string | null
          created_at?: string
          email: string
          experience?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_type?: string
        }
        Update: {
          additional_info?: string | null
          created_at?: string
          email?: string
          experience?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      horse_discipline:
        | "dressage"
        | "jumping"
        | "eventing"
        | "western"
        | "racing"
        | "trail"
        | "other"
      horse_experience_level:
        | "beginner"
        | "intermediate"
        | "advanced"
        | "professional"
      price_range:
        | "under_10k"
        | "10k_25k"
        | "25k_50k"
        | "50k_100k"
        | "100k_250k"
        | "250k_plus"
      user_role: "buyer" | "seller" | "both"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      horse_discipline: [
        "dressage",
        "jumping",
        "eventing",
        "western",
        "racing",
        "trail",
        "other",
      ],
      horse_experience_level: [
        "beginner",
        "intermediate",
        "advanced",
        "professional",
      ],
      price_range: [
        "under_10k",
        "10k_25k",
        "25k_50k",
        "50k_100k",
        "100k_250k",
        "250k_plus",
      ],
      user_role: ["buyer", "seller", "both"],
    },
  },
} as const
