export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          description: string | null
          donors: number | null
          end_date: string | null
          goal: number | null
          id: string
          image: string | null
          raised: number | null
          slug: string
          title: string
        }
        Insert: {
          description?: string | null
          donors?: number | null
          end_date?: string | null
          goal?: number | null
          id: string
          image?: string | null
          raised?: number | null
          slug: string
          title: string
        }
        Update: {
          description?: string | null
          donors?: number | null
          end_date?: string | null
          goal?: number | null
          id?: string
          image?: string | null
          raised?: number | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          allocation_preference: string | null
          amount: number
          created_at: string
          currency: string
          donor_id: string | null
          email: string
          first_name: string
          id: string
          is_recurring: boolean
          last_name: string
          pan_number: string | null
          payment_intent_id: string | null
          status: Database["public"]["Enums"]["donation_status"]
          updated_at: string
        }
        Insert: {
          allocation_preference?: string | null
          amount: number
          created_at?: string
          currency?: string
          donor_id?: string | null
          email: string
          first_name: string
          id?: string
          is_recurring?: boolean
          last_name: string
          pan_number?: string | null
          payment_intent_id?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          updated_at?: string
        }
        Update: {
          allocation_preference?: string | null
          amount?: number
          created_at?: string
          currency?: string
          donor_id?: string | null
          email?: string
          first_name?: string
          id?: string
          is_recurring?: boolean
          last_name?: string
          pan_number?: string | null
          payment_intent_id?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          date: string | null
          description: string | null
          id: string
          location: string | null
          title: string
        }
        Insert: {
          date?: string | null
          description?: string | null
          id: string
          location?: string | null
          title: string
        }
        Update: {
          date?: string | null
          description?: string | null
          id?: string
          location?: string | null
          title?: string
        }
        Relationships: []
      }
      help_requests: {
        Row: {
          assigned_to: string | null
          created_at: string
          description: string
          id: string
          location: string
          phone: string
          request_type: string
          requester_name: string
          status: Database["public"]["Enums"]["request_status"]
          updated_at: string
          urgency: Database["public"]["Enums"]["request_urgency"]
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          description: string
          id?: string
          location: string
          phone: string
          request_type: string
          requester_name: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          urgency?: Database["public"]["Enums"]["request_urgency"]
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          description?: string
          id?: string
          location?: string
          phone?: string
          request_type?: string
          requester_name?: string
          status?: Database["public"]["Enums"]["request_status"]
          updated_at?: string
          urgency?: Database["public"]["Enums"]["request_urgency"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "help_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "help_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      programmes: {
        Row: {
          category: string | null
          description: string | null
          id: string
          image: string | null
          location: string | null
          metrics: Json | null
          slug: string
          status: string | null
          title: string
        }
        Insert: {
          category?: string | null
          description?: string | null
          id: string
          image?: string | null
          location?: string | null
          metrics?: Json | null
          slug: string
          status?: string | null
          title: string
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          image?: string | null
          location?: string | null
          metrics?: Json | null
          slug?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          date: string | null
          download_url: string | null
          id: string
          title: string
          type: string | null
        }
        Insert: {
          date?: string | null
          download_url?: string | null
          id: string
          title: string
          type?: string | null
        }
        Update: {
          date?: string | null
          download_url?: string | null
          id?: string
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string | null
          id: string
          title: string
          url: string | null
        }
        Insert: {
          category?: string | null
          id: string
          title: string
          url?: string | null
        }
        Update: {
          category?: string | null
          id?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          emergency_message: string | null
          emergency_mode: boolean | null
          id: number
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          emergency_message?: string | null
          emergency_mode?: boolean | null
          id?: number
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          emergency_message?: string | null
          emergency_mode?: boolean | null
          id?: number
        }
        Relationships: []
      }
      stories: {
        Row: {
          author: string | null
          content: string | null
          date: string | null
          excerpt: string | null
          id: string
          image: string | null
          slug: string
          title: string
        }
        Insert: {
          author?: string | null
          content?: string | null
          date?: string | null
          excerpt?: string | null
          id: string
          image?: string | null
          slug: string
          title: string
        }
        Update: {
          author?: string | null
          content?: string | null
          date?: string | null
          excerpt?: string | null
          id?: string
          image?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          availability: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          phone: string
          skills: string[] | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          phone: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          phone?: string
          skills?: string[] | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "pending" | "reviewed" | "accepted" | "rejected"
      donation_status: "pending" | "completed" | "failed" | "refunded"
      request_status: "open" | "in_progress" | "resolved" | "closed"
      request_urgency: "low" | "medium" | "high" | "critical"
      user_role: "admin" | "editor" | "volunteer" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "reviewed", "accepted", "rejected"],
      donation_status: ["pending", "completed", "failed", "refunded"],
      request_status: ["open", "in_progress", "resolved", "closed"],
      request_urgency: ["low", "medium", "high", "critical"],
      user_role: ["admin", "editor", "volunteer", "user"],
    },
  },
} as const
