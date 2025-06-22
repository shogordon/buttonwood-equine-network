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
      commission_disclosures: {
        Row: {
          acknowledged_at: string | null
          commission_amount: number | null
          commission_type: string | null
          created_at: string | null
          disclosure_text: string | null
          horse_profile_id: string | null
          id: string
          seller_id: string | null
        }
        Insert: {
          acknowledged_at?: string | null
          commission_amount?: number | null
          commission_type?: string | null
          created_at?: string | null
          disclosure_text?: string | null
          horse_profile_id?: string | null
          id?: string
          seller_id?: string | null
        }
        Update: {
          acknowledged_at?: string | null
          commission_amount?: number | null
          commission_type?: string | null
          created_at?: string | null
          disclosure_text?: string | null
          horse_profile_id?: string | null
          id?: string
          seller_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commission_disclosures_horse_profile_id_fkey"
            columns: ["horse_profile_id"]
            isOneToOne: false
            referencedRelation: "horse_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commission_disclosures_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      horse_inquiries: {
        Row: {
          buyer_email: string
          buyer_id: string | null
          buyer_name: string
          buyer_phone: string | null
          created_at: string | null
          horse_profile_id: string | null
          id: string
          message: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_email: string
          buyer_id?: string | null
          buyer_name: string
          buyer_phone?: string | null
          created_at?: string | null
          horse_profile_id?: string | null
          id?: string
          message: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_email?: string
          buyer_id?: string | null
          buyer_name?: string
          buyer_phone?: string | null
          created_at?: string | null
          horse_profile_id?: string | null
          id?: string
          message?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "horse_inquiries_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "horse_inquiries_horse_profile_id_fkey"
            columns: ["horse_profile_id"]
            isOneToOne: false
            referencedRelation: "horse_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      horse_media: {
        Row: {
          caption: string | null
          created_at: string | null
          display_order: number | null
          horse_profile_id: string | null
          id: string
          is_primary: boolean | null
          media_type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          horse_profile_id?: string | null
          id?: string
          is_primary?: boolean | null
          media_type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          display_order?: number | null
          horse_profile_id?: string | null
          id?: string
          is_primary?: boolean | null
          media_type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "horse_media_horse_profile_id_fkey"
            columns: ["horse_profile_id"]
            isOneToOne: false
            referencedRelation: "horse_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      horse_profiles: {
        Row: {
          age: number
          breed: string | null
          color: string | null
          cons: string[] | null
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
          listing_status: string | null
          location: string | null
          maintenance_details: string[] | null
          pedigree: string | null
          price: number | null
          program_details: string[] | null
          pros: string[] | null
          rideability: string[] | null
          sale_type: string | null
          sex: string | null
          show_record: string | null
          temperament: string[] | null
          training_level: string | null
          trial_available: boolean | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
          videos: string[] | null
          xrays_available: boolean | null
          year_of_birth: number | null
        }
        Insert: {
          age: number
          breed?: string | null
          color?: string | null
          cons?: string[] | null
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
          listing_status?: string | null
          location?: string | null
          maintenance_details?: string[] | null
          pedigree?: string | null
          price?: number | null
          program_details?: string[] | null
          pros?: string[] | null
          rideability?: string[] | null
          sale_type?: string | null
          sex?: string | null
          show_record?: string | null
          temperament?: string[] | null
          training_level?: string | null
          trial_available?: boolean | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
          videos?: string[] | null
          xrays_available?: boolean | null
          year_of_birth?: number | null
        }
        Update: {
          age?: number
          breed?: string | null
          color?: string | null
          cons?: string[] | null
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
          listing_status?: string | null
          location?: string | null
          maintenance_details?: string[] | null
          pedigree?: string | null
          price?: number | null
          program_details?: string[] | null
          pros?: string[] | null
          rideability?: string[] | null
          sale_type?: string | null
          sex?: string | null
          show_record?: string | null
          temperament?: string[] | null
          training_level?: string | null
          trial_available?: boolean | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
          videos?: string[] | null
          xrays_available?: boolean | null
          year_of_birth?: number | null
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
      subscriptions: {
        Row: {
          billing_cycle: string | null
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          plan_price: number | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name: string
          plan_price?: number | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          billing_cycle?: string | null
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          plan_price?: number | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      trial_requests: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          horse_profile_id: string | null
          id: string
          message: string | null
          requested_date: string | null
          seller_response: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          horse_profile_id?: string | null
          id?: string
          message?: string | null
          requested_date?: string | null
          seller_response?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          horse_profile_id?: string | null
          id?: string
          message?: string | null
          requested_date?: string | null
          seller_response?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trial_requests_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "trial_requests_horse_profile_id_fkey"
            columns: ["horse_profile_id"]
            isOneToOne: false
            referencedRelation: "horse_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          account_type: string | null
          billing_email: string | null
          bio: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          notification_preferences: Json | null
          onboarding_completed: boolean | null
          phone: string | null
          profile_image_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          subscription_end_date: string | null
          subscription_plan: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          account_type?: string | null
          billing_email?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          account_type?: string | null
          billing_email?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          notification_preferences?: Json | null
          onboarding_completed?: boolean | null
          phone?: string | null
          profile_image_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          subscription_end_date?: string | null
          subscription_plan?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      verification_documents: {
        Row: {
          document_type: string
          file_name: string
          file_url: string
          id: string
          reviewed_at: string | null
          reviewer_notes: string | null
          status: string | null
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          document_type: string
          file_name: string
          file_url: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string | null
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          document_type?: string
          file_name?: string
          file_url?: string
          id?: string
          reviewed_at?: string | null
          reviewer_notes?: string | null
          status?: string | null
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["user_id"]
          },
        ]
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
