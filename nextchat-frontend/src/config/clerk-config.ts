function checkClerkEnvVar() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env.local file."
    );
  }
}

export default checkClerkEnvVar;
