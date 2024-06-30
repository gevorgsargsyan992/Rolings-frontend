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
  const { state, logout } = useAuth() as any;
  const router = useRouter();

  if (!state.user) {
    logout();
    router.push("/signin");

    return null;
  }

  if (!allowedRoles.includes(state.user.type)) {
    router.push("/not-authorized");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
