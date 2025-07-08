import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useUser } from "@/hooks/user/useUser";
import ProfileSidebar from "@/components/profile/profile-sidebar";
import ProfilePersonalInfo from "@/components/profile/profile-person-info";
import ProfileSecurity from "@/components/profile/profile-security";

export default function Profile() {
  const authUser = useAuthStore((state) => state.user);
  const updateUserInStore = useAuthStore((state) => state.updateUser);
  const [user, setUser] = useState(authUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { data: fetchedUser } = useUser(authUser?.id || 0);

  useEffect(() => {
  if (fetchedUser) {
    setUser(fetchedUser);
    updateUserInStore(fetchedUser);
  }
}, [fetchedUser]);


  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8">
        <ProfileSidebar
          user={user}
          setUser={setUser}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />

        <div className="w-full md:w-2/3">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 border border-gray-200 mb-6">
              <TabsTrigger value="details">Datos Personales</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <ProfilePersonalInfo
                user={user}
                setUser={setUser}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </TabsContent>

            <TabsContent value="security">
              <ProfileSecurity user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
