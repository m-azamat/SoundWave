
import { authConfig } from "@/configs/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Name() {
  const session = await getServerSession(authConfig);
  console.log(session);
  
  return (
    <div>
      <h2>Hi {session?.user?.name}</h2>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="User Profile Image"
          width={100}
          height={100}
        />
      )}
    </div>
  )
}