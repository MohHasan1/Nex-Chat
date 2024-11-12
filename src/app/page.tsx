import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const curUser = await currentUser();


  let curUserEmail = "";
  if (curUser?.emailAddresses)
    curUserEmail = curUser.emailAddresses[0]?.emailAddress;

  return (
    <>
      <div className="p-5">
        <UserButton />
        {curUserEmail ? curUserEmail : <h1>no email</h1>}
      </div>
    </>
  );
}

{
  /* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
        </SignedIn> */
}
