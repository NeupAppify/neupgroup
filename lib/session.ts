import { cookies } from "next/headers";

export interface UserProfile {
  accountId: string;
  neupId: string | null;
  displayName: string | null;
  displayImage: string;
  accountType: "individual" | "guest" | string;
  verified: boolean;
}

interface WhoisResponse extends UserProfile {
  success: boolean;
}

const WHOIS_ENDPOINT = "https://neupgroup.com/account/bridge/api.v1/auth/whoisthis";

export async function getServerSession(): Promise<UserProfile | null> {
  try {
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(WHOIS_ENDPOINT, {
      method: "GET",
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data: WhoisResponse = await response.json();
    if (!data.success || !data.accountId) return null;

    return {
      accountId: data.accountId,
      neupId: data.neupId,
      displayName: data.displayName,
      displayImage: data.displayImage,
      accountType: data.accountType,
      verified: data.verified,
    };
  } catch (error) {
    console.error("Failed to fetch server session:", error);
    return null;
  }
}
