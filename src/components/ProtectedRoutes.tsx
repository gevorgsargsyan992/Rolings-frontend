import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/Auth";
import { UserType } from "@/types/UserTypes";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: UserType[];
}) => {
  const { getUserData, logout } = useAuth() as any;
  const router = useRouter();
  const userData = getUserData();

  if (!userData) {
    logout();
    router.push("/signin");

    return null;
  }

  if (!allowedRoles.includes(userData?.type)) {
    router.push("/not-authorized");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
