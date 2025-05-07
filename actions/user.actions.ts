// "use server";

// import { auth, currentUser } from "@clerk/nextjs/server";
// import { db } from "../lib/db";
// import { userTable } from "../lib/db/schema";
// import { eq } from "drizzle-orm";

// export async function syncUser() {
//   try {
//     const { userId } = await auth();
//     const user = await currentUser();

//     if (!userId || !user) return;

//     const primaryEmailAddress = user.primaryEmailAddress;
//     const email = primaryEmailAddress?.emailAddress;
//     if (!email) {
//       console.error("User does not have a valid primary email.");
//       return;
//     }

//     const fullName = `${user.firstName} ${user.lastName}`;

//     const existingUser = await db
//       .select()
//       .from(userTable)
//       .where(eq(userTable.id, userId))
//       .execute();

//     if (existingUser) {
//       return existingUser;
//     }

//     const dbUser = await db.insert(userTable).values({
//       id: userId,
//       name: fullName,
//       email: email,
//     });
//   } catch (error) {
//     console.error("Failed to sync user: ", error);
//   }
// }
