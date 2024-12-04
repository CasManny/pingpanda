import { currentUser } from "@clerk/nextjs/server";
import { router } from "../__internals/router";
import { publicProcedure } from "../procedures";
import { db } from "@/db";

export const authRouter = router({
    getDatabaseSyncStatus: publicProcedure.query( async ({ c, ctx }) => {
        const auth = await currentUser()
        if (!auth) { 
            return c.json({ isSyned: false})
        }

        const user = await db.user.findFirst({
            where: { externalId: auth.id}
        })

        if(!user) {
            await db.user.create({
                data: {
                    quotaLimit: 100,
                    email: auth.emailAddresses[0].emailAddress,
                    externalId: auth.id,

                }
            })

            return c.json({isSyned: true})
        }

        return c.json({isSyned: true})
    })
})