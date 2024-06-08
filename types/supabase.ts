export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  next_auth: {
    Tables: {
      accounts: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          oauth_token: string | null
          oauth_token_secret: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string | null
          username: string | null
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId?: string | null
          username?: string | null
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          oauth_token?: string | null
          oauth_token_secret?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resumeUser: {
        Row: {
          created_at: string
          file_name: string | null
          file_uuid: string | null
          id: number
          link_expires_after: string | null
          resume_link: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_uuid?: string | null
          id?: number
          link_expires_after?: string | null
          resume_link?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_uuid?: string | null
          id?: number
          link_expires_after?: string | null
          resume_link?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resumeUser_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string | null
        }
        Insert: {
          expires: string
          id?: string
          sessionToken: string
          userId?: string | null
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          address: string | null
          age: number | null
          bio: string | null
          cgpa: number | null
          city: string | null
          country: string | null
          dob: string | null
          email: string | null
          emailVerified: boolean | null
          gender: string | null
          id: string
          image: string | null
          interests: string | null
          name: string | null
          password: string | null
          state: string | null
          username: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          bio?: string | null
          cgpa?: number | null
          city?: string | null
          country?: string | null
          dob?: string | null
          email?: string | null
          emailVerified?: boolean | null
          gender?: string | null
          id?: string
          image?: string | null
          interests?: string | null
          name?: string | null
          password?: string | null
          state?: string | null
          username?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          age?: number | null
          bio?: string | null
          cgpa?: number | null
          city?: string | null
          country?: string | null
          dob?: string | null
          email?: string | null
          emailVerified?: boolean | null
          gender?: string | null
          id?: string
          image?: string | null
          interests?: string | null
          name?: string | null
          password?: string | null
          state?: string | null
          username?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      VerificationToken: {
        Row: {
          email: string
          expires: string
          id: string
          token: string
        }
        Insert: {
          email: string
          expires: string
          id?: string
          token: string
        }
        Update: {
          email?: string
          expires?: string
          id?: string
          token?: string
        }
        Relationships: []
      }
      video_user_link: {
        Row: {
          created_at: string
          expires_in: string | null
          id: number
          user_id: string | null
          video_id: string | null
          video_link: string | null
          video_name: string | null
        }
        Insert: {
          created_at?: string
          expires_in?: string | null
          id?: number
          user_id?: string | null
          video_id?: string | null
          video_link?: string | null
          video_name?: string | null
        }
        Update: {
          created_at?: string
          expires_in?: string | null
          id?: number
          user_id?: string | null
          video_id?: string | null
          video_link?: string | null
          video_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_user_link_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
