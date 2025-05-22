export async function triggerUserEvent(
  userId: string,
  event: "user.created" | "user.updated" | "user.deleted",
  userData?: { username?: string; email?: string }
) {
  try {
    const response = await fetch("/api/webhooks/clerk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        username: userData?.username,
        email: userData?.email,
        event,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to trigger ${event}: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error(`Error triggering ${event}:`, error);
    return { success: false, error };
  }
}
