import React, { useRef } from "react";
import { LuBadgeCheck, LuUpload } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUploadProfileImage } from "@/hooks/user/useUploadProfileImage";

interface ProfileSidebarProps {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    is_verified: boolean;
    profile_image_url: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileSidebar({
  user,
  setUser,
  isUploading,
  setIsUploading,
}: ProfileSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadProfileImage } = useUploadProfileImage();

  const baseUrl = "https://nurae-api.alernal.com.co/";
  const imageUrl = user.profile_image_url
    ? `${baseUrl}${user.profile_image_url}`
    : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    uploadProfileImage(file, {
      onSuccess: (data) => {
        setUser((prev: any) => ({
          ...prev,
          profile_image_url:
            data?.data?.profile_image_url ?? data?.profile_image_url,
        }));
      },
      onSettled: () => {
        setIsUploading(false);
      },
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full md:w-1/3">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-t-lg">
          <CardTitle className="text-center">Mi Perfil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-6 pb-8">
          <div className="relative mb-4 group">
            <div
              className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 ${
                isUploading ? "opacity-50" : ""
              }`}
              style={{
                boxShadow: "0 4px 16px rgba(80, 0, 120, 0.15)",
                transition: "box-shadow 0.2s",
              }}
            >
              <img
                src={imageUrl}
                alt="Profile"
                className="object-cover w-full h-full rounded-full select-none"
                draggable={false}
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
            </div>
            <button
              onClick={triggerFileInput}
              className="absolute bottom-0 right-0 bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full shadow-lg transition-all duration-200"
              disabled={isUploading}
            >
              <LuUpload size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfileImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <h2 className="text-xl font-bold mt-2">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-muted-foreground">{user.email}</p>

          <div className="flex items-center mt-2 gap-2">
            <Badge
              variant={user.role === "admin" ? "destructive" : "secondary"}
              className="capitalize"
            >
              {user.role}
            </Badge>
            {user.is_verified ? (
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-green-500 text-green-600"
              >
                <LuBadgeCheck size={14} />
                Verificado
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="flex items-center gap-1 border-yellow-500 text-yellow-600"
              >
                No verificado
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
