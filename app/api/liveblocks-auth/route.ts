import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_kLP4t-RsLuQhZdY5-hkz9ydzyM2t0t-v6hkk03aUnlxLGOiRWMSEa4T2hNAdWsnr",
});

export const POST = async (req: Request) => {
  try {
    const authorization = auth();
    const user = await currentUser();

    if (!authorization || !user) {
      return NextResponse.json("Unauthorized!", { status: 403 });
    }

    const { room } = await req.json();
    const board = await convex.query(api.board.get, { id: room });

    if (board?.orgId !== authorization.orgId) {
      return NextResponse.json("Unauthorized!", { status: 403 });
    }

    const userInfo = {
      name: user.firstName!,
      imageUrl: user.imageUrl!,
    };

    const session = liveblocks.prepareSession(user.id, { userInfo });

    if (room) {
      session.allow(room, session.FULL_ACCESS);
    }

    const { body, status } = await session.authorize();
    return NextResponse.json(body, { status });
  } catch (error) {
    return NextResponse.json("Something went wrong, please try again!", {
      status: 500,
    });
  }
};
